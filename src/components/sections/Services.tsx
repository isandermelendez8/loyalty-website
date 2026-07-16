"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Clock, DollarSign, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { services, serviceNames } from "@/data/services";
import SectionTitle, { AnimatedSection } from "../ui/SectionTitle";
import Button from "../ui/Button";
import ServicesModal from "../modals/ServicesModal";

export default function Services() {
  const { locale, t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const featured = services.filter((s) => s.featured);

  return (
    <section id="services" className="section-padding bg-luxury-dark">
      <div className="container-custom">
        <SectionTitle
          title={t("services.title")}
          subtitle={t("services.subtitle")}
        />

        <AnimatedSection>
          <div className="glass-card p-4 sm:p-5 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              </div>
              <div>
                <p className="text-luxury-cream font-semibold text-sm sm:text-base">{t("services.nowAvailable")}</p>
                <p className="text-luxury-cream/50 text-xs sm:text-sm">{t("services.nowAvailableList")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-luxury-gold/30 bg-luxury-gold/10">
              <Sparkles className="w-4 h-4 text-luxury-gold" />
              <span className="text-luxury-gold text-sm font-medium">{t("services.comingSoon")}</span>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((service, i) => {
            const names = serviceNames[service.id];
            const isComingSoon = service.comingSoon;
            return (
              <AnimatedSection key={service.id} delay={i * 0.1}>
                <motion.div
                  whileHover={isComingSoon ? {} : { y: -8 }}
                  className={`group glass-card overflow-hidden h-full flex flex-col ${isComingSoon ? "opacity-80" : ""}`}
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={names[locale === "en" ? "en" : "es"]}
                      fill
                      className={`object-cover transition-transform duration-500 ${isComingSoon ? "grayscale-[30%]" : "group-hover:scale-110"}`}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-card to-transparent" />
                    {isComingSoon ? (
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-luxury-gold/90 text-luxury-black text-xs font-bold uppercase">
                        {t("services.comingSoon")}
                      </span>
                    ) : (
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-green-500/90 text-white text-xs font-bold uppercase">
                        {t("services.available")}
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-display font-semibold text-luxury-cream mb-2">
                      {names[locale === "en" ? "en" : "es"]}
                    </h3>
                    <p className="text-luxury-cream/60 text-sm mb-4 flex-1">
                      {names[locale === "en" ? "descEn" : "descEs"]}
                    </p>
                    {!isComingSoon && (
                      <div className="flex items-center gap-4 mb-4 text-sm">
                        <span className="flex items-center gap-1.5 text-luxury-gold">
                          <DollarSign className="w-4 h-4" />
                          {service[locale === "en" ? "priceEn" : "priceEs"]}
                        </span>
                        <span className="flex items-center gap-1.5 text-luxury-cream/60">
                          <Clock className="w-4 h-4" />
                          {service[locale === "en" ? "durationEn" : "durationEs"]}
                        </span>
                      </div>
                    )}
                    {isComingSoon ? (
                      <Button variant="secondary" size="sm" className="w-full" disabled>
                        {t("services.comingSoon")}
                      </Button>
                    ) : (
                      <Button href="#booking" size="sm" className="w-full">
                        {t("services.book")}
                      </Button>
                    )}
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection className="text-center mt-10">
          <p className="text-luxury-cream/40 text-sm mb-4">{t("services.moreComingSoon")}</p>
          <Button variant="outline" size="lg" onClick={() => setShowAll(true)}>
            {t("services.viewAll")}
          </Button>
        </AnimatedSection>
      </div>

      <ServicesModal isOpen={showAll} onClose={() => setShowAll(false)} />
    </section>
  );
}
