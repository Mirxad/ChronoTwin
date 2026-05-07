"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DayForecast } from "@/lib/types";

export default function StressForecast({ data }: { data: DayForecast[] }) {
  return (
    <div className="h-72 rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-glow backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-bold">Weekly stress forecast</h2><span className="text-xs text-slate-400">Mock AI projection</span></div>
      <ResponsiveContainer width="100%" height="82%">
        <AreaChart data={data}>
          <defs><linearGradient id="stress" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22d3ee" stopOpacity={0.45}/><stop offset="95%" stopColor="#7c3aed" stopOpacity={0.02}/></linearGradient></defs>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey="day" stroke="#94a3b8" tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} domain={[0, 100]} />
          <Tooltip contentStyle={{ background: "#0d1024", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16 }} />
          <Area type="monotone" dataKey="stress" stroke="#22d3ee" strokeWidth={3} fill="url(#stress)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
