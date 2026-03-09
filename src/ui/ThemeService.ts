import type { ThemeMode } from '../types/content';

export class ThemeService {
  private theme: ThemeMode;
  private listeners = new Set<(theme: ThemeMode) => void>();

  constructor() {
    const stored = window.localStorage.getItem('portfolio-theme');
    if (stored === 'dark' || stored === 'light') {
      this.theme = stored;
    } else {
      this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    this.applyTheme();
  }

  get current() {
    return this.theme;
  }

  toggle() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme();
  }

  set(theme: ThemeMode) {
    if (theme === this.theme) return;
    this.theme = theme;
    this.applyTheme();
  }

  onChange(listener: (theme: ThemeMode) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private applyTheme() {
    document.documentElement.dataset.theme = this.theme;
    window.localStorage.setItem('portfolio-theme', this.theme);
    this.listeners.forEach((listener) => listener(this.theme));
  }
}
