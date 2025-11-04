import type { Car } from '../types/Car';
import { CarCard } from './CarCard';
import './CarsGrid.css';
import bmwImage from '../assets/bmw.png';
import renaultEspaceImage from '../assets/renault-espace.jpg';
import renaultGrandScenicImage from '../assets/renault-grand-scenic.jpg';

// Sample data - replace with your actual car data
const cars: Car[] = [
    {
        id: 1,
        make: "BMW",
        model: "520d",
        year: 2014,
        imageUrl: bmwImage, // Using imported image
        registrationNumber: "LJ52-UVC",
        registrationExpiry: "18.07.2026",
        vignetteExpiry: "19.04.2026",
        services: [
            {
                date: "15.06.2023",
                mileage: 45000,
                items: [
                    {
                        description: "Menjava olja",
                        cost: 150
                    },
                    {
                        description: "Menjava filtrov",
                        cost: 100
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        make: "Renault Espace",
        model: "TCe 200 Energy Initiale Paris EDC",
        year: 2016,
        imageUrl: renaultEspaceImage,
        registrationNumber: "DEF456",
        registrationExpiry: "11.11.2025",
        vignetteExpiry: "13.01.2026",
        services: [
            {
                date: "21.10.2024",
                mileage: 126459,
                items: [
                    {
                        description: "Servis pregled vozilo",
                        cost: 18.4
                    },
                    {
                        description: "Odstr - pon nam svečka",
                        cost: 18.4
                    },
                    {
                        description: "Odstr - pon nam hladilnik",
                        cost: 105.8
                    },
                    {
                        description: "Zamenjava zadnji zavorni kolut",
                        cost: 59.8
                    },
                    {
                        description: "Filter olja",
                        cost: 15.65
                    },
                    {
                        description: "Tesnilo",
                        cost: 3.71
                    },
                    {
                        description: "Castrol RN 5W40 (4.6L)",
                        cost: 73.04
                    },
                    {
                        description: "Tekočina hladilna (6.5L)",
                        cost: 26.98
                    },
                    {
                        description: "Čistilo zavor",
                        cost: 5.63
                    },
                    {
                        description: "Vijak",
                        cost: 6.46
                    },
                    {
                        description: "Ekološka odst. olja, filtrov...",
                        cost: 5.50
                    },
                    {
                        description: "Drobni materijal",
                        cost: 7.34
                    }
                ]
            },
            {
                date: "09.10.2023",
                mileage: 115544,
                items: [
                    {
                        description: "Zamenjava x2 spodnje vodilo sprednje polpreme",
                        cost: 88
                    },
                    {
                        description: "Test vozilo s testerjem",
                        cost: 12
                    },
                    {
                        description: "Diagnostika zavorni sistem in reprogramiranje",
                        cost: 20
                    },
                    {
                        description: "Vilica",
                        cost: 144.02
                    },
                    {
                        description: "Vilica",
                        cost: 143.98
                    },
                    {
                        description: "Drobni materijal",
                        cost: 4.04
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        make: "Renault Grand Scenic III",
        model: "dCi 110 Dynamique",
        year: 2014,
        imageUrl: renaultGrandScenicImage,
        registrationNumber: "GHI789",
        registrationExpiry: "28.11.2025",
        vignetteExpiry: "14.05.2026",
        services: [
            {
                date: "20.04.2023",
                mileage: 60000,
                items: [
                    {
                        description: "Menjava pnevmatik",
                        cost: 100
                    }
                ]
            }
        ]
    }
];

export const CarsGrid = () => {
    return (
        <div className="cars-grid">
            {cars.map(car => (
                <CarCard key={car.id} car={car} />
            ))}
        </div>
    );
};