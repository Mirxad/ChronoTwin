"use client";

import { useEffect, useMemo, useState } from "react";
import Hero from "@/components/Hero";
import StatCard from "@/components/StatCard";
import StressForecast from "@/components/StressForecast";
import FutureScenarioCard from "@/components/FutureScenarioCard";
import DecisionSimulator from "@/components/DecisionSimulator";
import TaskList from "@/components/TaskList";
import EnergyMeter from "@/components/EnergyMeter";
import { loadSettings, loadTasks, saveTasks } from "@/lib/storage";
import { generateScenarios, simulateSkipToday } from "@/lib/simulation";
import type { Task, UserSettings } from "@/lib/types";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  useEffect(() => { setTasks(loadTasks()); setSettings(loadSettings()); }, []);
  const scenarios = useMemo(() => generateScenarios(tasks, settings ?? loadSettings()), [tasks, settings]);
  const impact = useMemo(() => simulateSkipToday(tasks, settings ?? loadSettings()), [tasks, settings]);
  const balanced = scenarios[0];
  const toggle = (id: string) => setTasks((current) => { const next = current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task); saveTasks(next); return next; });
  const remove = (id: string) => setTasks((current) => { const next = current.filter((task) => task.id !== id); saveTasks(next); return next; });

  return <div className="space-y-8"><Hero /><div className="grid gap-4 md:grid-cols-4"><StatCard label="Stress" value={balanced.stress} tone="rose" /><StatCard label="Focus" value={balanced.focus} /><StatCard label="Sleep" value={balanced.sleepStability} tone="mint" /><StatCard label="Prepared" value={balanced.preparedness} tone="violet" /></div><div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]"><StressForecast data={balanced.dailyForecast} /><div className="space-y-6"><EnergyMeter value={balanced.focus} /><DecisionSimulator impact={impact} /></div></div><section><div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-black">Three possible futures</h2><p className="text-sm text-slate-400">Balanced is currently recommended.</p></div><div className="grid gap-4 lg:grid-cols-3">{scenarios.map((scenario) => <FutureScenarioCard key={scenario.id} scenario={scenario} recommended={scenario.id === "balanced"} />)}</div></section><section><h2 className="mb-4 text-2xl font-black">Task summary</h2><TaskList tasks={tasks.slice(0, 4)} onToggle={toggle} onDelete={remove} /></section></div>;
}
