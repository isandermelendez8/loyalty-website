// Appointment booking rules
// Each appointment is 4 hours. Max 2 appointments per day at fixed slots.

export const APPOINTMENT_SLOTS = [
  { start: "10:00 AM", end: "2:00 PM", label: "10:00 AM - 2:00 PM" },
  { start: "3:00 PM", end: "7:00 PM", label: "3:00 PM - 7:00 PM" },
] as const;

export const MAX_APPOINTMENTS_PER_DAY = 2;
export const APPOINTMENT_DURATION_HOURS = 4;
export const CLOSED_DAYS = [0]; // Sunday

export function getEndTime(startTime: string): string {
  const slot = APPOINTMENT_SLOTS.find((s) => s.start === startTime);
  return slot?.end || "";
}

export function isValidSlot(time: string): boolean {
  return APPOINTMENT_SLOTS.some((s) => s.start === time);
}

export function isDateBookable(date: Date): boolean {
  if (CLOSED_DAYS.includes(date.getDay())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
}

export function formatDateISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatDisplayDate(dateStr: string, locale = "en"): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getAvailableSlots(bookedTimes: string[]): typeof APPOINTMENT_SLOTS[number][] {
  return APPOINTMENT_SLOTS.filter((slot) => !bookedTimes.includes(slot.start));
}

export function isDayFullyBooked(bookedCount: number): boolean {
  return bookedCount >= MAX_APPOINTMENTS_PER_DAY;
}
