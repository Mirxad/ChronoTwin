export type Difficulty = "easy" | "medium" | "hard";
export type TaskType = "homework" | "exam" | "presentation" | "project" | "personal";

export type Task = {
  id: string;
  title: string;
  subject: string;
  deadline: string;
  difficulty: Difficulty;
  estimatedHours: number;
  importance: 1 | 2 | 3 | 4 | 5;
  taskType: TaskType;
  completed: boolean;
};

export type UserSettings = {
  sleepGoalHours: number;
  preferredStudyTime: "morning" | "afternoon" | "evening" | "night";
  energyPattern: "morning_person" | "balanced" | "night_owl";
  procrastinationLevel: "low" | "medium" | "high";
};

export type DayForecast = {
  day: string;
  stress: number;
  label: string;
  warning?: string;
};

export type Scenario = {
  id: string;
  name: string;
  description: string;
  stress: number;
  focus: number;
  sleepStability: number;
  preparedness: number;
  burnoutRisk: number;
  freeTime: number;
  dailyForecast: DayForecast[];
};

export type SkipTodayImpact = {
  preparednessDrop: number;
  currentReadiness: number;
  projectedReadiness: number;
  tomorrowWorkloadHours: number;
  workloadIncreaseHours: number;
  recommendation: string;
};
