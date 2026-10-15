import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Aplikasi Produk",
  description: "Praktikum Pemweb Week 3",
};

const tautan = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="flex min-h-screen flex-col">
        <a href="#konten" className="sr-only focus:not-sr-only focus:p-2">
          Lewati ke konten utama
        </a>

        <SiteHeader namaProduk="Lastkey" tautan={tautan} />

        <main id="konten" className="flex-1">
          {children}
        </main>

        <SiteFooter namaProduk="Lastkey" />
      </body>
    </html>
  );
}