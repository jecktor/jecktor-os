import { writable } from 'svelte/store';

export const windowCount = writable(0);

export const focusedWindowId = writable<string>(null);
