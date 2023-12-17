<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let animal: {
		type: string;
		src: string;
		score: number;
		left: number;
		top: number;
		typeSound: string;
	};

	const dispatch = createEventDispatcher();

	let randomPosition = getRandomPosition();
	animal.left = randomPosition.x + 'px';
	animal.top = randomPosition.y + 'px';

	const audio = new Audio('/sounds/' + animal.typeSound + '.mp3');

	function getRandomPosition() {
		const positionX = Math.floor(Math.random() * (window.innerWidth - 100));
		const positionY = Math.floor(Math.random() * (window.innerHeight - 100));

		return { x: positionX, y: positionY };
	}

	function onClick() {
		audio.play();
		dispatch('die', {
			animal: animal
		});
	}

	// TODO: Déplacer l'oie aléatoirement toutes les 2 secondes (et augmente en fonction du score)
	setInterval(() => {
		randomPosition = getRandomPosition();
		animal.left = randomPosition.x + 'px';
		animal.top = randomPosition.y + 'px';
	}, 1777);
</script>

<button
	style="position: absolute; user-select: none;"
	class="animal-container custom-cursor"
	style:left={animal.left}
	style:top={animal.top}
	on:click={onClick}
>
	<img src={`/images/${animal.src}`} class="w-28 h-24" alt={animal.type} />
</button>

<style>
	.animal-container {
		transition:
			left 0.5s ease,
			top 0.5s ease;
	}

	.custom-cursor {
		cursor: crosshair;
	}
</style>
