"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { saveReview } from "@/lib/utils";
import Modal from "../ui/Modal";
import StarRating from "../ui/StarRating";
import Button from "../ui/Button";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function ReviewModal({ isOpen, onClose, onSubmit }: ReviewModalProps) {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) return;

    saveReview({ name, rating, text });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setName("");
      setRating(5);
      setText("");
      onSubmit();
      onClose();
    }, 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("reviews.form.title")}
    >
      {success ? (
        <div className="text-center py-8">
          <p className="text-luxury-gold text-lg font-semibold">
            {t("reviews.form.success")}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-luxury-cream/70 mb-1.5">
              {t("reviews.form.name")} *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-luxury-black/50 border border-luxury-border focus:border-luxury-gold/50 focus:outline-none text-luxury-cream transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-luxury-cream/70 mb-2">
              {t("reviews.form.rating")}
            </label>
            <StarRating rating={rating} interactive onRate={setRating} />
          </div>

          <div>
            <label className="block text-sm text-luxury-cream/70 mb-1.5">
              {t("reviews.form.review")} *
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder={t("reviews.form.placeholder")}
              className="w-full px-4 py-3 rounded-xl bg-luxury-black/50 border border-luxury-border focus:border-luxury-gold/50 focus:outline-none text-luxury-cream transition-colors resize-none"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            {t("reviews.form.submit")}
          </Button>
        </form>
      )}
    </Modal>
  );
}
