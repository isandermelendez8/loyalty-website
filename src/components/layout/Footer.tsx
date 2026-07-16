"use client";

import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { businessInfo } from "@/data/business";
import { categoryLabels } from "@/data/services";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-luxury-dark border-t border-luxury-border/30">
      <div className="container-custom section-padding !py-12 lg:!py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-display font-bold gold-text mb-4">
              LOYALTY
            </h3>
            <p className="text-luxury-cream/60 text-sm leading-relaxed mb-6">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-3">
              <a
                href={businessInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full glass hover:bg-luxury-gold/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-luxury-gold" />
              </a>
              <a
                href={businessInfo.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full glass hover:bg-luxury-gold/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-luxury-gold" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-luxury-cream font-semibold mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2.5">
              {[
                { key: "nav.home", href: "#home" },
                { key: "nav.about", href: "#about" },
                { key: "nav.pricing", href: "#pricing" },
                { key: "nav.gallery", href: "#gallery" },
                { key: "nav.reviews", href: "#reviews" },
                { key: "nav.book", href: "#booking" },
              ].map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-luxury-cream/60 hover:text-luxury-gold transition-colors text-sm"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-luxury-cream font-semibold mb-4">
              {t("footer.services")}
            </h4>
            <ul className="space-y-2.5">
              {Object.entries(categoryLabels).map(([key, label]) => (
                <li key={key}>
                  <a
                    href="#services"
                    className="text-luxury-cream/60 hover:text-luxury-gold transition-colors text-sm"
                  >
                    {label.en}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-luxury-cream font-semibold mb-4">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-luxury-cream/60">
                <MapPin className="w-4 h-4 text-luxury-gold mt-0.5 shrink-0" />
                <span>
                  {businessInfo.address}, {businessInfo.city},{" "}
                  {businessInfo.state} {businessInfo.zip}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${businessInfo.phone}`}
                  className="flex items-center gap-2.5 text-sm text-luxury-cream/60 hover:text-luxury-gold transition-colors"
                >
                  <Phone className="w-4 h-4 text-luxury-gold" />
                  {businessInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${businessInfo.email}`}
                  className="flex items-center gap-2.5 text-sm text-luxury-cream/60 hover:text-luxury-gold transition-colors"
                >
                  <Mail className="w-4 h-4 text-luxury-gold" />
                  {businessInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-luxury-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-luxury-cream/40 text-sm">
            &copy; {year} LOYALTY. {t("footer.rights")}
          </p>
          <p className="text-luxury-cream/40 text-sm">
            Miami Beach, FL
          </p>
        </div>
      </div>
    </footer>
  );
}
