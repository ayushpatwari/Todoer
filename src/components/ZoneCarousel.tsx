import { useEffect, useRef } from "react";
import { Zone } from "../types";
import { TodoList } from "./TodoList";

interface ZoneCarouselProps {
  zones: Zone[];
  activeIndex: number;
  onGoTo: (index: number) => void;
  onAddTodo: (text: string) => void;
  onToggleTodo: (todoId: string) => void;
  onDeleteTodo: (todoId: string) => void;
}

export function ZoneCarousel({
  zones,
  activeIndex,
  onGoTo,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
}: ZoneCarouselProps) {
  const activeIndexRef = useRef(activeIndex);
  const zonesLengthRef = useRef(zones.length);
  const goToRef = useRef(onGoTo);

  activeIndexRef.current = activeIndex;
  zonesLengthRef.current = zones.length;
  goToRef.current = onGoTo;

  const activeZone = zones[activeIndex] ?? zones[0];

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const idx = activeIndexRef.current;
      const last = zonesLengthRef.current - 1;
      if (e.key === "ArrowLeft" && idx > 0) goToRef.current(idx - 1);
      if (e.key === "ArrowRight" && idx < last) goToRef.current(idx + 1);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const translateX = -activeIndex * 100;

  return (
    <div
      className="carousel-stage"
      style={{ "--zone-color": activeZone?.color } as React.CSSProperties}
    >
      <div className="zone-splash" aria-hidden="true" />

      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{ transform: `translateX(${translateX}%)` }}
        >
          {zones.map((zone, index) => (
            <section
              key={zone.id}
              className="zone-panel"
              style={{ "--zone-color": zone.color } as React.CSSProperties}
              aria-hidden={index !== activeIndex}
            >
              <TodoList
                zone={zone}
                isActive={index === activeIndex}
                onAddTodo={onAddTodo}
                onToggleTodo={onToggleTodo}
                onDeleteTodo={onDeleteTodo}
              />
            </section>
          ))}
        </div>
      </div>

      <div className="zone-dots" role="tablist" aria-label="Zones">
        {zones.map((zone, index) => (
          <button
            key={zone.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Go to ${zone.name}`}
            className={`zone-dot${index === activeIndex ? " active" : ""}`}
            style={{ "--dot-color": zone.color } as React.CSSProperties}
            onClick={() => onGoTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
