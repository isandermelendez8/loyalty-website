"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { businessInfo } from "@/data/business";
import SectionTitle, { AnimatedSection } from "../ui/SectionTitle";
import Button from "../ui/Button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Location() {
  const { locale, t } = useLanguage();

  return (
    <section id="location" className="section-padding bg-luxury-black">
      <div className="container-custom">
        <SectionTitle
          title={t("location.title")}
          subtitle={t("location.subtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="glass-card overflow-hidden rounded-2xl h-[400px] lg:h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229359.9183757427!2d-80.2102185!3d25.782545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b69d4c5c5c5d%3A0x8b5c5c5c5c5c5c5c!2sMiami%20Beach%2C%20FL!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LOYALTY Location"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-luxury-gold shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-luxury-cream mb-1">
                      {t("location.address")}
                    </h4>
                    <p className="text-luxury-cream/70">
                      {businessInfo.address}
                      <br />
                      {businessInfo.city}, {businessInfo.state} {businessInfo.zip}
                      <br />
                      {businessInfo.country}
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-luxury-gold shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-luxury-cream mb-3">
                      {t("location.hours")}
                    </h4>
                    <div className="space-y-2">
                      {businessInfo.hours.map((h) => (
                        <div
                          key={h.dayEn}
                          className="flex justify-between text-sm gap-4"
                        >
                          <span className="text-luxury-cream/70">
                            {h[locale === "en" ? "dayEn" : "dayEs"]}
                          </span>
                          <span
                            className={
                              h.closed
                                ? "text-luxury-cream/40"
                                : "text-luxury-gold"
                            }
                          >
                            {h.closed ? t("location.closed") : h.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-luxury-gold shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-luxury-cream mb-2">
                      {t("location.contact")}
                    </h4>
                    <a
                      href={`tel:${businessInfo.phone}`}
                      className="block text-luxury-cream/70 hover:text-luxury-gold transition-colors mb-1"
                    >
                      {businessInfo.phone}
                    </a>
                    <a
                      href={`mailto:${businessInfo.email}`}
                      className="flex items-center gap-2 text-luxury-cream/70 hover:text-luxury-gold transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {businessInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              <Button
                href={businessInfo.mapDirectionsUrl}
                size="lg"
                className="w-full"
              >
                <MapPin className="w-4 h-4 mr-2" />
                {t("location.directions")}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
