import { useState } from "react";
import { ZoneCarousel } from "./components/ZoneCarousel";
import { ZoneModal } from "./components/ZoneModal";
import { useTodoStore } from "./hooks/useTodoStore";
import "./App.css";

function App() {
  const [showNewZone, setShowNewZone] = useState(false);
  const [showEditZone, setShowEditZone] = useState(false);
  const {
    zones,
    activeZone,
    activeIndex,
    addZone,
    updateZone,
    addTodo,
    toggleTodo,
    deleteTodo,
    goToZone,
  } = useTodoStore();

  return (
    <div className="app">
      <button
        type="button"
        className="edit-zone-btn"
        onClick={() => setShowEditZone(true)}
        aria-label="Edit this zone"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      </button>

      <button
        type="button"
        className="add-zone-btn"
        onClick={() => setShowNewZone(true)}
        aria-label="Add another zone"
      >
        +
      </button>

      <ZoneCarousel
        zones={zones}
        activeIndex={activeIndex}
        onGoTo={goToZone}
        onAddTodo={addTodo}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
      />

      <ZoneModal
        open={showNewZone}
        onClose={() => setShowNewZone(false)}
        onSave={addZone}
        mode="create"
      />

      <ZoneModal
        open={showEditZone}
        onClose={() => setShowEditZone(false)}
        onSave={(name, color) => updateZone(activeIndex, name, color)}
        mode="edit"
        initialName={activeZone.name}
        initialColor={activeZone.color}
      />
    </div>
  );
}

export default App;
