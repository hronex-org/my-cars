import React, { useEffect, useMemo, useState } from 'react';
import type { Car } from '../types/Car';
import { supabase } from '../lib/supabase';
import './ParkingGrid.css';
import { parkingLayout } from '../config/parkingLayout';

interface ParkingGridProps {
  cars: Car[];
  onParkingChange?: (slots: Record<string, number | null>) => void;
}
type SlotsMap = Record<string, number | null>;

const buildSlotsFromLayout = (): SlotsMap => {
  const map: SlotsMap = {};
  parkingLayout.allSlots().forEach(s => (map[s.id] = null));
  return map;
};

export const ParkingGrid: React.FC<ParkingGridProps> = ({ cars, onParkingChange }) => {
  // Filter: only BMW and Renault Espace (exclude Grand Scenic)
  const activeCars = useMemo(() => {
    return cars.filter(c => {
      const make = c.make?.toLowerCase() ?? '';
      const model = c.model?.toLowerCase() ?? '';
      if (make === 'bmw') return true;
      if (make === 'renault' || make === 'renault espace') {
        return !model.includes('grand scenic');
      }
      return false;
    });
  }, [cars]);

  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [slots, setSlots] = useState<SlotsMap>(() => buildSlotsFromLayout());

  // Build slots map from cars' parking_slot field
  useEffect(() => {
    const next: SlotsMap = buildSlotsFromLayout();
    activeCars.forEach(c => {
      const parked = (c as any).parking_slot ?? (c as any).parkedSlot ?? null;
      if (parked && next.hasOwnProperty(parked)) {
        next[parked] = c.id;
      }
    });
    setSlots(next);
    onParkingChange?.(next);
  }, [activeCars, onParkingChange]);

  const findCar = (id: number | null) => activeCars.find(c => c.id === id) ?? null;

  const getBrandLogo = (car: Car | null): string => {
    if (!car) return '';
    const logo = (car as any).car_logo ?? (car as any).carLogo ?? null;
    if (logo) return logo;
    const make = car.make ?? '';
    return parkingLayout.brandLogos[make] ?? '/background.png';
  };

  const persistParking = async (carId: number | null, slotId: string | null) => {
    if (!carId) return;
    try {
      const { error } = await supabase.from('cars').update({ parking_slot: slotId }).eq('id', carId);
      if (error) throw error;
    } catch (err) {
      console.error('Failed to persist parking slot:', err);
    }
  };

  const handleSlotClick = async (slotId: string) => {
    if (!selectedCarId) {
      // unassign if slot occupied
      const carId = slots[slotId];
      if (carId) {
        await persistParking(carId, null);
        setSlots(prev => ({ ...prev, [slotId]: null }));
      }
      return;
    }

    // if slot already has this car -> unassign
    if (slots[slotId] === selectedCarId) {
      await persistParking(selectedCarId, null);
      setSlots(prev => ({ ...prev, [slotId]: null }));
      return;
    }

    // assign car to slot (remove previous assignment)
    const prevSlotForCar = Object.keys(slots).find(k => slots[k] === selectedCarId);
    await persistParking(selectedCarId, slotId);
    setSlots(prev => {
      const next = { ...prev };
      if (prevSlotForCar) next[prevSlotForCar] = null;
      next[slotId] = selectedCarId;
      return next;
    });
  };

  const toggleSelectCar = (id: number) => setSelectedCarId(prev => (prev === id ? null : id));

  return (
    <div className="parking-map-wrapper">
      <div className="parking-top">
        <div className="cars-list">
          <div className="cars-list-title">Izberi avto</div>
          <div className="cars-list-items">
            {activeCars.map(car => {
              const isSelected = selectedCarId === car.id;
              const logo = getBrandLogo(car);
              const parkedSlot = (car as any).parking_slot ?? (car as any).parkedSlot ?? null;
              return (
                <button key={car.id} className={`car-select ${isSelected ? 'selected' : ''}`} onClick={() => toggleSelectCar(car.id)}>
                  <img src={logo} alt={car.make} onError={(e)=>{(e.currentTarget as HTMLImageElement).src='/background.png'}}/>
                  <div className="car-label">{car.make}</div>
                  <div className="car-parked">{parkedSlot ?? 'Ni označeno'}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="parking-map" role="application" aria-label="Parking map">
        {parkingLayout.allSlots().map(slot => {
          const carId = slots[slot.id];
          const car = findCar(carId);
          const orientationClass = slot.orientation === 'vertical' ? 'map-slot-vertical' : slot.orientation === 'horizontal' ? 'map-slot-horizontal' : 'map-slot-central';
          const logo = getBrandLogo(car);
          return (
            <button
              key={slot.id}
              className={`map-slot ${orientationClass} ${car ? 'occupied' : 'empty'} ${slots[slot.id] && selectedCarId === slots[slot.id] ? 'highlight' : ''}`}
              onClick={() => handleSlotClick(slot.id)}
              title={car ? `${car.make} ${car.model}` : slot.label}
              style={{
                left: `${slot.x}%`,
                top: `${slot.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {car ? null : <div className="slot-badge">{slot.id}</div>}
              {car ? <img className="slot-logo" src={logo} alt={car.make}/> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ParkingGrid;