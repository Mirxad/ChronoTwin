import type { Task, UserSettings } from "./types";
import { defaultSettings, mockTasks } from "./mockData";

const TASKS_KEY = "chronotwin.tasks";
const SETTINGS_KEY = "chronotwin.settings";

const isBrowser = () => typeof window !== "undefined";

export const loadTasks = (): Task[] => {
  if (!isBrowser()) return mockTasks;
  const raw = window.localStorage.getItem(TASKS_KEY);
  if (!raw) return mockTasks;
  try {
    const parsed = JSON.parse(raw) as Task[];
    return parsed.length ? parsed : mockTasks;
  } catch {
    return mockTasks;
  }
};

export const saveTasks = (tasks: Task[]) => {
  if (isBrowser()) window.localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const loadSettings = (): UserSettings => {
  if (!isBrowser()) return defaultSettings;
  const raw = window.localStorage.getItem(SETTINGS_KEY);
  if (!raw) return defaultSettings;
  try {
    return { ...defaultSettings, ...(JSON.parse(raw) as UserSettings) };
  } catch {
    return defaultSettings;
  }
};

export const saveSettings = (settings: UserSettings) => {
  if (isBrowser()) window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};
