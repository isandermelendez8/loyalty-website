"use client";

import Image from "next/image";
import { Clock, DollarSign } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { services, serviceNames, categoryLabels } from "@/data/services";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ServicesModal({ isOpen, onClose }: ServicesModalProps) {
  const { locale, t } = useLanguage();

  const grouped = Object.keys(categoryLabels).map((cat) => ({
    category: cat,
    label: categoryLabels[cat],
    items: services.filter((s) => s.category === cat),
  }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("services.allServices")}
      size="xl"
    >
      <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-2">
        {grouped.map((group) => (
          <div key={group.category}>
            <h3 className="text-lg font-display font-semibold text-luxury-gold mb-4 sticky top-0 bg-luxury-card/95 backdrop-blur py-2">
              {group.label[locale]}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {group.items.map((service) => {
                const names = serviceNames[service.id];
                return (
                  <div
                    key={service.id}
                    className={`flex gap-4 glass p-4 rounded-xl relative ${service.comingSoon ? "opacity-70" : ""}`}
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={service.image}
                        alt={names[locale]}
                        fill
                        className={`object-cover ${service.comingSoon ? "grayscale-[40%]" : ""}`}
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-luxury-cream text-sm truncate">
                          {names[locale]}
                        </h4>
                        {service.comingSoon && (
                          <span className="px-2 py-0.5 rounded-full bg-luxury-gold/20 text-luxury-gold text-[10px] font-bold uppercase shrink-0">
                            {t("services.comingSoon")}
                          </span>
                        )}
                      </div>
                      <p className="text-luxury-cream/50 text-xs mt-1 line-clamp-2">
                        {names[locale === "en" ? "descEn" : "descEs"]}
                      </p>
                      {!service.comingSoon && (
                        <div className="flex items-center gap-3 mt-2 text-xs">
                          <span className="flex items-center gap-1 text-luxury-gold">
                            <DollarSign className="w-3 h-3" />
                            {service[locale === "en" ? "priceEn" : "priceEs"]}
                          </span>
                          <span className="flex items-center gap-1 text-luxury-cream/50">
                            <Clock className="w-3 h-3" />
                            {service[locale === "en" ? "durationEn" : "durationEs"]}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <p className="text-center text-luxury-cream/40 text-sm py-2">{t("services.moreComingSoon")}</p>
      </div>
      <div className="mt-6 pt-4 border-t border-luxury-border/30">
        <Button href="#booking" className="w-full" onClick={onClose}>
          {t("services.book")}
        </Button>
      </div>
    </Modal>
  );
}
