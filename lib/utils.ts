import type { Task } from "./types";

export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

export const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, Math.round(value)));

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(date));

export const daysUntil = (deadline: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(deadline);
  due.setHours(0, 0, 0, 0);
  return Math.ceil((due.getTime() - today.getTime()) / 86_400_000);
};

export const taskWeight = (task: Task) => {
  const difficulty = { easy: 1, medium: 1.55, hard: 2.2 }[task.difficulty];
  const type = { homework: 1, exam: 1.8, presentation: 1.45, project: 1.65, personal: 0.8 }[task.taskType];
  const urgency = Math.max(0.8, 4.5 - Math.max(0, daysUntil(task.deadline)) * 0.35);
  return task.estimatedHours * difficulty * type * task.importance * urgency;
};
