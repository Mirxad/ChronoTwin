"use client";

import type { SkipTodayImpact } from "@/lib/types";

export default function DecisionSimulator({ impact }: { impact: SkipTodayImpact }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-6 shadow-violet backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan">What if I skip today?</p>
      <h2 className="mt-3 text-2xl font-black text-white">Decision simulator</h2>
      <p className="mt-3 text-slate-300">Skipping today lowers readiness from <b>{impact.currentReadiness}%</b> to <b>{impact.projectedReadiness}%</b> and adds <b>{impact.workloadIncreaseHours}h</b> to tomorrow.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-rose-500/10 p-4 ring-1 ring-rose-400/20"><p className="text-sm text-slate-400">Preparedness drop</p><p className="text-3xl font-black text-rose-200">-{impact.preparednessDrop}%</p></div>
        <div className="rounded-xl bg-cyan/10 p-4 ring-1 ring-cyan/20"><p className="text-sm text-slate-400">Tomorrow workload</p><p className="text-3xl font-black text-cyan">{impact.tomorrowWorkloadHours}h</p></div>
        <div className="rounded-xl bg-mint/10 p-4 ring-1 ring-mint/20"><p className="text-sm text-slate-400">Best compromise</p><p className="text-sm font-semibold text-mint">20-minute starter</p></div>
      </div>
      <p className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300">{impact.recommendation}</p>
    </section>
  );
}
