"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { reviews as defaultReviews } from "@/data/reviews";
import SectionTitle, { AnimatedSection } from "../ui/SectionTitle";
import StarRating from "../ui/StarRating";
import Button from "../ui/Button";
import ReviewModal from "../modals/ReviewModal";

export default function Reviews() {
  const { locale, t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [allReviews, setAllReviews] = useState(defaultReviews);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % allReviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [allReviews.length]);

  const next = () => setCurrent((prev) => (prev + 1) % allReviews.length);
  const prev = () => setCurrent((prev) => (prev - 1 + allReviews.length) % allReviews.length);

  return (
    <section id="reviews" className="section-padding bg-luxury-black">
      <div className="container-custom">
        <SectionTitle
          title={t("reviews.title")}
          subtitle={t("reviews.subtitle")}
        />

        <AnimatedSection>
          <div className="relative max-w-3xl mx-auto">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card p-8 sm:p-10 text-center"
                >
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 ring-2 ring-luxury-gold/30">
                    <Image
                      src={allReviews[current].image}
                      alt={allReviews[current].name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex justify-center mb-4">
                    <StarRating rating={allReviews[current].rating} />
                  </div>
                  <p className="text-luxury-cream/80 text-lg italic mb-4 leading-relaxed">
                    &ldquo;{allReviews[current][locale === "en" ? "textEn" : "textEs"]}&rdquo;
                  </p>
                  <p className="text-luxury-gold font-semibold">
                    {allReviews[current].name}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 p-2 rounded-full glass hover:bg-luxury-gold/20 transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 p-2 rounded-full glass hover:bg-luxury-gold/20 transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {allReviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? "bg-luxury-gold w-6" : "bg-luxury-border"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" onClick={() => setShowReviewForm(true)}>
              {t("reviews.leave")}
            </Button>
          </div>
        </AnimatedSection>
      </div>

      <ReviewModal
        isOpen={showReviewForm}
        onClose={() => setShowReviewForm(false)}
        onSubmit={() => setShowReviewForm(false)}
      />
    </section>
  );
}
