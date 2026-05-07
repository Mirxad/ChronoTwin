import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ChronoTwin | Preview your school week",
  description: "AI-powered school life simulator for future-ready students.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Navbar />
        <main className="mx-auto w-full max-w-7xl px-4 pb-14 pt-24 sm:px-6 lg:px-8">{children}</main>
      </body>
    </html>
  );
}
