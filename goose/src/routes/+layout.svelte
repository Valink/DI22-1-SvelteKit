<script lang="ts">
	import Background from '$lib/components/Background.svelte';
	import '../app.css';
	import { bgGooseStore, bgUfoStore, scoreTheme, scoreThemeThreshold } from './store';
	import { get } from 'svelte/store';

	let score: number = 0;
	let theme: number = 0;

	scoreTheme.subscribe((value) => {
		score = value;
	});
	scoreThemeThreshold.subscribe((value) => {
		theme = value;
	});
	let bg: string = 'bg1.png';

	$: if (score > theme) {
		bg = get(bgUfoStore);
		console.log('bg : ' + bg);
		console.log('ufo : ' + get(bgUfoStore));
	} else {
		bg = get(bgGooseStore);
		console.log('goose store');
	}
</script>

<title>Shoot The Goose</title>

<Background bind:baseNameForUrl={bg}>
	<slot />
</Background>
