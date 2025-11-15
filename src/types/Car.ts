export interface ServiceItem {
    description: string;
    quantity?: number;
    cost?: number;
}

export interface ServiceAttachment {
    name: string;
    fileUrl: string;
}

export interface Service {
    date: string;
    mileage: number;
    items: ServiceItem[];
    paid: number;
    attachments: ServiceAttachment[];
}

export type Car = {
  id: number;
  make: string;
  model: string;
  year: number;
  imageUrl?: string;
  registrationNumber?: string;
  registrationExpiry?: string;
  trafficPermit?: string;
  vignetteExpiry?: string;
  currentMileage: number;
  services?: Service[];
  registrationPdfs?: Array<{ name: string; fileUrl: string }>;
};