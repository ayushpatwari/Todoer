import { useCallback, useEffect, useState } from "react";
import { Zone, ZONE_COLORS } from "../types";

const STORAGE_KEY = "todoer-zones";

function createId(): string {
  return crypto.randomUUID();
}

function createDefaultZones(): Zone[] {
  return [
    {
      id: createId(),
      name: "Inbox",
      color: ZONE_COLORS[0],
      todos: [],
    },
  ];
}

function loadZones(): Zone[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultZones();
    const parsed = JSON.parse(raw) as Zone[];
    return parsed.length > 0 ? parsed : createDefaultZones();
  } catch {
    return createDefaultZones();
  }
}

export function useTodoStore() {
  const [zones, setZones] = useState<Zone[]>(loadZones);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(zones));
  }, [zones]);

  const activeZone = zones[activeIndex] ?? zones[0];

  const addZone = useCallback((name: string, color: string) => {
    const zone: Zone = {
      id: createId(),
      name: name.trim() || "New zone",
      color,
      todos: [],
    };
    setZones((prev) => {
      const next = [...prev, zone];
      setActiveIndex(next.length - 1);
      return next;
    });
  }, []);

  const addTodo = useCallback((text: string) => {
    if (!text.trim()) return;
    setZones((prev) =>
      prev.map((zone, i) =>
        i === activeIndex
          ? {
              ...zone,
              todos: [
                ...zone.todos,
                { id: createId(), text: text.trim(), completed: false },
              ],
            }
          : zone,
      ),
    );
  }, [activeIndex]);

  const toggleTodo = useCallback((todoId: string) => {
    setZones((prev) =>
      prev.map((zone, i) =>
        i === activeIndex
          ? {
              ...zone,
              todos: zone.todos.map((todo) =>
                todo.id === todoId
                  ? { ...todo, completed: !todo.completed }
                  : todo,
              ),
            }
          : zone,
      ),
    );
  }, [activeIndex]);

  const deleteTodo = useCallback((todoId: string) => {
    setZones((prev) =>
      prev.map((zone, i) =>
        i === activeIndex
          ? {
              ...zone,
              todos: zone.todos.filter((todo) => todo.id !== todoId),
            }
          : zone,
      ),
    );
  }, [activeIndex]);

  const goToZone = useCallback(
    (index: number) => {
      setActiveIndex(Math.max(0, Math.min(index, zones.length - 1)));
    },
    [zones.length],
  );

  const goNext = useCallback(() => {
    setActiveIndex((i) => Math.min(i + 1, zones.length - 1));
  }, [zones.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => Math.max(i - 1, 0));
  }, []);

  const updateZone = useCallback(
    (index: number, name: string, color: string) => {
      setZones((prev) =>
        prev.map((zone, i) =>
          i === index
            ? { ...zone, name: name.trim() || zone.name, color }
            : zone,
        ),
      );
    },
    [],
  );

  return {
    zones,
    activeZone,
    activeIndex,
    addZone,
    updateZone,
    addTodo,
    toggleTodo,
    deleteTodo,
    goToZone,
    goNext,
    goPrev,
  };
}
