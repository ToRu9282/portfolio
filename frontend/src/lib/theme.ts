export type ThemeMode = "dark" | "light";

const storageKey = "tamerlan-theme-v2";

export function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";

  const saved = window.localStorage.getItem(storageKey);
  if (saved === "dark" || saved === "light") return saved;

  return "light";
}

export function applyTheme(theme: ThemeMode) {
  if (typeof document === "undefined") return;

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem(storageKey, theme);
}

export function nextTheme(theme: ThemeMode): ThemeMode {
  return theme === "dark" ? "light" : "dark";
}
