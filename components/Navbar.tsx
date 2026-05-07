"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/tasks", label: "Tasks" },
  { href: "/simulation", label: "Simulation" },
  { href: "/settings", label: "Settings" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <motion.header initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-night/70 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan/15 shadow-glow ring-1 ring-cyan/30">⏳</span>
          <div>
            <p className="text-sm font-black tracking-[0.28em] text-white">CHRONOTWIN</p>
            <p className="text-xs text-slate-400">Future week simulator</p>
          </div>
        </Link>
        <div className="flex gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={cn("rounded-full px-3 py-2 text-xs font-semibold text-slate-300 transition sm:px-4", active && "bg-white text-night shadow-glow")}>
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </motion.header>
  );
}
