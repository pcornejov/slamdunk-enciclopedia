import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Enciclopedia Slam Dunk",
  description:
    "Enciclopedia de Slam Dunk: personajes, equipos, arcos argumentales, manga y anime.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 bg-white py-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          <p>
            Enciclopedia Slam Dunk · Proyecto de fans sin ánimo de lucro. Slam
            Dunk © Takehiko Inoue / Shueisha. Datos e imágenes vía Jikan
            (MyAnimeList).
          </p>
        </footer>
      </body>
    </html>
  );
}
