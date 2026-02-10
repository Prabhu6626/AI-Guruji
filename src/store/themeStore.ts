import { create } from 'zustand';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false, // Always white theme
  toggleTheme: () => {
    // Theme switching disabled - white theme only
    console.log('White theme is currently the only available theme');
  },
}));
