"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Instagram, MessageCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getBookableServices, serviceNames } from "@/data/services";
import { businessInfo } from "@/data/business";
import { formatDateISO, isDateBookable } from "@/lib/booking/rules";
import { getWhatsAppBookingUrl } from "@/lib/utils";
import SectionTitle, { AnimatedSection } from "../ui/SectionTitle";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

interface SlotInfo {
  start: string;
  end: string;
  label: string;
}

interface EmployeeData {
  id: string;
  name: string;
  email: string;
  role_en: string;
  role_es: string;
  specialties: string[];
}

interface BookingResult {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  employeeId: string;
  employeeName: string;
  date: string;
  time: string;
  endTime: string;
  notes: string;
  status: string;
}

export default function Booking() {
  const { locale, t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    serviceId: "",
    employeeId: "",
    date: "",
    time: "",
    notes: "",
  });
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [availableSlots, setAvailableSlots] = useState<SlotInfo[]>([]);
  const [monthBookings, setMonthBookings] = useState<Record<string, number>>({});
  const [showInstagram, setShowInstagram] = useState(false);
  const [instagramConfirmed, setInstagramConfirmed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [lastBooking, setLastBooking] = useState<BookingResult | null>(null);

  useEffect(() => {
    fetch("/api/employees")
      .then((r) => r.json())
      .then((data) => setEmployees(data.employees || []))
      .catch(() => {});
  }, []);

  const fetchMonthAvailability = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/bookings/availability?year=${currentMonth.getFullYear()}&month=${currentMonth.getMonth()}`
      );
      const data = await res.json();
      setMonthBookings(data.dateCounts || {});
    } catch {
      setMonthBookings({});
    }
  }, [currentMonth]);

  useEffect(() => {
    fetchMonthAvailability();
  }, [fetchMonthAvailability]);

  useEffect(() => {
    if (!form.date) {
      setAvailableSlots([]);
      return;
    }
    setSlotsLoading(true);
    fetch(`/api/bookings/availability?date=${form.date}`)
      .then((r) => r.json())
      .then((data) => setAvailableSlots(data.slots || []))
      .catch(() => setAvailableSlots([]))
      .finally(() => setSlotsLoading(false));
  }, [form.date]);

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }
    return days;
  }, [currentMonth]);

  const bookableServices = getBookableServices();

  const filteredEmployees = useMemo(() => {
    if (!form.serviceId) return employees;
    const service = bookableServices.find((s) => s.id === form.serviceId);
    if (!service) return employees;
    return employees.filter((e) => e.specialties.includes(service.category));
  }, [form.serviceId, employees]);

  const isDayFullyBooked = (dateStr: string) => (monthBookings[dateStr] || 0) >= 2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.phone || !form.email || !form.serviceId || !form.employeeId || !form.date || !form.time) {
      setError(t("booking.error.required"));
      return;
    }
    setShowInstagram(true);
  };

  const confirmBooking = async (skipInstagram = false) => {
    if (!skipInstagram && !instagramConfirmed) {
      setError(t("booking.error.instagram"));
      return;
    }

    setLoading(true);
    setError("");

    const employee = employees.find((e) => e.id === form.employeeId);
    const serviceName = serviceNames[form.serviceId]?.[locale] || form.serviceId;

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          serviceId: form.serviceId,
          serviceName,
          employeeId: form.employeeId,
          employeeName: employee?.name || form.employeeId,
          employeeEmail: employee?.email || "",
          appointmentDate: form.date,
          startTime: form.time,
          notes: form.notes,
          instagramConfirmed: instagramConfirmed || skipInstagram,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t("booking.error.failed"));
        setLoading(false);
        return;
      }

      setLastBooking(data.appointment);
      setShowInstagram(false);
      setShowSuccess(true);
      setForm({ name: "", phone: "", email: "", serviceId: "", employeeId: "", date: "", time: "", notes: "" });
      setInstagramConfirmed(false);
      fetchMonthAvailability();
    } catch {
      setError(t("booking.error.failed"));
    } finally {
      setLoading(false);
    }
  };

  const monthNames = locale === "en"
    ? ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    : ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  return (
    <section id="booking" className="section-padding bg-luxury-dark">
      <div className="container-custom max-w-3xl">
        <SectionTitle title={t("booking.title")} subtitle={t("booking.subtitle")} />

        <AnimatedSection>
          <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-luxury-cream/70 mb-1.5">{t("booking.name")} *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-luxury-black/50 border border-luxury-border focus:border-luxury-gold/50 focus:outline-none text-luxury-cream transition-colors" required />
              </div>
              <div>
                <label className="block text-sm text-luxury-cream/70 mb-1.5">{t("booking.phone")} *</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-luxury-black/50 border border-luxury-border focus:border-luxury-gold/50 focus:outline-none text-luxury-cream transition-colors" required />
              </div>
            </div>

            <div>
              <label className="block text-sm text-luxury-cream/70 mb-1.5">{t("booking.email")} *</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-luxury-black/50 border border-luxury-border focus:border-luxury-gold/50 focus:outline-none text-luxury-cream transition-colors" required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-luxury-cream/70 mb-1.5">{t("booking.service")} *</label>
                <select value={form.serviceId} onChange={(e) => setForm({ ...form, serviceId: e.target.value, employeeId: "" })}
                  className="w-full px-4 py-3 rounded-xl bg-luxury-black/50 border border-luxury-border focus:border-luxury-gold/50 focus:outline-none text-luxury-cream transition-colors" required>
                  <option value="">{t("booking.selectService")}</option>
                  {bookableServices.map((s) => (
                    <option key={s.id} value={s.id}>
                      {serviceNames[s.id]?.[locale]} - {s[locale === "en" ? "priceEn" : "priceEs"]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-luxury-cream/70 mb-1.5">{t("booking.employee")} *</label>
                <select value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-luxury-black/50 border border-luxury-border focus:border-luxury-gold/50 focus:outline-none text-luxury-cream transition-colors" required disabled={!form.serviceId}>
                  <option value="">{t("booking.selectEmployee")}</option>
                  {filteredEmployees.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name} - {locale === "en" ? e.role_en : e.role_es}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-luxury-cream/70 mb-3">{t("booking.date")} *</label>
              <div className="glass p-4 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="font-semibold text-luxury-cream">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </span>
                  <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                  {(locale === "en" ? ["Su","Mo","Tu","We","Th","Fr","Sa"] : ["Do","Lu","Ma","Mi","Ju","Vi","Sa"]).map((d) => (
                    <span key={d} className="text-luxury-cream/40 py-1">{d}</span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, i) => {
                    if (!day) return <div key={`empty-${i}`} />;
                    const dateStr = formatDateISO(day);
                    const bookable = isDateBookable(day);
                    const fullyBooked = isDayFullyBooked(dateStr);
                    const available = bookable && !fullyBooked;
                    const selected = form.date === dateStr;
                    return (
                      <button key={dateStr} type="button" disabled={!available}
                        onClick={() => setForm({ ...form, date: dateStr, time: "" })}
                        className={`py-2 rounded-lg text-sm transition-all ${
                          selected ? "bg-luxury-gold text-luxury-black font-bold"
                          : available ? "hover:bg-luxury-gold/20 text-luxury-cream"
                          : fullyBooked && bookable ? "text-orange-400/40 cursor-not-allowed line-through"
                          : "text-luxury-cream/20 cursor-not-allowed"
                        }`}>
                        {day.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {form.date && (
              <div>
                <label className="block text-sm text-luxury-cream/70 mb-3">{t("booking.time")} *</label>
                {slotsLoading ? (
                  <div className="flex items-center gap-2 text-luxury-cream/50 text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" /> {t("common.loading")}
                  </div>
                ) : availableSlots.length === 0 ? (
                  <p className="text-luxury-cream/50 text-sm">{t("booking.noSlots")}</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {availableSlots.map((slot) => (
                      <button key={slot.start} type="button" onClick={() => setForm({ ...form, time: slot.start })}
                        className={`py-4 px-4 rounded-xl text-sm transition-all ${
                          form.time === slot.start
                            ? "bg-luxury-gold text-luxury-black font-semibold"
                            : "glass hover:bg-luxury-gold/10 text-luxury-cream"
                        }`}>
                        <span className="block font-semibold">{slot.label}</span>
                        <span className="block text-xs opacity-70 mt-1">{t("booking.duration")}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm text-luxury-cream/70 mb-1.5">{t("booking.notes")}</label>
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3}
                placeholder={t("booking.notesPlaceholder")}
                className="w-full px-4 py-3 rounded-xl bg-luxury-black/50 border border-luxury-border focus:border-luxury-gold/50 focus:outline-none text-luxury-cream transition-colors resize-none" />
            </div>

            <Button type="submit" size="lg" className="w-full">{t("booking.submit")}</Button>
          </form>
        </AnimatedSection>
      </div>

      <Modal isOpen={showInstagram} onClose={() => setShowInstagram(false)} title={t("booking.instagram.title")}>
        <div className="text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center mx-auto">
            <Instagram className="w-8 h-8 text-white" />
          </div>
          <p className="text-luxury-cream/70">{t("booking.instagram.desc")}</p>
          <p className="text-luxury-gold font-medium">@{businessInfo.instagram.split("/").pop()}</p>
          <label className="flex items-center gap-3 justify-center cursor-pointer">
            <input type="checkbox" checked={instagramConfirmed} onChange={(e) => setInstagramConfirmed(e.target.checked)}
              className="w-5 h-5 rounded border-luxury-border accent-luxury-gold" />
            <span className="text-luxury-cream text-sm">{t("booking.instagram.confirm")}</span>
          </label>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex flex-col gap-3">
            <Button href={businessInfo.instagram} variant="secondary" className="w-full">
              <Instagram className="w-4 h-4 mr-2" />{t("booking.instagram.open")}
            </Button>
            <Button onClick={() => confirmBooking(false)} className="w-full" disabled={!instagramConfirmed || loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {t("booking.submit")}
            </Button>
            <button onClick={() => confirmBooking(true)} className="text-luxury-cream/50 hover:text-luxury-gold text-sm transition-colors">
              {t("booking.instagram.skip")}
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showSuccess} onClose={() => setShowSuccess(false)}>
        <div className="text-center space-y-6 pt-4">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 10 }}
            className="w-20 h-20 rounded-full bg-luxury-gold/20 flex items-center justify-center mx-auto">
            <span className="text-4xl">✓</span>
          </motion.div>
          <h3 className="text-2xl font-display font-bold gold-text">{t("booking.success.title")}</h3>
          <p className="text-luxury-cream/70">{t("booking.success.emailSent")}</p>
          {lastBooking && (
            <div className="glass p-4 rounded-xl text-left text-sm space-y-2">
              <p className="font-semibold text-luxury-gold mb-2">{t("booking.success.details")}</p>
              <p><span className="text-luxury-cream/50">Service:</span> {lastBooking.serviceName}</p>
              <p><span className="text-luxury-cream/50">Date:</span> {lastBooking.date}</p>
              <p><span className="text-luxury-cream/50">Time:</span> {lastBooking.time} - {lastBooking.endTime}</p>
              <p><span className="text-luxury-cream/50">Employee:</span> {lastBooking.employeeName}</p>
            </div>
          )}
          <div className="flex flex-col gap-3">
            {lastBooking && (
              <Button href={getWhatsAppBookingUrl(
                { id: lastBooking.id, name: lastBooking.customerName, phone: lastBooking.customerPhone, email: lastBooking.customerEmail,
                  serviceId: lastBooking.serviceId, employeeId: lastBooking.employeeId, date: lastBooking.date,
                  time: lastBooking.time, notes: lastBooking.notes, instagramConfirmed: true, createdAt: "", status: "confirmed" },
                lastBooking.serviceName, lastBooking.employeeName
              )} variant="secondary" className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />{t("booking.success.whatsapp")}
              </Button>
            )}
            <Button onClick={() => setShowSuccess(false)} className="w-full">{t("booking.success.close")}</Button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
