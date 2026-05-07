"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import type { Scenario } from "@/lib/types";
import FutureScenarioCard from "./FutureScenarioCard";

export default function ScenarioComparison({ scenarios }: { scenarios: Scenario[] }) {
  const chart = scenarios[0].dailyForecast.map((day, index) => ({ day: day.day, Balanced: scenarios[0].dailyForecast[index].stress, Procrastination: scenarios[1].dailyForecast[index].stress, "Hero Mode": scenarios[2].dailyForecast[index].stress }));
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">{scenarios.map((scenario) => <FutureScenarioCard key={scenario.id} scenario={scenario} recommended={scenario.id === "balanced"} />)}</div>
      <div className="h-80 rounded-2xl border border-white/10 bg-white/[0.055] p-5 shadow-glow backdrop-blur-xl">
        <h2 className="mb-4 text-xl font-black">Stress lines across futures</h2>
        <ResponsiveContainer width="100%" height="84%"><LineChart data={chart}><CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false}/><XAxis dataKey="day" stroke="#94a3b8"/><YAxis domain={[0,100]} stroke="#94a3b8"/><Tooltip contentStyle={{ background: "#0d1024", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16 }}/><Legend/><Line type="monotone" dataKey="Balanced" stroke="#34d399" strokeWidth={3}/><Line type="monotone" dataKey="Procrastination" stroke="#fb7185" strokeWidth={3}/><Line type="monotone" dataKey="Hero Mode" stroke="#22d3ee" strokeWidth={3}/></LineChart></ResponsiveContainer>
      </div>
    </div>
  );
}
