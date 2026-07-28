import type { Metadata } from "next";
import { Archivo, Public_Sans, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BM Xpress — hyperlocal and last-mile delivery across West Bengal",
  description:
    "BM Xpress runs same-day hyperlocal and last-mile delivery across West Bengal, on our own dispatch platform and rider network.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${publicSans.variable} ${jetbrains.variable}`}>
      <body>
        <Preloader />
        <ScrollProgress />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
