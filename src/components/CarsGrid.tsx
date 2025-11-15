import { useEffect, useState } from 'react';
import type { Car } from '../types/Car';
import { CarCard } from './CarCard';
import './CarsGrid.css';
import { supabase } from '../lib/supabase';
import { ParkingGrid } from './ParkingGrid';

export const CarsGrid = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showParkingGrid, setShowParkingGrid] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get current user
        const { data: { user }, error: userErr } = await supabase.auth.getUser();

        if (userErr) throw userErr;
        if (!user) {
          setError('Not authenticated');
          return;
        }

        const userId = user.id;

        const { data, error: fetchError } = await supabase
          .from('cars')
          .select(`
            *,
            registration_pdfs ( id, name, file_url ),
            services (
              id, date, mileage, paid,
              service_items ( id, description, cost ),
              attachments ( id, name, file_url )
            )
          `)
          .eq('user_id', userId)
          .order('id', { ascending: true });

        if (fetchError) throw fetchError;
        if (!mounted) return;

        const normalized: Car[] = (data || []).map((c: any) => ({
          ...c,
          carLogo: c.car_logo,
          registrationNumber: c.registration_number,
          trafficPermit: c.traffic_permit,
          vignetteExpiry: c.vignette_expiry,
          currentMileage: c.current_mileage,
          registrationPdfs: (c.registration_pdfs || []).map((p: any) => ({ name: p.name, fileUrl: p.file_url })),
          services: (c.services || []).map((s: any) => ({
            id: s.id,
            date: s.date,
            mileage: s.mileage,
            paid: s.paid,
            items: (s.service_items || []).map((it: any) => ({ id: it.id, description: it.description, cost: it.cost })),
            attachments: (s.attachments || []).map((a: any) => ({ id: a.id, name: a.name, fileUrl: a.file_url }))
          }))
        }));

        setCars(normalized);
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className="cars-grid-loading">Loading cars…</div>;
  if (error) return <div className="cars-grid-error">Error: {error}</div>;
  if (cars.length === 0) return <div className="cars-grid-empty">No cars found.</div>;

  return (
    <>
      <div className="cars-grid">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
      <button style={{marginLeft: '10px'}}
                    className="toggle-services"
                    onClick={() => setShowParkingGrid(!showParkingGrid)}
                >
                    {showParkingGrid ? 'Skrij parkirišče' : 'Pokaži parkirišče'}
                </button>
      {showParkingGrid && (<ParkingGrid cars={cars} />)}
    </>
  );
};