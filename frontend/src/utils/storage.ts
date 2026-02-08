// Local storage utilities
export const storage = {
  get(key: string) {
    if (typeof window === 'undefined') return null;
    try {
      return JSON.parse(window.localStorage.getItem(key) || 'null');
    } catch {
      return null;
    }
  },
  set(key: string, value: any) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key: string) {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(key);
  },
};
