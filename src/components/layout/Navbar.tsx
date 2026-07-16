"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollY } from "@/hooks/useInView";
import Button from "./ui/Button";

const navLinks = [
  { key: "nav.home", href: "#home" },
  { key: "nav.services", href: "#services" },
  { key: "nav.pricing", href: "#pricing" },
  { key: "nav.gallery", href: "#gallery" },
  { key: "nav.reviews", href: "#reviews" },
  { key: "nav.about", href: "#about" },
  { key: "nav.location", href: "#location" },
  { key: "nav.contact", href: "#contact" },
];

export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const scrollY = useScrollY();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setScrolled(scrollY > 50);
  }, [scrollY]);

  const toggleLocale = () => {
    setLocale(locale === "en" ? "es" : "en");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-luxury-black/90 backdrop-blur-xl border-b border-luxury-border/30 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#home" className="flex items-center gap-2 group">
            <span className="text-2xl lg:text-3xl font-display font-bold gold-text tracking-wider">
              LOYALTY
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm text-luxury-cream/80 hover:text-luxury-gold transition-colors duration-300 relative group"
              >
                {t(link.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-luxury-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-luxury-border hover:border-luxury-gold/50 transition-colors text-sm"
              aria-label="Switch language"
            >
              <Globe className="w-4 h-4 text-luxury-gold" />
              <span className="text-luxury-cream font-medium">
                {locale === "en" ? "ES" : "EN"}
              </span>
            </button>
            <Button href="#booking" size="sm">
              {t("nav.book")}
            </Button>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1 px-2 py-1 rounded-full border border-luxury-border text-xs"
            >
              <Globe className="w-3.5 h-3.5 text-luxury-gold" />
              <span>{locale === "en" ? "ES" : "EN"}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-luxury-black/95 backdrop-blur-xl border-b border-luxury-border/30"
          >
            <div className="container-custom px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.key}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setIsOpen(false)}
                  className="text-lg text-luxury-cream/80 hover:text-luxury-gold transition-colors py-2"
                >
                  {t(link.key)}
                </motion.a>
              ))}
              <Button href="#booking" className="mt-2" onClick={() => setIsOpen(false)}>
                {t("nav.book")}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
