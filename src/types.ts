export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface Zone {
  id: string;
  name: string;
  color: string;
  todos: Todo[];
}

export const ZONE_COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#14b8a6",
  "#3b82f6",
  "#64748b",
] as const;
