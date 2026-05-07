"use client";

import type { Task } from "@/lib/types";
import { formatDate, daysUntil } from "@/lib/utils";

const badge = "rounded-full px-3 py-1 text-xs font-bold ring-1";

export default function TaskList({ tasks, onToggle, onDelete }: { tasks: Task[]; onToggle: (id: string) => void; onDelete: (id: string) => void }) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <article key={task.id} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur-xl transition hover:border-cyan/30">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className={task.completed ? "text-lg font-bold text-slate-500 line-through" : "text-lg font-bold text-white"}>{task.title}</h3>
                <span className={`${badge} bg-cyan/10 text-cyan ring-cyan/20`}>{task.subject}</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">Due {formatDate(task.deadline)} · {Math.max(0, daysUntil(task.deadline))} days · {task.estimatedHours}h estimate</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className={`${badge} bg-violet-500/10 text-violet-200 ring-violet-300/20`}>{task.difficulty}</span>
                <span className={`${badge} bg-amber-500/10 text-amber-200 ring-amber-300/20`}>importance {task.importance}</span>
                <span className={`${badge} bg-emerald-500/10 text-emerald-200 ring-emerald-300/20`}>{task.taskType}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onToggle(task.id)} className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-night">{task.completed ? "Reopen" : "Complete"}</button>
              <button onClick={() => onDelete(task.id)} className="rounded-xl border border-rose-400/30 px-4 py-2 text-sm font-bold text-rose-200">Delete</button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
