export interface Theme {
  name: string;
  colors: {
    bg: string;
    text: string;
    accent: string;
    secondary: string;
    border: string;
  };
}

export const themes: Record<string, Theme> = {
  dark: {
    name: 'dark',
    colors: {
      bg: '#000000',
      text: '#ffffff',
      accent: '#3b82f6',
      secondary: '#18181b',
      border: '#27272a',
    },
  },
  light: {
    name: 'light',
    colors: {
      bg: '#ffffff',
      text: '#000000',
      accent: '#0066ff',
      secondary: '#f0f0f0',
      border: '#e0e0e0',
    },
  },
};

export function initThemeVariables(themeName: string = 'dark') {
  const theme = themes[themeName] || themes.dark;
  const root = document.documentElement;

  root.style.setProperty('--color-bg', theme.colors.bg);
  root.style.setProperty('--color-text', theme.colors.text);
  root.style.setProperty('--color-accent', theme.colors.accent);
  root.style.setProperty('--color-secondary', theme.colors.secondary);
  root.style.setProperty('--color-border', theme.colors.border);
}

export function applyTheme(themeName: string) {
  initThemeVariables(themeName);
  localStorage.setItem('theme', themeName);
}
