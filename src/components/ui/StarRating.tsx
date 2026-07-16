"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export default function StarRating({
  rating,
  size = "md",
  interactive = false,
  onRate,
}: StarRatingProps) {
  const sizes = {
    sm: "w-3 h-3",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onRate?.(star)}
          className={`${interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}`}
        >
          <Star
            className={`${sizes[size]} ${
              star <= rating
                ? "fill-luxury-gold text-luxury-gold"
                : "fill-transparent text-luxury-border"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
