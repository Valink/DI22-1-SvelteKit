<script lang="ts">
	import Animal from '$lib/components/Animal.svelte';
	import Life from '$lib/components/Life.svelte';
	import FormPlayer from '$lib/components/FormPlayer.svelte';
	import Score from '$lib/components/Score.svelte';
	import { isVeganMod, scoreTheme, scoreThemeThreshold } from '../store';

	const imgUfo = 'ufo.png';
	const bgGoose = 'bg1.png';
	const bgUfo = 'bg2.jpeg';
	const themeThreshold: number = 999;
	const pointIncrement: number = 100;

	let currentMonster: string;
	let currentSound: string;
	let currentBg: string = bgGoose;
	let isFinish: boolean;
	let hearts: number;
	let score: number = 0;
	let id: number = 4;
	let isMissed: boolean = false;
	let isVeganMod_value;
	$scoreTheme = score;
	$scoreThemeThreshold = themeThreshold;
	isVeganMod.subscribe((value) => {
		isVeganMod_value = value;
	});

	if (isVeganMod_value === false) {
		currentMonster = 'oie_vol.png';
		currentSound = 'oie';
	} else {
		currentMonster = 'elmer.png';
		currentSound = 'elmer';
	}

	function leaveGame() {
		const confirmation = confirm('Abandonner la partie ?(vous perdrez votre partie à tout jamais)');
		if (confirmation) {
			window.location.href = '../';
		}
	}

	function onAGooseDie(event) {
		const diyingAnimal = event.detail.animal;
		animals = animals.filter((a) => a !== diyingAnimal);

		score += pointIncrement;
		$scoreTheme = score;
		switchThemeIfScoreAboveThreshold();
	}

	function switchThemeIfScoreAboveThreshold() {
		if (score >= themeThreshold && !window.document.body.classList.contains('dark-mode')) {
			window.document.body.classList.toggle('dark-mode');
			currentMonster = imgUfo;
			currentBg = bgUfo;
		}
	}

	let animals = [
		{
			type: 'canard',
			score: 1,
			src: currentMonster,
			id: 1,
			left: 0,
			top: 0,
			typeSound: currentSound
		},
		{
			type: 'canard',
			score: 1,
			src: currentMonster,
			id: 2,
			left: 0,
			top: 0,
			typeSound: currentSound
		},
		{
			type: 'canard',
			score: 1,
			src: currentMonster,
			id: 3,
			left: 0,
			top: 0,
			typeSound: currentSound
		}
	];

	setInterval(() => {
		animals.push({
			type: 'canard',
			score: 1,
			src: currentMonster,
			id: id++,
			left: 0,
			top: 0,
			typeSound: currentSound
		});
		animals = animals;
	}, 1000);
</script>

<div class="h-screen select-none">
	<div class="flex justify-screen w-full items-center justify-between">
		<button
			on:click={leaveGame}
			class="ml-4 align-middle select-none font-medium text-center uppercase disabled:opacity-50 disabled:pointer-events-none w-full max-w-[150px] h-10 max-h-[90px] rounded-lg text-xs bg-gray-900 text-white shadow-m"
		>
			{'<- -  '} Quitter la partie
		</button>
		<h1
			style="font-size: 60px; font-weight: bold; color: white; text-shadow: -6px 0 black, 0 0px black, 0px 0 black, 0 2px black; user-select: none"
		>
			Shoot The Goose
		</h1>
		<Life bind:actualLifes={hearts} {isMissed}></Life>
		<Score bind:actualScore={score}></Score>
	</div>

	{#each animals as animal (animal.id)}
		<Animal {animal} on:die={onAGooseDie} />
	{/each}

	{#if isFinish}
		<FormPlayer name="test" bind:point={score} {isFinish} />
	{/if}
</div>

<style>
	:global(body) {
		cursor: crosshair;
	}
</style>
