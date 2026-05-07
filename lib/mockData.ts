import type { Task, UserSettings } from "./types";

const futureDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

export const defaultSettings: UserSettings = {
  sleepGoalHours: 8,
  preferredStudyTime: "evening",
  energyPattern: "balanced",
  procrastinationLevel: "medium",
};

export const mockTasks: Task[] = [
  { id: "mock-1", title: "Physics momentum problem set", subject: "Physics", deadline: futureDate(1), difficulty: "hard", estimatedHours: 2.5, importance: 5, taskType: "homework", completed: false },
  { id: "mock-2", title: "AP History chapter review", subject: "History", deadline: futureDate(3), difficulty: "medium", estimatedHours: 1.5, importance: 3, taskType: "exam", completed: false },
  { id: "mock-3", title: "Group presentation deck", subject: "English", deadline: futureDate(5), difficulty: "medium", estimatedHours: 3, importance: 4, taskType: "presentation", completed: false },
  { id: "mock-4", title: "Robotics lab reflection", subject: "Engineering", deadline: futureDate(6), difficulty: "easy", estimatedHours: 1, importance: 2, taskType: "project", completed: false },
];
