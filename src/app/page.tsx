"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "@/i18n/LanguageContext";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import Booking from "@/components/sections/Booking";
import Reviews from "@/components/sections/Reviews";
import About from "@/components/sections/About";
import Gallery from "@/components/sections/Gallery";
import Location from "@/components/sections/Location";
import Contact from "@/components/sections/Contact";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <AnimatePresence>
        {loading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      <Navbar />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <Gallery />
        <Booking />
        <Reviews />
        <About />
        <Location />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </LanguageProvider>
  );
}
