"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { galleryItems } from "@/data/gallery";
import SectionTitle, { AnimatedSection } from "../ui/SectionTitle";
import { useLockBody } from "@/hooks/useInView";

type Category = "all" | "haircuts" | "tattoos" | "studio" | "beforeafter";

const categories: Category[] = ["all", "haircuts", "tattoos", "studio", "beforeafter"];

export default function Gallery() {
  const { locale, t } = useLanguage();
  const [filter, setFilter] = useState<Category>("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  useLockBody(!!lightbox);

  const filtered =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  const lightboxItem = galleryItems.find((item) => item.id === lightbox);

  return (
    <section id="gallery" className="section-padding bg-luxury-black">
      <div className="container-custom">
        <SectionTitle
          title={t("gallery.title")}
          subtitle={t("gallery.subtitle")}
        />

        <AnimatedSection>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? "bg-luxury-gold text-luxury-black"
                    : "glass text-luxury-cream/70 hover:text-luxury-gold"
                }`}
              >
                {t(`gallery.${cat}`)}
              </button>
            ))}
          </div>

          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => setLightbox(item.id)}
                >
                  <Image
                    src={item.image}
                    alt={item[locale === "en" ? "titleEn" : "titleEs"]}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-luxury-black/0 group-hover:bg-luxury-black/50 transition-colors flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-luxury-cream opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-luxury-black/80 to-transparent">
                    <p className="text-sm text-luxury-cream font-medium">
                      {item[locale === "en" ? "titleEn" : "titleEs"]}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </AnimatedSection>
      </div>

      <AnimatePresence>
        {lightbox && lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[85vh] w-full aspect-square sm:aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxItem.image}
                alt={lightboxItem[locale === "en" ? "titleEn" : "titleEs"]}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>
            <p className="absolute bottom-6 text-luxury-cream text-lg font-medium">
              {lightboxItem[locale === "en" ? "titleEn" : "titleEs"]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
