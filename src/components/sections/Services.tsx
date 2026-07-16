"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Clock, DollarSign } from "lucide-react";
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((service, i) => {
            const names = serviceNames[service.id];
            return (
              <AnimatedSection key={service.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group glass-card overflow-hidden h-full flex flex-col"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={names[locale === "en" ? "en" : "es"]}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-card to-transparent" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-display font-semibold text-luxury-cream mb-2">
                      {names[locale === "en" ? "en" : "es"]}
                    </h3>
                    <p className="text-luxury-cream/60 text-sm mb-4 flex-1">
                      {names[locale === "en" ? "descEn" : "descEs"]}
                    </p>
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
                    <Button href="#booking" size="sm" className="w-full">
                      {t("services.book")}
                    </Button>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection className="text-center mt-12">
          <Button variant="outline" size="lg" onClick={() => setShowAll(true)}>
            {t("services.viewAll")}
          </Button>
        </AnimatedSection>
      </div>

      <ServicesModal isOpen={showAll} onClose={() => setShowAll(false)} />
    </section>
  );
}
