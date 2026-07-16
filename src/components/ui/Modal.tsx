"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode } from "react";
import { useLockBody } from "@/hooks/useInView";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
}: ModalProps) {
  useLockBody(isOpen);

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative w-full ${sizes[size]} max-h-[90vh] overflow-y-auto glass-card p-6 sm:p-8`}
          >
            {title && (
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold text-luxury-cream">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-luxury-cream" />
                </button>
              </div>
            )}
            {!title && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-luxury-cream" />
              </button>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
