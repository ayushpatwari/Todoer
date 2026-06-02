import { FormEvent, useState } from "react";
import { Zone } from "../types";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  zone: Zone;
  isActive: boolean;
  onAddTodo: (text: string) => void;
  onToggleTodo: (todoId: string) => void;
  onDeleteTodo: (todoId: string) => void;
}

export function TodoList({
  zone,
  isActive,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
  const [input, setInput] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isActive || !input.trim()) return;
    onAddTodo(input);
    setInput("");
  }

  const pending = zone.todos.filter((t) => !t.completed);
  const done = zone.todos.filter((t) => t.completed);

  return (
    <div className="todo-card">
      <header className="todo-header">
        <span className="zone-accent" />
        <h1>{zone.name}</h1>
        <p className="zone-count">
          {pending.length === 0
            ? "All clear for now"
            : pending.length === 1
              ? "One thing on your mind"
              : `${pending.length} things on your mind`}
        </p>
      </header>

      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs doing?"
          disabled={!isActive}
          aria-label="New task"
        />
        <button type="submit" disabled={!isActive || !input.trim()}>
          Add it
        </button>
      </form>

      <ul className="todo-list">
        {zone.todos.length === 0 && (
          <li className="todo-empty">Nothing here yet — that's okay.</li>
        )}
        {pending.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            disabled={!isActive}
            onToggle={() => onToggleTodo(todo.id)}
            onDelete={() => onDeleteTodo(todo.id)}
          />
        ))}
        {done.length > 0 && pending.length > 0 && (
          <li className="todo-divider">Done</li>
        )}
        {done.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            disabled={!isActive}
            onToggle={() => onToggleTodo(todo.id)}
            onDelete={() => onDeleteTodo(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
}
