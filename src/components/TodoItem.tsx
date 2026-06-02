import { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  disabled?: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export function TodoItem({ todo, disabled, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={`todo-item${todo.completed ? " completed" : ""}`}>
      <label className="todo-check">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          disabled={disabled}
        />
        <span className="checkmark" />
        <span className="todo-text">{todo.text}</span>
      </label>
      <button
        type="button"
        className="todo-delete"
        onClick={onDelete}
        disabled={disabled}
        aria-label={`Delete ${todo.text}`}
      >
        ×
      </button>
    </li>
  );
}
