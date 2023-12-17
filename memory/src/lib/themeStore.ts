import { writable } from "svelte/store";
export const themes = ['pirate', 'pokemon', 'jungle'];

export const themeStore = writable(themes[1]);
