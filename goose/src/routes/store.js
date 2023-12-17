import { writable } from 'svelte/store';

export const isVeganMod = writable(false);
export const bgGooseStore = writable('bg1.png');
export const bgUfoStore = writable('bg2.jpeg');
export const scoreTheme = writable(0);
export const scoreThemeThreshold = writable(0);