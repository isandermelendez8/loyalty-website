import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LOYALTY | Premium Beauty & Lifestyle Services",
  description:
    "LOYALTY offers premium beauty and lifestyle services in Miami Beach. Haircuts, styling, tattoos, piercings, and beauty treatments by award-winning professionals.",
  keywords: [
    "barbershop",
    "salon",
    "tattoo studio",
    "beauty services",
    "Miami Beach",
    "LOYALTY",
    "haircuts",
    "piercings",
  ],
  openGraph: {
    title: "LOYALTY | Premium Beauty & Lifestyle Services",
    description:
      "Premium beauty and lifestyle services in Miami Beach. Book your appointment today.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
