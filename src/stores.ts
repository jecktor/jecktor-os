import { writable } from 'svelte/store';

const toggleDarkTheme = () => {
  const userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const { subscribe, update } = writable(userTheme);

  return {
    subscribe,
    toggle: () =>
      update(darkTheme => {
        document.documentElement.setAttribute(
          'data-theme',
          darkTheme ? 'dark' : 'light'
        );
        return !darkTheme;
      }),
  };
};

export const darkTheme = toggleDarkTheme();

export const windowCount = writable(0);

export const focusedWindowId = writable<string>(null);
