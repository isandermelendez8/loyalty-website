import { Package } from "@/types";

export const packages: Package[] = [
  {
    id: "goddess-glow",
    nameEn: "Goddess Glow",
    nameEs: "Brillo de Diosa",
    descriptionEn: "Luxury blowout, precision cut, and deep conditioning treatment.",
    descriptionEs: "Secado de lujo, corte de precisión y tratamiento de acondicionamiento profundo.",
    price: "$149",
    services: ["styling-blowout", "haircut-classic", "styling-treatment"],
    popular: true,
  },
  {
    id: "transformation",
    nameEn: "Total Transformation",
    nameEs: "Transformación Total",
    descriptionEn: "Full makeover with cut, color, and keratin treatment.",
    descriptionEs: "Cambio completo con corte, color y tratamiento de keratina.",
    price: "$249",
    services: ["haircut-classic", "styling-color", "styling-treatment"],
  },
  {
    id: "beauty-bliss",
    nameEn: "Beauty Bliss",
    nameEs: "Belleza Total",
    descriptionEn: "Facial, gel manicure, and glam makeup for your special day.",
    descriptionEs: "Facial, manicura gel y maquillaje glam para tu día especial.",
    price: "$179",
    services: ["beauty-facial", "beauty-manicure", "beauty-makeup"],
    popular: true,
  },
  {
    id: "ink-session",
    nameEn: "Ink & Art Session",
    nameEs: "Sesión de Arte e Tinta",
    descriptionEn: "2-hour tattoo session with personalized design consultation.",
    descriptionEs: "Sesión de tatuaje de 2 horas con consulta de diseño personalizado.",
    price: "$250",
    services: ["tattoo-medium"],
  },
];

export const promotions = [
  {
    id: "first-visit",
    titleEn: "First Visit Special",
    titleEs: "Especial Primera Visita",
    descEn: "15% off your first service — welcome to LOYALTY",
    descEs: "15% de descuento en tu primer servicio — bienvenida a LOYALTY",
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
  {
    id: "weekday",
    titleEn: "Weekday Glow",
    titleEs: "Brillo Entre Semana",
    descEn: "10% off Monday-Wednesday bookings",
    descEs: "10% de descuento en reservas de lunes a miércoles",
    code: "WEEKDAY10",
  },
];
