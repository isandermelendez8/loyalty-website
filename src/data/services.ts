import { Service } from "@/types";

export const services: Service[] = [
  {
    id: "braids",
    category: "braids",
    image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80",
    priceEn: "$80 - $200",
    priceEs: "$80 - $200",
    durationEn: "2-4 hours",
    durationEs: "2-4 horas",
    featured: true,
    available: true,
  },
  {
    id: "piercings",
    category: "piercings",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80",
    priceEn: "$30 - $80",
    priceEs: "$30 - $80",
    durationEn: "20-40 minutes",
    durationEs: "20-40 minutos",
    featured: true,
    available: true,
  },
  {
    id: "hair-straightening",
    category: "hair",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    priceEn: "$45 - $75",
    priceEs: "$45 - $75",
    durationEn: "45-60 minutes",
    durationEs: "45-60 minutos",
    featured: true,
    available: true,
  },
  {
    id: "blow-dry",
    category: "hair",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    priceEn: "$40 - $65",
    priceEs: "$40 - $65",
    durationEn: "45-60 minutes",
    durationEs: "45-60 minutos",
    available: true,
  },
  {
    id: "hair-wash",
    category: "hair",
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80",
    priceEn: "$25 - $40",
    priceEs: "$25 - $40",
    durationEn: "30 minutes",
    durationEs: "30 minutos",
    available: true,
  },
  {
    id: "full-hair-service",
    category: "hair",
    image: "https://images.unsplash.com/photo-1562322140-8baeece4df24?w=800&q=80",
    priceEn: "$75 - $120",
    priceEs: "$75 - $120",
    durationEn: "90-120 minutes",
    durationEs: "90-120 minutos",
    featured: true,
    available: true,
  },
  {
    id: "tattoos",
    category: "tattoos",
    image: "https://images.unsplash.com/photo-1598371839696-5c5bbd00c9fd?w=800&q=80",
    priceEn: "Coming Soon",
    priceEs: "Próximamente",
    durationEn: "TBA",
    durationEs: "Por confirmar",
    comingSoon: true,
    available: false,
  },
];

export const serviceNames: Record<string, { en: string; es: string; descEn: string; descEs: string }> = {
  braids: {
    en: "Braids",
    es: "Trenzas",
    descEn: "Stunning braid styles — box braids, knotless, cornrows, and custom designs.",
    descEs: "Estilos de trenzas increíbles — box braids, knotless, cornrows y diseños personalizados.",
  },
  piercings: {
    en: "Piercings",
    es: "Piercings",
    descEn: "Professional ear, nose, and body piercings with premium hypoallergenic jewelry.",
    descEs: "Piercings profesionales de oreja, nariz y cuerpo con joyería premium hipoalergénica.",
  },
  "hair-straightening": {
    en: "Hair Straightening",
    es: "Alisado de Cabello",
    descEn: "Silky smooth straightening with heat protection and lasting results.",
    descEs: "Alisado sedoso con protección térmica y resultados duraderos.",
  },
  "blow-dry": {
    en: "Blow-Drying",
    es: "Secado",
    descEn: "Professional blowout for volume, shine, and a flawless finish.",
    descEs: "Secado profesional para volumen, brillo y un acabado impecable.",
  },
  "hair-wash": {
    en: "Hair Washing",
    es: "Lavado de Cabello",
    descEn: "Relaxing wash with premium shampoo and scalp massage.",
    descEs: "Lavado relajante con shampoo premium y masaje de cuero cabelludo.",
  },
  "full-hair-service": {
    en: "Full Hair Service",
    es: "Servicio Completo de Cabello",
    descEn: "Complete experience — wash, blow-dry, and styling in one luxurious session.",
    descEs: "Experiencia completa — lavado, secado y estilizado en una sesión de lujo.",
  },
  tattoos: {
    en: "Tattoos",
    es: "Tatuajes",
    descEn: "Custom fine-line and artistic tattoos — launching soon at LOYALTY.",
    descEs: "Tatuajes fine-line y artísticos personalizados — próximamente en LOYALTY.",
  },
};

export const categoryLabels: Record<string, { en: string; es: string }> = {
  braids: { en: "Braids", es: "Trenzas" },
  piercings: { en: "Piercings", es: "Piercings" },
  hair: { en: "Hair Services", es: "Servicios de Cabello" },
  tattoos: { en: "Tattoos", es: "Tatuajes" },
};

export function getAvailableServices(): Service[] {
  return services.filter((s) => s.available !== false && !s.comingSoon);
}

export function getBookableServices(): Service[] {
  return getAvailableServices();
}
