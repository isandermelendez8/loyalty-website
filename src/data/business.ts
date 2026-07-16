import { BusinessInfo } from "@/types";

export const businessInfo: BusinessInfo = {
  name: "LOYALTY",
  phone: "+1 (305) 482-9174",
  email: "hello@loyaltystudio.com",
  whatsapp: "13054829174",
  instagram: "https://instagram.com/loyalty.studio.miami",
  facebook: "https://facebook.com/loyaltystudio",
  tiktok: "https://tiktok.com/@loyaltystudio",
  address: "2847 Collins Avenue",
  city: "Miami Beach",
  state: "FL",
  zip: "33140",
  country: "USA",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.234567890123!2d-80.1234567!3d25.8123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDQ4JzQ0LjQiTiA4MMKwMDcnMjQuNCJX!5e0!3m2!1sen!2sus!4v1234567890",
  mapDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=2847+Collins+Avenue,+Miami+Beach,+FL+33140",
  hours: [
    { dayEn: "Monday", dayEs: "Lunes", hours: "10:00 AM - 8:00 PM" },
    { dayEn: "Tuesday", dayEs: "Martes", hours: "10:00 AM - 8:00 PM" },
    { dayEn: "Wednesday", dayEs: "Miércoles", hours: "10:00 AM - 8:00 PM" },
    { dayEn: "Thursday", dayEs: "Jueves", hours: "10:00 AM - 9:00 PM" },
    { dayEn: "Friday", dayEs: "Viernes", hours: "10:00 AM - 9:00 PM" },
    { dayEn: "Saturday", dayEs: "Sábado", hours: "9:00 AM - 7:00 PM" },
    { dayEn: "Sunday", dayEs: "Domingo", hours: "Closed", closed: true },
  ],
};

export const REVIEWS_STORAGE_KEY = "loyalty_reviews";

// Appointment slots are now managed in src/lib/booking/rules.ts
// 2 slots per day: 10:00 AM - 2:00 PM and 3:00 PM - 7:00 PM (4 hours each)
