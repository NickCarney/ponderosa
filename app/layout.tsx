import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Ponderosa Talent Group",
  description: "Better Talent, Faster Results",
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
    title: "Ponderosa Talent Group",
    description: "Better Talent, Faster Results",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Ponderosa Talent Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ponderosa Talent Group",
    description: "Better Talent, Faster Results",
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
      <body className={`${exo2.variable} antialiased`}>{children}</body>
    </html>
  );
}
