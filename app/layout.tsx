import type { Metadata } from "next";
import { Hanken_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "Ponderosa — Rooted in Expertise",
  description: "Boutique technical recruiting for AI-native and high-growth startups. Senior, staff, and founding engineers — sourced one search at a time.",
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Ponderosa — Rooted in Expertise",
    description: "Boutique technical recruiting for AI-native and high-growth startups.",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Ponderosa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ponderosa — Rooted in Expertise",
    description: "Boutique technical recruiting for AI-native and high-growth startups.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${hankenGrotesk.variable} ${fraunces.variable} antialiased`}>{children}</body>
    </html>
  );
}
