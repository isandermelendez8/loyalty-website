"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  href,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-luxury-gold to-luxury-gold-dark text-luxury-black hover:shadow-lg hover:shadow-luxury-gold/25 hover:scale-105",
    secondary:
      "bg-luxury-card text-luxury-cream border border-luxury-border hover:border-luxury-gold/50 hover:bg-luxury-card/80",
    outline:
      "border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black",
    ghost:
      "text-luxury-cream hover:text-luxury-gold hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {children}
    </motion.button>
  );
}
