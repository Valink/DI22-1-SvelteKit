<script lang="ts">
	import ModuleButton from '$lib/components/ModuleButton.svelte';
	import ModuleWire from '$lib/components/ModuleWire.svelte';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();
	let variantComponent1Success: boolean = false;
	let variantComponent1: number = Math.floor(Math.random() * 4);
	let variantComponent2Success: boolean = false;
	let variantComponent2: number = Math.floor(Math.random() * 6);
	let variantComponent3Success: boolean = false;
	let variantComponent3: number = Math.floor(Math.random() * 4);
	let variantComponent4Success: boolean = false;
	let variantComponent4: number = Math.floor(Math.random() * 6);
	let variantComponent5Success: boolean = false;
	let variantComponent5: number = Math.floor(Math.random() * 4);
	let variantComponent6Success: boolean = false;
	let variantComponent6: number = Math.floor(Math.random() * 6);

	let timeLeft: number = 0;
	let timerInterval: ReturnType<typeof setInterval>;
	let isEnd: boolean = false;
	let isStart: boolean = true;

	onMount(() => {
		startGameTimer();
	});

	function checkVictory(): void {
		let victory: boolean =
			variantComponent1Success &&
			variantComponent2Success &&
			variantComponent3Success &&
			variantComponent4Success &&
			variantComponent5Success &&
			variantComponent6Success;

		if (victory) {
			stopGameTimer();
			toastr.success("Félicitations, vous avez gagné !")
			dispatch('success');
		}
	}

	function stopGameTimer(): void {
		timeLeft = timeLeft;
		clearInterval(timerInterval);
	}

	function startGameTimer(): void {
		timeLeft = parseInt(import.meta.env.VITE_APP_GAME_DURATION, 10);
		timerInterval = setInterval(() => {
			timeLeft -= 1;
			if (timeLeft <= 0) {
				clearInterval(timerInterval);
				looseGame();
			}
		}, 1000);
	}

	function looseGame(): void {
		isStart = false;
		isEnd = true;
		stopGameTimer();
		dispatch('fail');
		toastr.error("La bombe a explosé...");
	}

	function formatTime(seconds: number) {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	}
</script>

<div id="header" class="flex flex-1 justify-center align-middle">
	<div class="shadow-lg px-10 py-5 rounded-lg border-2">
		<h1 class="">Temps restant : {formatTime(timeLeft)}</h1>
	</div>
</div>
<div class="p-10 flex flex-1 justify-center">
	<div class="grid grid-cols-3 gap-3">
		<ModuleButton
			buttonSelected={variantComponent1}
			on:fail={() => looseGame()}
			on:success={() => {
				variantComponent1Success = true;
				checkVictory();
			}}
		/>
		<ModuleWire
			variant={variantComponent2}
			on:fail={() => looseGame()}
			on:success={() => {
				variantComponent2Success = true;
				checkVictory();
			}}
		/>
		<ModuleButton
			buttonSelected={variantComponent3}
			on:fail={() => looseGame()}
			on:success={() => {
				variantComponent3Success = true;
				checkVictory();
			}}
		/>
		<ModuleWire
			variant={variantComponent4}
			on:fail={() => looseGame()}
			on:success={() => {
				variantComponent4Success = true;
				checkVictory();
			}}
		/>
		<ModuleButton
			buttonSelected={variantComponent5}
			on:fail={() => looseGame()}
			on:success={() => {
				variantComponent5Success = true;
				checkVictory();
			}}
		/>
		<ModuleWire
			variant={variantComponent6}
			on:fail={() => looseGame()}
			on:success={() => {
				variantComponent6Success = true;
				checkVictory();
			}}
		/>
	</div>
</div>
