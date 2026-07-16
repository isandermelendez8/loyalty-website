"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { getWhatsAppContactUrl } from "@/lib/utils";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={getWhatsAppContactUrl()}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-500 shadow-lg shadow-green-500/30 flex items-center justify-center hover:bg-green-400 transition-colors"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </motion.a>
  );
}
