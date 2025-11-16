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

        // Fetch cars
        const { data: carsData, error: carsError } = await supabase
          .from('cars')
          .select('*')
          .eq('user_id', userId)
          .order('id', { ascending: true });

        if (carsError) throw carsError;

        // Fetch services for all cars
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select(`
            id,
            car_id,
            date,
            mileage,
            paid
          `)
          .in('car_id', carsData?.map(c => c.id) || [])
          .order('date', { ascending: false });

        if (servicesError) throw servicesError;

        // Fetch service items for all services
        const { data: serviceItemsData, error: itemsError } = await supabase
          .from('service_items')
          .select('id, service_id, description, cost')
          .in('service_id', servicesData?.map(s => s.id) || []);

        if (itemsError) throw itemsError;

        // Fetch service attachments for all services
        const { data: serviceAttachmentsData, error: attachmentsError } = await supabase
          .from('service_attachments')
          .select('id, service_id, name, file_url')
          .in('service_id', servicesData?.map(s => s.id) || []);

        if (attachmentsError) throw attachmentsError;

        // Fetch registration PDFs for all cars
        const { data: regPdfsData, error: regPdfsError } = await supabase
          .from('registration_pdfs')
          .select('id, car_id, name, file_url')
          .in('car_id', carsData?.map(c => c.id) || []);

        if (regPdfsError) throw regPdfsError;

        if (!mounted) return;

        // Group service items by service_id
        const itemsByService: Record<string, any[]> = {};
        (serviceItemsData || []).forEach(item => {
          if (!itemsByService[item.service_id]) itemsByService[item.service_id] = [];
          itemsByService[item.service_id].push({
            id: item.id,
            description: item.description,
            cost: item.cost
          });
        });

        // Group service attachments by service_id
        const attachmentsByService: Record<string, any[]> = {};
        console.log('serviceAttachmentsData', serviceAttachmentsData);
        (serviceAttachmentsData || []).forEach(att => {
          if (!attachmentsByService[att.service_id]) attachmentsByService[att.service_id] = [];
          attachmentsByService[att.service_id].push({
            id: att.id,
            name: att.name,
            fileUrl: att.file_url
          });
        });
        console.log('attachmentsByService', attachmentsByService);
        console.log('servicesData', servicesData);
        // Group services by car_id with their items and attachments
        const servicesByCar: Record<string, any[]> = {};
        (servicesData || []).forEach(s => {
          if (!servicesByCar[s.car_id]) servicesByCar[s.car_id] = [];
          servicesByCar[s.car_id].push({
            id: s.id,
            date: s.date,
            mileage: s.mileage,
            paid: s.paid,
            items: itemsByService[s.id] || [],
            attachments: attachmentsByService[s.id] || []
          });
        });
        console.log('servicesByCar', servicesByCar);

        // Group registration PDFs by car_id
        const regPdfsByCar: Record<string, any[]> = {};
        (regPdfsData || []).forEach(p => {
          if (!regPdfsByCar[p.car_id]) regPdfsByCar[p.car_id] = [];
          regPdfsByCar[p.car_id].push({
            id: p.id,
            name: p.name,
            fileUrl: p.file_url
          });
        });

        // Combine cars with their services and registration PDFs
        const normalized: Car[] = (carsData || []).map((c: any) => ({
          ...c,
          carLogo: c.car_logo,
          registrationNumber: c.registration_number,
          trafficPermit: c.traffic_permit,
          registrationExpiry: c.registration_expiry,
          registrationPdfs: regPdfsByCar[c.id] || [],
          vignetteExpiry: c.vignette_expiry,
          currentMileage: c.current_mileage,
          services: servicesByCar[c.id] || []
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

      <ParkingGrid cars={cars} />
    </>
  );
};