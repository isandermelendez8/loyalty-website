import { Package } from "@/types";

export const packages: Package[] = [
  {
    id: "braid-beauty",
    nameEn: "Braid & Glow",
    nameEs: "Trenzas y Brillo",
    descriptionEn: "Premium braids with hair wash and blow-dry finish.",
    descriptionEs: "Trenzas premium con lavado y secado de acabado.",
    price: "$199",
    services: ["braids", "hair-wash", "blow-dry"],
    popular: true,
  },
  {
    id: "full-glam",
    nameEn: "Full Glam Hair",
    nameEs: "Cabello Glam Completo",
    descriptionEn: "Complete hair service — wash, straightening, and blow-dry styling.",
    descriptionEs: "Servicio completo — lavado, alisado y secado con estilo.",
    price: "$149",
    services: ["full-hair-service"],
    popular: true,
  },
  {
    id: "piercing-package",
    nameEn: "Piercing & Care",
    nameEs: "Piercing y Cuidado",
    descriptionEn: "Professional piercing with premium jewelry and aftercare kit.",
    descriptionEs: "Piercing profesional con joyería premium y kit de cuidado.",
    price: "$65",
    services: ["piercings"],
  },
];

export const promotions = [
  {
    id: "first-visit",
    titleEn: "First Visit Special",
    titleEs: "Especial Primera Visita",
    descEn: "15% off your first braids or piercing",
    descEs: "15% de descuento en tu primera trenza o piercing",
    code: "LOYALTY15",
  },
  {
    id: "referral",
    titleEn: "Bring Your Bestie",
    titleEs: "Trae a Tu Amiga",
    descEn: "Both get $25 off your next visit",
    descEs: "Ambas obtienen $25 de descuento en la próxima visita",
    code: "BESTIE25",
  },
];
