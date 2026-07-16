import { Package } from "@/types";

export const packages: Package[] = [
  {
    id: "gentleman",
    nameEn: "The Gentleman",
    nameEs: "El Caballero",
    descriptionEn: "Complete grooming experience with haircut, beard trim, and hot towel.",
    descriptionEs: "Experiencia completa de arreglo con corte, barba y toalla caliente.",
    price: "$75",
    services: ["haircut-classic", "haircut-beard"],
    popular: true,
  },
  {
    id: "transformation",
    nameEn: "Total Transformation",
    nameEs: "Transformación Total",
    descriptionEn: "Full styling package with cut, color, and treatment.",
    descriptionEs: "Paquete completo de estilizado con corte, color y tratamiento.",
    price: "$199",
    services: ["haircut-classic", "styling-color", "styling-treatment"],
  },
  {
    id: "beauty-bliss",
    nameEn: "Beauty Bliss",
    nameEs: "Belleza Total",
    descriptionEn: "Facial, manicure, and makeup for your special occasion.",
    descriptionEs: "Facial, manicura y maquillaje para tu ocasión especial.",
    price: "$149",
    services: ["beauty-facial", "beauty-manicure", "beauty-makeup"],
    popular: true,
  },
  {
    id: "ink-session",
    nameEn: "Ink Session",
    nameEs: "Sesión de Tinta",
    descriptionEn: "2-hour tattoo session with design consultation included.",
    descriptionEs: "Sesión de tatuaje de 2 horas con consulta de diseño incluida.",
    price: "$250",
    services: ["tattoo-medium"],
  },
];

export const promotions = [
  {
    id: "first-visit",
    titleEn: "First Visit Special",
    titleEs: "Especial Primera Visita",
    descEn: "15% off your first service",
    descEs: "15% de descuento en tu primer servicio",
    code: "LOYALTY15",
  },
  {
    id: "referral",
    titleEn: "Refer a Friend",
    titleEs: "Recomienda un Amigo",
    descEn: "Both get $20 off next visit",
    descEs: "Ambos obtienen $20 de descuento en la próxima visita",
    code: "FRIEND20",
  },
  {
    id: "weekday",
    titleEn: "Weekday Special",
    titleEs: "Especial Entre Semana",
    descEn: "10% off Monday-Wednesday bookings",
    descEs: "10% de descuento en reservas de lunes a miércoles",
    code: "WEEKDAY10",
  },
];
