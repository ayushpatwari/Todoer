const STORAGE_KEY = "todoer-welcome-dismissed";

export function hasSeenWelcome(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function markWelcomeSeen(): void {
  try {
    localStorage.setItem(STORAGE_KEY, "true");
  } catch {
    // ignore storage errors
  }
}
