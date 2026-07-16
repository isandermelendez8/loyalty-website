"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ExternalLink, Navigation } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { businessInfo } from "@/data/business";
import SectionTitle, { AnimatedSection } from "../ui/SectionTitle";
import Button from "../ui/Button";

export default function Location() {
  const { locale, t } = useLanguage();

  return (
    <section id="location" className="section-padding bg-luxury-black">
      <div className="container-custom">
        <SectionTitle
          title={t("location.title")}
          subtitle={t("location.subtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <AnimatedSection className="lg:col-span-3">
            <div className="glass-card overflow-hidden rounded-2xl relative group">
              <div className="relative h-[350px] sm:h-[450px] lg:h-[500px]">
                <iframe
                  src={businessInfo.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="LOYALTY Location Map"
                  className="absolute inset-0 w-full h-full"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none z-10"
                >
                  <div className="flex flex-col items-center">
                    <MapPin className="w-10 h-10 text-luxury-gold drop-shadow-lg fill-luxury-gold/30" />
                    <span className="mt-1 px-3 py-1 rounded-full bg-luxury-black/80 backdrop-blur text-luxury-gold text-xs font-bold border border-luxury-gold/30">
                      LOYALTY
                    </span>
                  </div>
                </motion.div>
              </div>
              <div className="p-4 border-t border-luxury-border/30 flex flex-col sm:flex-row gap-3">
                <a
                  href={businessInfo.mapLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl glass hover:bg-luxury-gold/10 transition-colors text-luxury-cream text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4 text-luxury-gold" />
                  {t("location.openMap")}
                </a>
                <a
                  href={businessInfo.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-luxury-gold/10 hover:bg-luxury-gold/20 border border-luxury-gold/30 transition-colors text-luxury-gold text-sm font-medium"
                >
                  <Navigation className="w-4 h-4" />
                  {t("location.directions")}
                </a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="lg:col-span-2">
            <div className="space-y-4 h-full flex flex-col">
              <div className="glass-card p-5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-luxury-gold shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-luxury-cream mb-1">{t("location.address")}</h4>
                    <p className="text-luxury-cream/70 text-sm leading-relaxed">
                      {businessInfo.address}<br />
                      {businessInfo.city}, {businessInfo.state} {businessInfo.zip}<br />
                      {businessInfo.country}
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-5 flex-1">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-luxury-gold shrink-0 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-luxury-cream mb-3">{t("location.hours")}</h4>
                    <div className="space-y-1.5">
                      {businessInfo.hours.map((h) => (
                        <div key={h.dayEn} className="flex justify-between text-sm gap-4">
                          <span className="text-luxury-cream/70">{h[locale === "en" ? "dayEn" : "dayEs"]}</span>
                          <span className={h.closed ? "text-luxury-cream/40" : "text-luxury-gold"}>
                            {h.closed ? t("location.closed") : h.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-5">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-luxury-gold shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-luxury-cream mb-2">{t("location.contact")}</h4>
                    <a href={`tel:${businessInfo.phone}`} className="block text-luxury-cream/70 hover:text-luxury-gold transition-colors text-sm mb-1">
                      {businessInfo.phone}
                    </a>
                    <a href={`mailto:${businessInfo.email}`} className="flex items-center gap-2 text-luxury-cream/70 hover:text-luxury-gold transition-colors text-sm">
                      <Mail className="w-3.5 h-3.5" />
                      {businessInfo.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
