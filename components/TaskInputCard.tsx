"use client";

import { FormEvent, useState } from "react";
import type { Difficulty, Task, TaskType } from "@/lib/types";

export default function TaskInputCard({ onAdd }: { onAdd: (task: Task) => void }) {
  const tomorrow = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState(tomorrow);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [estimatedHours, setEstimatedHours] = useState(1.5);
  const [importance, setImportance] = useState<Task["importance"]>(3);
  const [taskType, setTaskType] = useState<TaskType>("homework");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;
    onAdd({ id: crypto.randomUUID(), title, subject: subject || "School", deadline, difficulty, estimatedHours, importance, taskType, completed: false });
    setTitle(""); setSubject(""); setEstimatedHours(1.5); setImportance(3);
  };

  return (
    <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-white/[0.055] p-6 shadow-glow backdrop-blur-xl">
      <h2 className="text-2xl font-black">Add a task signal</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-cyan" />
        <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-cyan" />
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-cyan" />
        <input type="number" min="0.25" step="0.25" value={estimatedHours} onChange={(e) => setEstimatedHours(Number(e.target.value))} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-cyan" />
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-cyan"><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option></select>
        <select value={taskType} onChange={(e) => setTaskType(e.target.value as TaskType)} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-cyan"><option value="homework">Homework</option><option value="exam">Exam</option><option value="presentation">Presentation</option><option value="project">Project</option><option value="personal">Personal</option></select>
        <label className="md:col-span-2 text-sm text-slate-400">Importance: {importance}<input type="range" min="1" max="5" value={importance} onChange={(e) => setImportance(Number(e.target.value) as Task["importance"])} className="mt-2 w-full accent-cyan" /></label>
      </div>
      <button className="mt-5 rounded-xl bg-gradient-to-r from-cyan to-aurora px-5 py-3 font-black text-white shadow-glow">Add to timeline</button>
    </form>
  );
}
