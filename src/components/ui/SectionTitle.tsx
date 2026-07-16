"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ReactNode } from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
}: SectionTitleProps) {
  const { ref, isInView } = useInView();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`mb-12 lg:mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
        <span className="gold-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-luxury-cream/70 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-6 h-1 w-20 gold-gradient rounded-full ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </motion.div>
  );
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
