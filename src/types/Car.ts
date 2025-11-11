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
  vignetteExpiry?: string;
  carMileage?: number;
  services?: Service[];
  registrationCertificate?: string; // <-- new optional field for image URL/file
  registrationPdfs?: Array<{ name: string; fileUrl: string }>;
};