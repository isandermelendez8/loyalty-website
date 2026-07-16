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
  title: "LOYALTY | Luxury Beauty Studio for Women",
  description:
    "LOYALTY is a luxury women's studio in Miami Beach. Braids, piercings, hair straightening, blow-dry, and more. Tattoos coming soon.",
  keywords: [
    "women salon",
    "braids Miami",
    "piercings",
    "hair straightening",
    "blow dry",
    "women only salon",
    "Miami Beach",
    "LOYALTY",
  ],
  openGraph: {
    title: "LOYALTY | Luxury Beauty Studio for Women",
    description:
      "A luxury beauty sanctuary designed exclusively for women in Miami Beach. Book your appointment today.",
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
