export interface ServiceItem {
    description: string;
    cost: number;
}

export interface Service {
    date: string;
    mileage: number;
    items: ServiceItem[];
}

export interface Car {
    id: number;
    make: string;
    model: string;
    year: number;
    imageUrl: string;
    registrationNumber: string;
    registrationExpiry: string;
    vignetteExpiry: string;
    services: Service[];
}