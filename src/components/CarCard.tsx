import React, { useState, useEffect } from 'react';
import type { Car, Service } from '../types/Car';
import { MileageGraph } from './MileageGraph';
import { supabase } from '../lib/supabase';
import './CarCard.css';

interface CarCardProps {
    car: Car;
    onMileageUpdate?: (carId: number, newMileage: number) => void;
}

export const CarCard = ({ car, onMileageUpdate }: CarCardProps) => {
    const [showServices, setShowServices] = useState(false);
    // pick image from possible fields saved in DB / frontend shape
    const imageSrc = (car as any).imageUrl ?? (car as any).image_url ?? (car as any).image ?? '/background.png';
    const onImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = '/background.png';
    };
    
    // editable current mileage state
    const [currentMileageState, setCurrentMileageState] = useState<number>(car.carMileage ?? 0);
    const [isEditingMileage, setIsEditingMileage] = useState(false);
    const [editedMileage, setEditedMileage] = useState<string>(String(car.carMileage ?? 0));
    const [isSaving, setIsSaving] = useState(false);

    // new state for modal
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);

    // Sync with car prop changes
    useEffect(() => {
        setCurrentMileageState(car.carMileage ?? 0);
        setEditedMileage(String(car.carMileage ?? 0));
    }, [car.carMileage]);

    const parseDMY = (date?: string): Date | null => {
        if (!date) return null;
        const parts = date.split('.');
        if (parts.length !== 3) return null;
        const [day, month, year] = parts;
        const d = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
        return isNaN(d.getTime()) ? null : d;
    };

    const getDaysUntilExpiry = (date?: string): number | null => {
        const expiryDate = parseDMY(date);
        if (!expiryDate) return null;
        const today = new Date();
        return Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    };

    const isExpiryClose = (date?: string) => {
        const days = getDaysUntilExpiry(date);
        return days !== null && days <= 30;
    };

    const getProgressBarStyle = (daysLeft: number | null) => {
        if (daysLeft === null) {
            return { width: '0%', className: 'progress-bar empty' };
        }
        const percentage = Math.min(Math.max((daysLeft / 365) * 100, 0), 100);
        let colorClass = 'good';
        if (daysLeft <= 30) {
            colorClass = 'danger';
        } else if (daysLeft <= 90) {
            colorClass = 'warning';
        }
        return {
            width: `${percentage}%`,
            className: `progress-bar ${colorClass}`
        };
    };

    const services = car.services ?? [];
    

    // optional list of registration pdfs (e.g. [{ name: 'Registracija.pdf', fileUrl: '/path/to.pdf' }])
    const registrationPdfs = (car as any).registrationPdfs ?? [];

    const parseServiceDate = (d?: string) => {
        const dt = parseDMY(d);
        return dt ?? new Date(0);
    };

    // helper to get last service (by date)
    const getLastService = (): Service | null => {
        if (!services || services.length === 0) return null;
        const sorted = services.slice().sort((a, b) => parseServiceDate(b.date).getTime() - parseServiceDate(a.date).getTime());
        return sorted[0] ?? null;
    };

    const lastService = getLastService();
    const lastServiceDate = lastService ? parseServiceDate(lastService.date) : null;
    const lastServiceMileage = lastService?.mileage ?? null;
    const daysSinceLastService = lastServiceDate ? Math.ceil((new Date().getTime() - lastServiceDate.getTime()) / (1000 * 60 * 60 * 24)) : null;
    const kmSinceLastService = lastServiceMileage !== null ? Math.max(0, currentMileageState - lastServiceMileage) : null;

    // progress toward next service: based on the more-advanced of time (365 days) or distance (10000 km)
    const serviceProgressPercent = (() => {
        if (daysSinceLastService === null || kmSinceLastService === null) return 0;
        const timeRatio = daysSinceLastService / 365;
        const kmRatio = kmSinceLastService / 10000;
        return Math.min(100, Math.max(timeRatio, kmRatio) * 100);
    })();

    const isServiceDue = (() => {
        if (daysSinceLastService === null || kmSinceLastService === null) return false;
        return daysSinceLastService >= 365 || kmSinceLastService >= 10000;
    })();

    // handlers for registration modal
    const openRegModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsRegModalOpen(true);
    };
    const closeRegModal = () => setIsRegModalOpen(false);

    return (
        <div className="car-card">
            <img src={imageSrc} onError={onImgError} alt={`${car.make} ${car.model}`} className="car-image" />
            <div className="car-info">
                <h3>{car.make} {car.model} ({car.year})</h3>

                <div className="registration-info">
                    <strong>Registrske tablice:</strong>
                    <div>{car.registrationNumber ?? 'N/A'}</div>

                    {/* Small clickable thumbnail */}
                    <strong>Prometno dovoljenje:</strong>
                    {car.registrationCertificate && (
                        <div className="registration-certificate">
                            <button
                                type="button"
                                className="registration-thumb-button"
                                onClick={openRegModal}
                                aria-label={`Odpri potrdilo o registraciji za ${car.make} ${car.model}`}
                            >
                                <img
                                    src={car.registrationCertificate}
                                    alt={`Potrdilo o registraciji ${car.make} ${car.model}`}
                                    className="registration-certificate-thumb"
                                />
                            </button>
                        </div>
                    )}
                </div>

                {car.registrationExpiry ? (
                    <>
                        <p className={isExpiryClose(car.registrationExpiry) ? 'expiry-warning' : ''}>
                            Registracija poteče: {car.registrationExpiry}
                        </p>
                        <div className="progress-container">
                            <div
                                style={{ width: getProgressBarStyle(getDaysUntilExpiry(car.registrationExpiry)).width }}
                                className={getProgressBarStyle(getDaysUntilExpiry(car.registrationExpiry)).className}
                            />
                        </div>
                        <p className="days-left">
                            {getDaysUntilExpiry(car.registrationExpiry) ?? 'N/A'} dni do poteka registracije
                        </p>

                        {/* Inline list of registration PDF files */}
                        {registrationPdfs.length > 0 && (
                            <div className="registration-pdfs" aria-label="Registracijski PDFji">
                                {registrationPdfs.map((pdf: any, idx: number) => (
                                    <a
                                        key={idx}
                                        href={pdf.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pdf-link"
                                        title={pdf.name}
                                    >
                                        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
                                            <path fill="currentColor" d="M6 2h7l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm7 1.5V8h4.5L13 3.5zM8 13h8v1H8v-1zm0-3h8v1H8v-1z"/>
                                        </svg>
                                        <span className="pdf-name">{pdf.name}</span>
                                    </a>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <p>Registracija: N/A</p>
                )}

                {car.vignetteExpiry ? (
                    <>
                        <p className={isExpiryClose(car.vignetteExpiry) ? 'expiry-warning' : ''}>
                            Vinjeta poteče: {car.vignetteExpiry}
                        </p>
                        <div className="progress-container">
                            <div
                                style={{ width: getProgressBarStyle(getDaysUntilExpiry(car.vignetteExpiry)).width }}
                                className={getProgressBarStyle(getDaysUntilExpiry(car.vignetteExpiry)).className}
                            />
                        </div>
                        <p className="days-left">
                            {getDaysUntilExpiry(car.vignetteExpiry) ?? 'N/A'} dni do poteka vinjete
                        </p>
                    </>
                ) : (
                    <p>Vinjeta: N/A</p>
                )}
                {/* Current mileage display with edit option */}
                <div className="mileage-display">
                    <strong>Trenutni kilometri:</strong>
                    {!isEditingMileage ? (
                        <div className="mileage-value">
                            <span>{currentMileageState.toLocaleString()} km</span>
                            <button
                                type="button"
                                className="edit-mileage-btn"
                                onClick={() => { setIsEditingMileage(true); setEditedMileage(String(currentMileageState)); }}
                                aria-label="Uredi kilometre"
                            >
                                Uredi
                            </button>
                        </div>
                    ) : (
                        <div className="mileage-edit">
                            <input
                                type="number"
                                value={editedMileage}
                                onChange={(e) => setEditedMileage(e.target.value)}
                                className="mileage-input"
                                min={0}
                                aria-label="Novo stanje kilometrov"
                            />
                            <button
                                type="button"
                                className="save-mileage-btn"
                                disabled={isSaving}
                                onClick={async () => {
                                    const parsed = parseInt(editedMileage.replace(/\D/g, ''), 10);
                                    if (!isNaN(parsed)) {
                                        setIsSaving(true);
                                        try {
                                            // Update in Supabase
                                            const { error } = await supabase
                                                .from('cars')
                                                .update({ car_mileage: parsed, updated_at: new Date().toISOString() })
                                                .eq('id', car.id);

                                            if (error) {
                                                console.error('Error updating mileage:', error);
                                                alert('Napaka pri shranjevanju kilometerov');
                                            } else {
                                                setCurrentMileageState(parsed);
                                                if (onMileageUpdate) {
                                                    onMileageUpdate(car.id, parsed);
                                                }
                                            }
                                        } catch (e) {
                                            console.error('Error saving mileage:', e);
                                            alert('Napaka pri shranjevanju');
                                        } finally {
                                            setIsSaving(false);
                                        }
                                    }
                                    setIsEditingMileage(false);
                                }}
                            >{isSaving ? 'Shranjujem...' : 'Shrani'}</button>
                            <button type="button" className="cancel-mileage-btn" onClick={() => setIsEditingMileage(false)}>Prekliči</button>
                        </div>
                    )}
                </div>

                <MileageGraph currentMileage={currentMileageState} services={services} />

                {/* Service due progress (based on last service date and km) */}
                {lastServiceDate && (
                    <div className="service-due">
                        <strong>Naslednji servis</strong>
                        <div className="progress-container">
                            <div className={`progress-bar ${isServiceDue ? 'danger' : (serviceProgressPercent >= 70 ? 'warning' : 'good')}`} style={{ width: `${serviceProgressPercent}%` }} />
                        </div>
                        <p className="service-info">
                            {daysSinceLastService !== null && <span>{daysSinceLastService} dni od zadnjega servisa</span>}
                            {kmSinceLastService !== null && <span> • {kmSinceLastService.toLocaleString()} km od zadnjega servisa</span>}
                        </p>
                        {isServiceDue && <p className="service-due-warning">Servis potreben</p>}
                    </div>
                )}
                
                <button 
                    className="toggle-services"
                    onClick={() => setShowServices(!showServices)}
                >
                    {showServices ? 'Skrij servise' : 'Pokaži servise'}
                </button>

                {showServices && (
                    <div className="services-list">
                        {services
                            .slice()
                            .sort((a, b) => parseServiceDate(b.date).getTime() - parseServiceDate(a.date).getTime())
                            .map((service: Service, index: number) => {
                                const totalCost = (service.items || []).reduce((sum, item) => sum + (item.cost ?? 0), 0);
                                return (
                                    <div key={index} className="service-item">
                                        <div className="service-header">
                                            <h4>Datum: {service.date}</h4>
                                            <p>Kilometri: {(service.mileage ?? 0).toLocaleString()} km</p>
                                        </div>
                                        <div className="service-details">
                                            {(service.items || []).map((item, itemIndex) => (
                                                <div key={itemIndex} className="service-detail-item">
                                                    <span>{item.description}</span>
                                                    <span>{item.cost != null ? `${item.cost} €` : ''}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="service-total">
                                            <div className="total-line">
                                                <span className="total-label">Skupaj:</span>
                                                <span className="total-value">{totalCost.toFixed(2)} €</span>
                                            </div>
                                            <div className="paid-line">
                                                <span className="paid-label">Plačano:</span>
                                                <span className="paid-value">{(service.paid ?? 0).toFixed(2)} €</span>
                                            </div>
                                        </div>
                                        {/* Service attachments (e.g. PDFs) */}
                                        {service.attachments && service.attachments.length > 0 && (
                                            <div className="service-attachments" aria-label={`Priponke za servis ${service.date}`}>
                                                {service.attachments.map((att, aIdx) => (
                                                    <a
                                                        key={aIdx}
                                                        href={att.fileUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="pdf-link service-pdf-link"
                                                        title={att.name}
                                                    >
                                                        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
                                                            <path fill="currentColor" d="M6 2h7l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm7 1.5V8h4.5L13 3.5zM8 13h8v1H8v-1zm0-3h8v1H8v-1z"/>
                                                        </svg>
                                                        <span className="pdf-name">{att.name}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                        })}
                    </div>
                )}
            </div>

            {/* Modal for large image */}
            {isRegModalOpen && car.registrationCertificate && (
                <div
                    className="registration-modal"
                    role="dialog"
                    aria-modal="true"
                    onClick={closeRegModal}
                >
                    <div className="registration-modal__content" onClick={(e) => e.stopPropagation()}>
                        <button className="registration-modal__close" onClick={closeRegModal} aria-label="Zapri">×</button>
                        <img
                            src={car.registrationCertificate}
                            alt={`Potrdilo o registraciji ${car.make} ${car.model}`}
                            className="registration-modal__image"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};