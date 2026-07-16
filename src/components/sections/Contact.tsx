"use client";

import { useState } from "react";
import { Instagram, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { businessInfo } from "@/data/business";
import { getWhatsAppContactUrl } from "@/lib/utils";
import SectionTitle, { AnimatedSection } from "../ui/SectionTitle";
import Button from "../ui/Button";

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
      }
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-luxury-dark">
      <div className="container-custom max-w-4xl">
        <SectionTitle title={t("contact.title")} subtitle={t("contact.subtitle")} />

        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <form onSubmit={handleSubmit} className="lg:col-span-3 glass-card p-6 sm:p-8 space-y-4">
              {submitted && (
                <div className="p-3 rounded-lg bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-sm">
                  {t("contact.success")}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-luxury-cream/70 mb-1.5">
                    {t("contact.name")} *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-luxury-black/50 border border-luxury-border focus:border-luxury-gold/50 focus:outline-none text-luxury-cream transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-luxury-cream/70 mb-1.5">
                    {t("contact.phone")}
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-luxury-black/50 border border-luxury-border focus:border-luxury-gold/50 focus:outline-none text-luxury-cream transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-luxury-cream/70 mb-1.5">
                  {t("contact.email")} *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-luxury-black/50 border border-luxury-border focus:border-luxury-gold/50 focus:outline-none text-luxury-cream transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-luxury-cream/70 mb-1.5">
                  {t("contact.message")} *
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  placeholder={t("contact.placeholder")}
                  className="w-full px-4 py-3 rounded-xl bg-luxury-black/50 border border-luxury-border focus:border-luxury-gold/50 focus:outline-none text-luxury-cream transition-colors resize-none"
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? t("common.loading") : t("contact.send")}
              </Button>
            </form>

            <div className="lg:col-span-2 flex flex-col gap-4">
              <a
                href={getWhatsAppContactUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-6 flex items-center gap-4 hover:border-green-500/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                  <MessageCircle className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-luxury-cream">WhatsApp</p>
                  <p className="text-luxury-cream/50 text-sm">{t("contact.whatsapp")}</p>
                </div>
              </a>

              <a
                href={businessInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-6 flex items-center gap-4 hover:border-pink-500/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-400/20 flex items-center justify-center group-hover:from-purple-500/30 group-hover:via-pink-500/30 group-hover:to-orange-400/30 transition-colors">
                  <Instagram className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <p className="font-semibold text-luxury-cream">Instagram</p>
                  <p className="text-luxury-cream/50 text-sm">
                    @{businessInfo.instagram.split("/").pop()}
                  </p>
                </div>
              </a>

              <div className="glass-card p-6 mt-auto">
                <p className="text-luxury-cream/50 text-sm mb-2">Phone</p>
                <a
                  href={`tel:${businessInfo.phone}`}
                  className="text-luxury-gold font-semibold hover:underline"
                >
                  {businessInfo.phone}
                </a>
                <p className="text-luxury-cream/50 text-sm mt-4 mb-2">Email</p>
                <a
                  href={`mailto:${businessInfo.email}`}
                  className="text-luxury-gold font-semibold hover:underline"
                >
                  {businessInfo.email}
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
