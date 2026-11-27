import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LastKey — Secure Digital Vault",
  description: "Dead Man's Switch for securing critical digital assets and emergency release.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#090a0f] text-zinc-100 selection:bg-emerald-500/20 selection:text-emerald-300">
        {children}
      </body>
    </html>
  );
}
