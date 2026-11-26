import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Caveat, Fredoka, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBar from "@/components/NoticeBar";
import MobileCta from "@/components/MobileCta";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example-nursery.co.uk"),
  title: {
    default: "Little Lanterns Day Nursery | Warm, caring childcare for babies and pre-schoolers",
    template: "%s | Little Lanterns Day Nursery",
  },
  description:
    "A welcoming day nursery offering a warm, caring and inspiring environment where every child is encouraged to learn, develop and discover the world around them. Book a visit or enquire about a place.",
  keywords: [
    "day nursery",
    "children's nursery",
    "childcare",
    "nursery near me",
    "pre-school",
    "book a nursery visit",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Little Lanterns Day Nursery",
    title: "Little Lanterns Day Nursery — Where Little Minds Grow, Explore and Shine",
    description:
      "A warm, caring and inspiring nursery environment. Explore our rooms, gallery and booking form.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbf6ec",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" className={`${fredoka.variable} ${inter.variable} ${caveat.variable}`}>
      <body className="min-h-screen bg-paper pb-20 text-body antialiased lg:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <NoticeBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCta />
      </body>
    </html>
  );
}
