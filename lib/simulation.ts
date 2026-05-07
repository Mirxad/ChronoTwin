import type { Scenario, SkipTodayImpact, Task, UserSettings } from "./types";
import { clamp, daysUntil, taskWeight } from "./utils";

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const procrastinationMultiplier = { low: 0.88, medium: 1, high: 1.18 };
const sleepPenalty = (sleepGoal: number) => (sleepGoal >= 8 ? -6 : sleepGoal >= 7 ? 0 : 8);

const activeTasks = (tasks: Task[]) => tasks.filter((task) => !task.completed);

const pressureScore = (tasks: Task[]) =>
  activeTasks(tasks).reduce((sum, task) => {
    const dueSoon = Math.max(1, 8 - Math.max(0, daysUntil(task.deadline)));
    return sum + taskWeight(task) * dueSoon * 0.18;
  }, 0);

const dailyStress = (base: number, scenario: "balanced" | "procrastination" | "hero", tasks: Task[]) =>
  dayNames.map((day, index) => {
    const duePressure = activeTasks(tasks).reduce((sum, task) => {
      const distance = Math.abs(daysUntil(task.deadline) - index);
      const proximity = Math.max(0, 5 - distance);
      return sum + proximity * task.importance * ({ easy: 0.8, medium: 1.2, hard: 1.8 }[task.difficulty]);
    }, 0);
    const curve = scenario === "balanced" ? index * 1.5 : scenario === "procrastination" ? index * 7 : index === 1 ? 28 : index * 2;
    const stress = clamp(base + duePressure + curve - (scenario === "balanced" ? 8 : 0));
    return {
      day,
      stress,
      label: stress > 72 ? "Pressure spike" : stress > 48 ? "Manageable load" : "Clear runway",
      warning: stress > 78 ? "Protect sleep and split the work." : undefined,
    };
  });

export const generateScenarios = (tasks: Task[], settings: UserSettings): Scenario[] => {
  const openTasks = activeTasks(tasks);
  const pressure = pressureScore(tasks) * procrastinationMultiplier[settings.procrastinationLevel];
  const totalHours = openTasks.reduce((sum, task) => sum + task.estimatedHours, 0);
  const hardTasks = openTasks.filter((task) => task.difficulty === "hard" || task.taskType === "exam").length;
  const baseStress = clamp(18 + pressure + totalHours * 2 + hardTasks * 5 + sleepPenalty(settings.sleepGoalHours));

  const balancedStress = clamp(baseStress - 14);
  const procrastinationStress = clamp(baseStress + 22 + (settings.procrastinationLevel === "high" ? 10 : 0));
  const heroStress = clamp(baseStress + 12 + totalHours * 1.2);

  return [
    {
      id: "balanced",
      name: "Balanced Future",
      description: "A realistic spread of study blocks, recovery windows, and deadline-first prioritization.",
      stress: balancedStress,
      focus: clamp(82 - openTasks.length * 2 + (settings.energyPattern === "balanced" ? 6 : 0)),
      sleepStability: clamp(88 + (settings.sleepGoalHours >= 8 ? 5 : -8)),
      preparedness: clamp(76 + hardTasks * 3 - openTasks.length),
      burnoutRisk: clamp(24 + openTasks.length * 2),
      freeTime: clamp(72 - totalHours * 4),
      dailyForecast: dailyStress(balancedStress, "balanced", tasks),
    },
    {
      id: "procrastination",
      name: "Procrastination Future",
      description: "Work is delayed until urgency takes over, creating deadline cliffs and fragile sleep.",
      stress: procrastinationStress,
      focus: clamp(62 - openTasks.length * 3),
      sleepStability: clamp(58 - totalHours * 2 - (settings.sleepGoalHours >= 8 ? 4 : 0)),
      preparedness: clamp(58 - hardTasks * 4 + (settings.procrastinationLevel === "low" ? 8 : 0)),
      burnoutRisk: clamp(63 + totalHours * 3),
      freeTime: clamp(56 - totalHours * 2),
      dailyForecast: dailyStress(procrastinationStress, "procrastination", tasks),
    },
    {
      id: "hero",
      name: "Hero Mode Future",
      description: "You force a huge productivity sprint, gaining readiness at the cost of recovery.",
      stress: heroStress,
      focus: clamp(68 + hardTasks * 2 - totalHours),
      sleepStability: clamp(50 - totalHours * 1.8),
      preparedness: clamp(84 + hardTasks * 2 - openTasks.length),
      burnoutRisk: clamp(72 + totalHours * 3.2),
      freeTime: clamp(38 - totalHours * 2),
      dailyForecast: dailyStress(heroStress, "hero", tasks),
    },
  ];
};

export const simulateSkipToday = (tasks: Task[], settings: UserSettings): SkipTodayImpact => {
  const scenarios = generateScenarios(tasks, settings);
  const balanced = scenarios[0];
  const urgent = activeTasks(tasks).filter((task) => daysUntil(task.deadline) <= 3);
  const urgentHours = urgent.reduce((sum, task) => sum + task.estimatedHours, 0);
  const drop = clamp(10 + urgentHours * 4 + urgent.length * 3, 0, 40);
  const currentReadiness = balanced.preparedness;
  const projectedReadiness = clamp(currentReadiness - drop);
  const increase = Math.max(0.5, Math.round((urgentHours * 0.45 + 0.5) * 10) / 10);
  const tomorrow = Math.round((urgentHours + increase) * 10) / 10;

  return {
    preparednessDrop: drop,
    currentReadiness,
    projectedReadiness,
    tomorrowWorkloadHours: tomorrow,
    workloadIncreaseHours: increase,
    recommendation:
      tomorrow > 5
        ? "Tomorrow becomes overloaded. Best compromise: do 20 focused minutes today on the nearest high-importance task."
        : "Skipping is survivable, but do a tiny starter session today to keep momentum and protect sleep.",
  };
};
