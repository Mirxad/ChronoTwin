"use client";

import { useEffect, useState } from "react";
import TaskInputCard from "@/components/TaskInputCard";
import TaskList from "@/components/TaskList";
import { loadTasks, saveTasks } from "@/lib/storage";
import type { Task } from "@/lib/types";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => setTasks(loadTasks()), []);
  const update = (next: Task[]) => { setTasks(next); saveTasks(next); };
  return <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]"><TaskInputCard onAdd={(task) => update([task, ...tasks])} /><section><div className="mb-4"><p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan">Timeline inputs</p><h1 className="text-4xl font-black">Tasks</h1><p className="mt-2 text-slate-400">These signals power your future-week simulations.</p></div><TaskList tasks={tasks} onToggle={(id) => update(tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task))} onDelete={(id) => update(tasks.filter((task) => task.id !== id))} /></section></div>;
}
