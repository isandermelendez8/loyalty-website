export type Locale = "en" | "es";

export interface Service {
  id: string;
  category: "haircuts" | "styling" | "tattoos" | "piercings" | "beauty";
  image: string;
  priceEn: string;
  priceEs: string;
  durationEn: string;
  durationEs: string;
  featured?: boolean;
}

export interface Employee {
  id: string;
  name: string;
  email?: string;
  roleEn: string;
  roleEs: string;
  image: string;
  specialties: string[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  textEn: string;
  textEs: string;
  image: string;
  service: string;
}

export interface Package {
  id: string;
  nameEn: string;
  nameEs: string;
  descriptionEn: string;
  descriptionEs: string;
  price: string;
  services: string[];
  popular?: boolean;
}

export interface GalleryItem {
  id: string;
  image: string;
  category: "haircuts" | "tattoos" | "studio" | "beforeafter";
  titleEn: string;
  titleEs: string;
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  serviceId: string;
  employeeId: string;
  date: string;
  time: string;
  notes: string;
  instagramConfirmed: boolean;
  createdAt: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
}

export interface BusinessInfo {
  name: string;
  phone: string;
  email: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  mapEmbedUrl: string;
  mapDirectionsUrl: string;
  hours: { dayEn: string; dayEs: string; hours: string; closed?: boolean }[];
}
