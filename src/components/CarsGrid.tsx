import type { Car } from '../types/Car';
import { CarCard } from './CarCard';
import './CarsGrid.css';
import bmwImage from '../assets/bmw.png';
import renaultEspaceImage from '../assets/renault-espace.jpg';
import renaultGrandScenicImage from '../assets/renault-grand-scenic.jpg';

// add car service PDF imports (put your files in assets/pdfs)
import bmwServiceMay2025_1 from '../assets/pdfs/bmw-redni-servis-1-17-05-2025.pdf';
import bmwServiceMay2025_2 from '../assets/pdfs/bmw-redni-servis-2-17-05-2025.pdf';
import espaceServiceAug2021 from '../assets/pdfs/espace-redni-servis-17-08-2021.pdf';
import espacePdf from '../assets/pdfs/espace-redni-servis-21-10-2024.pdf';
import scenicBigServiceAug2024Pdf from '../assets/pdfs/scenic-veliki-redni-klima-servis-21-08-2024.pdf';

// add registration certificate image import (put your file in assets/registrations)
import bmwRegistrationImage from '../assets/bmw-registration.jpg';
import espaceRegistrationImage from '../assets/espace-registration.png';
import scenicRegistrationImage from '../assets/scenic-registration.jpg';
import bmwReg2025Pdf from '../assets/registrations/bmw-registration-2025.pdf';
import espaceReg2025Pdf from '../assets/registrations/espace-registration-2025.pdf';
import scenicReg2025Pdf from '../assets/registrations/scenic-registration-2025.pdf';

// Sample data - replace with your actual car data
const cars: Car[] = [
    {
        id: 1,
        make: "BMW",
        model: "520d",
        year: 2014,
        imageUrl: bmwImage,
        registrationNumber: "LJ52-UVC",
        registrationExpiry: "18.07.2026",
        registrationCertificate: bmwRegistrationImage,
        registrationPdfs: [
            { name: "Registracija in zavarovanje BMW 2025/26", fileUrl: bmwReg2025Pdf },
        ],
        vignetteExpiry: "19.04.2026",
        carMileage: 130000,
        services: [
            {
                date: "17.05.2025",
                mileage: 120478,
                items: [
                    {
                        description: "Olje CASTROL C3 5W30 + zav. tekočina ATE DO4"
                    },
                    {
                        description: "Filter olja BOSCH P 7123"
                    },
                    {
                        description: "Filter kabine BOSCH R 2315"
                    },
                    {
                        description: "Filter zraka BOSCH S 0343"
                    },
                    {
                        description: "Filter goriva BOSCH N 6457"
                    }
                ],
                paid: 175.86,
                attachments: [
                    {
                        name: "Račun.pdf",
                        fileUrl: bmwServiceMay2025_1
                    },
                    {
                        name: "Kaj je bilo narejeno.pdf",
                        fileUrl: bmwServiceMay2025_2
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
        registrationNumber: "LJ57-ZIJ",
        registrationCertificate: espaceRegistrationImage,
        registrationPdfs: [
            { name: "Registracija in zavarovanje ESPACE 2025/26", fileUrl: espaceReg2025Pdf },
        ],
        registrationExpiry: "11.11.2026",
        vignetteExpiry: "06.11.2026",
        carMileage: 137000,
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
                ],
                paid: 388.14,
                attachments: [
                    {
                        name: "Račun.pdf",
                        fileUrl: espacePdf
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
                ],
                paid: 452.42,
                attachments: []
            },
            {
                date: "17.08.2021",
                mileage: 97009,
                items: [
                    {
                        description: "Zamenjava olja in filtra",
                        cost: 20
                    },
                    {
                        description: "Filter olja",
                        cost: 9.41
                    },
                    {
                        description: "Tesnilo",
                        cost: 2.36
                    },
                    {
                        description: "Olje CASTROL sod 5W40 (4.3L)",
                        cost: 45.84
                    },
                    {
                        description: "Tekočina hladilna",
                        cost: 6.39
                    },
                    {
                        description: "GRT obvezne opreme",
                        cost: 10.95
                    },
                    {
                        description: "set za prevmatike",
                        cost: 36.78
                    }
                ],
                paid: 191.21,
                attachments: [
                    {
                        name: "Račun.pdf",
                        fileUrl: espaceServiceAug2021
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
        registrationNumber: "LJ87-AAP",
        registrationCertificate: scenicRegistrationImage,
        registrationPdfs: [
            { name: "Registracija in zavarovanje SCENIC 2025/26", fileUrl: scenicReg2025Pdf },
        ],
        registrationExpiry: "28.11.2025",
        vignetteExpiry: "14.05.2026",
        carMileage: 290000,
        services: [
            {
                date: "21.08.2024",
                mileage: 281176,
                items: [
                    {
                        description: "Servis pregled vozilo",
                        cost: 104.13
                    },
                    {
                        description: "Odstr - pon nam zračni filter",
                        cost: 16.02
                    },
                    {
                        description: "Zamenjava filter potniškega prostora",
                        cost: 24.03
                    },
                    {
                        description: "Mazanje bat sprednjega zavornega sedla",
                        cost: 32.04
                    },
                    {
                        description: "Zamenjava zadnja zavorna ploščica",
                        cost: 80.10
                    },
                    {
                        description: "Mazanje sklop zdanjega zavornega sedla",
                        cost: 32.04
                    },
                    {
                        description: "Konfiguaracija ročne zavore",
                        cost: 32.04
                    },
                    {
                        description: "Odstr - pon nam vodna črpalka",
                        cost: 40.05
                    },
                    {
                        description: "Zamenjava enota predgretja in postgretja",
                        cost: 240.30
                    },
                    {
                        description: "Zamenjava jermen za pogon opreme motorja",
                        cost: 48.06
                    },
                    {
                        description: "Pra izp pol odz krogotok hladilne tekočine - odzračevan",
                        cost: 136.17
                    },
                    {
                        description: "Odstr - pon nam kompresor klimatske naprave",
                        cost: 200.25
                    },
                    {
                        description: "Odstr - pon nam kondenzator",
                        cost: 88.11
                    },
                    {
                        description: "Čiščenje odduščkov požarne stene",
                        cost: 80.10
                    },
                    {
                        description: "Prazn - polnjenje olje za menjalnik",
                        cost: 48.06
                    },
                    {
                        description: "Zamenjava zavorna tekočina",
                        cost: 48.06
                    },
                    {
                        description: "Grt. tesnil klime",
                        cost: 40.26
                    },
                    {
                        description: "Glaceol - Antifriz 1L",
                        cost: 32.31
                    },
                ],
                paid: 2275.62,
                attachments: [
                    {
                        name: "Veliki, redni in servis klime.pdf",
                        fileUrl: scenicBigServiceAug2024Pdf
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