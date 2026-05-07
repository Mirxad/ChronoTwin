"use client";

import { useEffect, useState } from "react";
import { loadSettings, saveSettings } from "@/lib/storage";
import type { UserSettings } from "@/lib/types";

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>(loadSettings());
  const [saved, setSaved] = useState(false);
  useEffect(() => setSettings(loadSettings()), []);
  const save = () => { saveSettings(settings); setSaved(true); setTimeout(() => setSaved(false), 1800); };
  return <div className="mx-auto max-w-3xl"><section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-violet backdrop-blur-xl"><p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan">Personal routine model</p><h1 className="mt-3 text-5xl font-black">Settings</h1><p className="mt-3 text-slate-400">Tune the mock AI to your real school-life rhythm.</p><div className="mt-8 grid gap-5"><label className="text-sm font-bold text-slate-300">Sleep goal: {settings.sleepGoalHours} hours<input className="mt-3 w-full accent-cyan" type="range" min="5" max="10" step="0.5" value={settings.sleepGoalHours} onChange={(e) => setSettings({ ...settings, sleepGoalHours: Number(e.target.value) })} /></label><Select label="Preferred study time" value={settings.preferredStudyTime} onChange={(value) => setSettings({ ...settings, preferredStudyTime: value as UserSettings['preferredStudyTime'] })} options={["morning", "afternoon", "evening", "night"]} /><Select label="Energy pattern" value={settings.energyPattern} onChange={(value) => setSettings({ ...settings, energyPattern: value as UserSettings['energyPattern'] })} options={["morning_person", "balanced", "night_owl"]} /><Select label="Procrastination level" value={settings.procrastinationLevel} onChange={(value) => setSettings({ ...settings, procrastinationLevel: value as UserSettings['procrastinationLevel'] })} options={["low", "medium", "high"]} /></div><button onClick={save} className="mt-8 rounded-xl bg-gradient-to-r from-cyan to-aurora px-6 py-3 font-black text-white shadow-glow">{saved ? "Saved to localStorage" : "Save settings"}</button></section></div>;
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="text-sm font-bold text-slate-300">{label}<select value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-cyan">{options.map((option) => <option key={option} value={option}>{option.replace("_", " ")}</option>)}</select></label>;
}
