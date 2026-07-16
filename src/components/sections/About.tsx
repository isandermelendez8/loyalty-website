"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { employees } from "@/data/employees";
import SectionTitle, { AnimatedSection } from "../ui/SectionTitle";

const whyKeys = ["about.why.1", "about.why.2", "about.why.3", "about.why.4", "about.why.5", "about.why.6"];

export default function About() {
  const { locale, t } = useLanguage();

  return (
    <section id="about" className="section-padding bg-luxury-dark">
      <div className="container-custom">
        <SectionTitle title={t("about.title")} subtitle={t("about.subtitle")} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <AnimatedSection>
            <div className="relative h-80 lg:h-full min-h-[320px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
                alt="LOYALTY Studio Interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/80 to-transparent" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h3 className="text-2xl font-display font-semibold text-luxury-gold mb-4">
              {t("about.story.title")}
            </h3>
            <p className="text-luxury-cream/70 leading-relaxed mb-8">
              {t("about.story.text")}
            </p>
            <h3 className="text-2xl font-display font-semibold text-luxury-gold mb-4">
              {t("about.mission.title")}
            </h3>
            <p className="text-luxury-cream/70 leading-relaxed">
              {t("about.mission.text")}
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection>
          <h3 className="text-2xl font-display font-semibold text-luxury-gold mb-8 text-center">
            {t("about.why.title")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {whyKeys.map((key, i) => (
              <motion.div
                key={key}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 glass p-4 rounded-xl"
              >
                <div className="w-8 h-8 rounded-full bg-luxury-gold/20 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-luxury-gold" />
                </div>
                <span className="text-luxury-cream/80">{t(key)}</span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        <SectionTitle
          title={t("about.team.title")}
          subtitle={t("about.team.subtitle")}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {employees.map((emp, i) => (
            <AnimatedSection key={emp.id} delay={i * 0.1}>
              <motion.div whileHover={{ y: -6 }} className="text-center group">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 ring-2 ring-luxury-border group-hover:ring-luxury-gold/50 transition-all">
                  <Image
                    src={emp.image}
                    alt={emp.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, 20vw"
                  />
                </div>
                <h4 className="font-semibold text-luxury-cream">{emp.name}</h4>
                <p className="text-luxury-gold text-sm">
                  {emp[locale === "en" ? "roleEn" : "roleEs"]}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
