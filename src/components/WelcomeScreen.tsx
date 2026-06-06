interface WelcomeScreenProps {
  onContinue: () => void;
}

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <div className="welcome-backdrop">
      <div className="welcome-card" role="dialog" aria-labelledby="welcome-title">
        <p className="welcome-eyebrow">Welcome to Todoer</p>
        <h1 id="welcome-title">A calm place for your lists</h1>
        <p className="welcome-lead">
          Todoer is organized into colored zones — each one is its own list.
        </p>

        <ul className="welcome-steps">
          <li>
            <span className="welcome-step-label">Switch zones</span>
            Tap the colored dots below your list, or use the{" "}
            <kbd>←</kbd> and <kbd>→</kbd> arrow keys.
          </li>
          <li>
            <span className="welcome-step-label">Add a zone</span>
            Tap <strong>+</strong> in the top-right corner.
          </li>
          <li>
            <span className="welcome-step-label">Edit a zone</span>
            Tap the pencil in the top-left to rename it or change its color.
          </li>
          <li>
            <span className="welcome-step-label">Your tasks stay put</span>
            Everything saves automatically when you close the app.
          </li>
        </ul>

        <button type="button" className="welcome-continue" onClick={onContinue}>
          Get started
        </button>
      </div>
    </div>
  );
}
