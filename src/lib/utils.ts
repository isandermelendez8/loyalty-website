import { REVIEWS_STORAGE_KEY, businessInfo } from "@/data/business";
import { Booking } from "@/types";

export function generateId(): string {
  return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function saveReview(review: {
  name: string;
  rating: number;
  text: string;
}): void {
  if (typeof window === "undefined") return;
  try {
    const data = localStorage.getItem(REVIEWS_STORAGE_KEY);
    const reviews = data ? JSON.parse(data) : [];
    reviews.push({
      ...review,
      id: generateId(),
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  } catch {
    // silent fail
  }
}

export function getWhatsAppBookingUrl(booking: Booking, serviceName: string, employeeName: string): string {
  const { whatsapp } = businessInfo;
  const message = encodeURIComponent(
    `🌟 LOYALTY Booking Request\n\n` +
    `Name: ${booking.name}\n` +
    `Phone: ${booking.phone}\n` +
    `Email: ${booking.email}\n` +
    `Service: ${serviceName}\n` +
    `Professional: ${employeeName}\n` +
    `Date: ${booking.date}\n` +
    `Time: ${booking.time}\n` +
    `Notes: ${booking.notes || "None"}\n\n` +
    `Please confirm my appointment!`
  );
  return `https://wa.me/${whatsapp}?text=${message}`;
}

export function getWhatsAppContactUrl(): string {
  const { whatsapp } = businessInfo;
  const message = encodeURIComponent("Hi! I'd like to know more about LOYALTY services.");
  return `https://wa.me/${whatsapp}?text=${message}`;
}
