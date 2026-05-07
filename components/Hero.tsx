"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-violet backdrop-blur-2xl md:p-12">
      <div className="absolute right-8 top-8 h-40 w-40 rounded-full bg-cyan/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 h-56 w-56 rounded-full bg-aurora/20 blur-3xl" />
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-3xl">
        <span className="rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-cyan">AI school life simulator</span>
        <h1 className="mt-6 text-5xl font-black tracking-tight text-white md:text-7xl">Don’t plan your week. <span className="bg-gradient-to-r from-cyan via-white to-violet-300 bg-clip-text text-transparent">Preview it.</span></h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">ChronoTwin turns deadlines, sleep, energy, routines, and procrastination into three possible futures so you can choose the smartest path before the week chooses for you.</p>
      </motion.div>
    </section>
  );
}
