"use client";

import { useEffect, useMemo, useState } from "react";
import ScenarioComparison from "@/components/ScenarioComparison";
import WeekTimeline from "@/components/WeekTimeline";
import DecisionSimulator from "@/components/DecisionSimulator";
import { loadSettings, loadTasks } from "@/lib/storage";
import { generateScenarios, simulateSkipToday } from "@/lib/simulation";
import type { Task, UserSettings } from "@/lib/types";

export default function SimulationPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  useEffect(() => { setTasks(loadTasks()); setSettings(loadSettings()); }, []);
  const scenarios = useMemo(() => generateScenarios(tasks, settings ?? loadSettings()), [tasks, settings]);
  const impact = useMemo(() => simulateSkipToday(tasks, settings ?? loadSettings()), [tasks, settings]);
  return <div className="space-y-8"><section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-violet backdrop-blur-xl"><p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan">Future engine</p><h1 className="mt-3 text-5xl font-black">Simulation</h1><p className="mt-4 max-w-3xl text-slate-300">Compare balanced, delayed, and sprint-based versions of your week. The recommended path prioritizes preparedness without sacrificing sleep stability.</p></section><ScenarioComparison scenarios={scenarios} /><WeekTimeline days={scenarios[0].dailyForecast} /><DecisionSimulator impact={impact} /></div>;
}
