import { useState } from 'react';
import type { Car, Service } from '../types/Car';
import './CarCard.css';

interface CarCardProps {
    car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
    const [showServices, setShowServices] = useState(false);

    const getDaysUntilExpiry = (date: string) => {
        // Handle date format DD.MM.YYYY
        const [day, month, year] = date.split('.');
        const expiryDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        const today = new Date();
        return Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    };

    const isExpiryClose = (date: string) => {
        return getDaysUntilExpiry(date) <= 30;
    };

    const getProgressBarStyle = (daysLeft: number) => {
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

    return (
        <div className="car-card">
            <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="car-image" />
            <div className="car-info">
                <h3>{car.make} {car.model} ({car.year})</h3>
                <p>Registrske tablice: {car.registrationNumber}</p>
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
                    {getDaysUntilExpiry(car.registrationExpiry)} dni do poteka registracije
                </p>
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
                    {getDaysUntilExpiry(car.vignetteExpiry)} dni do poteka vinjete
                </p>
                
                <button 
                    className="toggle-services"
                    onClick={() => setShowServices(!showServices)}
                >
                    {showServices ? 'Skrij servise' : 'Pokaži servise'}
                </button>

                {showServices && (
                    <div className="services-list">
                        <h3>Zgodovina servisov</h3>
                        {car.services
                            .sort((a, b) => new Date(b.date.split('.').reverse().join('-')).getTime() - 
                                          new Date(a.date.split('.').reverse().join('-')).getTime())
                            .map((service: Service, index: number) => {
                                const totalCost = service.items.reduce((sum, item) => sum + item.cost, 0);
                                return (
                                    <div key={index} className="service-item">
                                        <div className="service-header">
                                            <h4>Datum: {service.date}</h4>
                                            <p>Kilometri: {service.mileage.toLocaleString()} km</p>
                                        </div>
                                        <div className="service-details">
                                            {service.items.map((item, itemIndex) => (
                                                <div key={itemIndex} className="service-detail-item">
                                                    <span>{item.description}</span>
                                                    <span>{item.cost} €</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="service-total">
                                            <strong>Skupaj: {Math.round(totalCost)} €</strong>
                                        </div>
                                    </div>
                                );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};