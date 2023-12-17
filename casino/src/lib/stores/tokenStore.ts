import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const storedTokens = browser ? localStorage.getItem('tokens') : null;
const initialTokens = storedTokens ? parseInt(storedTokens) : 1000;

export const tokenStore = writable(initialTokens);

if (browser) {
	tokenStore.subscribe((tokens) => {
		localStorage.setItem('tokens', tokens.toString());
	});
}

export function addTokens(amount: number) {
	tokenStore.update((tokens) => tokens + amount);
}

export function removeTokens(amount: number) {
	tokenStore.update((tokens) => tokens - amount);
}
