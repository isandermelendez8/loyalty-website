"use client";

import { motion } from "framer-motion";
import { Clock, DollarSign, Sparkles, Tag } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { services, serviceNames, categoryLabels } from "@/data/services";
import { packages, promotions } from "@/data/packages";
import SectionTitle, { AnimatedSection } from "../ui/SectionTitle";

export default function Pricing() {
  const { locale, t } = useLanguage();

  const grouped = Object.keys(categoryLabels).map((cat) => ({
    category: cat,
    label: categoryLabels[cat],
    items: services.filter((s) => s.category === cat),
  }));

  return (
    <section id="pricing" className="section-padding bg-luxury-black">
      <div className="container-custom">
        <SectionTitle
          title={t("pricing.title")}
          subtitle={t("pricing.subtitle")}
        />

        <div className="space-y-12">
          {grouped.map((group, gi) => (
            <AnimatedSection key={group.category} delay={gi * 0.1}>
              <h3 className="text-2xl font-display font-semibold text-luxury-gold mb-6 pb-2 border-b border-luxury-border/30">
                {group.label[locale]}
              </h3>
              <div className="grid gap-4">
                {group.items.map((service) => {
                  const names = serviceNames[service.id];
                  return (
                    <motion.div
                      key={service.id}
                      whileHover={{ x: 4 }}
                      className="glass-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-luxury-cream">
                          {names[locale]}
                        </h4>
                        <p className="text-luxury-cream/50 text-sm mt-1">
                          {names[locale === "en" ? "descEn" : "descEs"]}
                        </p>
                      </div>
                      <div className="flex items-center gap-6 text-sm shrink-0">
                        <span className="flex items-center gap-1.5 text-luxury-gold font-medium">
                          <DollarSign className="w-4 h-4" />
                          {service[locale === "en" ? "priceEn" : "priceEs"]}
                        </span>
                        <span className="flex items-center gap-1.5 text-luxury-cream/60">
                          <Clock className="w-4 h-4" />
                          {service[locale === "en" ? "durationEn" : "durationEs"]}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-16">
          <h3 className="text-2xl font-display font-semibold text-luxury-gold mb-8 text-center">
            {t("pricing.packages")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                whileHover={{ y: -6 }}
                className={`glass-card p-6 relative ${pkg.popular ? "border-luxury-gold/50" : ""}`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-luxury-gold text-luxury-black text-xs font-bold rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {t("pricing.popular")}
                  </span>
                )}
                <h4 className="text-lg font-display font-semibold text-luxury-cream mb-2">
                  {pkg[locale === "en" ? "nameEn" : "nameEs"]}
                </h4>
                <p className="text-luxury-cream/50 text-sm mb-4">
                  {pkg[locale === "en" ? "descriptionEn" : "descriptionEs"]}
                </p>
                <p className="text-3xl font-bold gold-text">{pkg.price}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-16">
          <h3 className="text-2xl font-display font-semibold text-luxury-gold mb-8 text-center">
            {t("pricing.promotions")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promotions.map((promo) => (
              <motion.div
                key={promo.id}
                whileHover={{ scale: 1.02 }}
                className="glass p-6 rounded-2xl text-center"
              >
                <Tag className="w-8 h-8 text-luxury-gold mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-luxury-cream mb-2">
                  {promo[locale === "en" ? "titleEn" : "titleEs"]}
                </h4>
                <p className="text-luxury-cream/60 text-sm mb-3">
                  {promo[locale === "en" ? "descEn" : "descEs"]}
                </p>
                <span className="inline-block px-4 py-1.5 bg-luxury-gold/10 border border-luxury-gold/30 rounded-full text-luxury-gold text-sm font-mono">
                  {t("pricing.useCode")}: {promo.code}
                </span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
