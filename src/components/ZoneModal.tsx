import { FormEvent, useEffect, useState } from "react";
import { ZONE_COLORS } from "../types";

interface ZoneModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, color: string) => void;
  mode: "create" | "edit";
  initialName?: string;
  initialColor?: string;
}

export function ZoneModal({
  open,
  onClose,
  onSave,
  mode,
  initialName = "",
  initialColor = ZONE_COLORS[0],
}: ZoneModalProps) {
  const [name, setName] = useState(initialName);
  const [color, setColor] = useState<string>(initialColor);

  useEffect(() => {
    if (open) {
      setName(initialName);
      setColor(initialColor);
    }
  }, [open, initialName, initialColor]);

  if (!open) return null;

  const isEdit = mode === "edit";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSave(name, color);
    if (!isEdit) {
      setName("");
      setColor(ZONE_COLORS[0]);
    }
    onClose();
  }

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div
        className="modal"
        role="dialog"
        aria-labelledby="zone-modal-title"
      >
        <h2 id="zone-modal-title">
          {isEdit ? "Edit this space" : "A new space"}
        </h2>
        <p className="modal-subtitle">
          {isEdit
            ? "Change the name or color for this zone."
            : "Give it a name and a color."}
        </p>

        <form onSubmit={handleSubmit}>
          <label className="field">
            <span>What&apos;s this space for?</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Work, home, someday..."
              autoFocus
            />
          </label>

          <fieldset className="color-picker">
            <legend>Pick a color</legend>
            <div className="color-options">
              {ZONE_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`color-swatch${color === c ? " selected" : ""}`}
                  style={{ backgroundColor: c }}
                  aria-label={`Select color ${c}`}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </fieldset>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ backgroundColor: color }}
            >
              {isEdit ? "Save changes" : "Create space"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
