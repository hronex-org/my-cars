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
        // get current user
        const {
          data: { user },
          error: userErr
        } = await supabase.auth.getUser();

        if (userErr) throw userErr;
        if (!user) {
          setCars([]);
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

        // adapt backend shape to frontend expected names if needed
        const normalized: Car[] = (data || []).map((c: any) => ({
          ...c,
          // ensure car_logo is included (already in * but explicit mapping helps)
          carLogo: c.car_logo,
          // map db registration_pdfs.file_url -> registrationPdfs[].fileUrl expected in UI
          registrationPdfs: (c.registration_pdfs || []).map((p: any) => ({ name: p.name, fileUrl: p.file_url })),
          // map nested services items/attachments names to UI shape
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

      {/* Parking grid added at bottom */}
      <ParkingGrid cars={cars} />
    </>
  );
};