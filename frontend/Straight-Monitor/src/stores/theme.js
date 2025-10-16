import { defineStore } from 'pinia';

export const useTheme = defineStore('theme', {
  state: () => ({
    theme: 'light',
    inited: false,
  }),
  getters: {
    isDark: (s) => s.theme === 'dark',
  },
  actions: {
    init() {
      if (this.inited) return;
      const saved = localStorage.getItem('theme');
      const sysDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      this.theme = saved || (sysDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', this.theme);
      this.inited = true;
    },
    set(t) {
      this.theme = t;
      localStorage.setItem('theme', t);
      document.documentElement.setAttribute('data-theme', t);
    },
    toggle() { this.set(this.isDark ? 'light' : 'dark'); }
  }
});
