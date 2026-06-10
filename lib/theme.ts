export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "kaemba-theme";

export function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
}

export function resolveTheme(stored: Theme | null): Theme {
  return stored ?? "light";
}
