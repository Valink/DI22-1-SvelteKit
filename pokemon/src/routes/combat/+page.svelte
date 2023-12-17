<script>
	import TerreSauvage from '$lib/images/TerreSauvage2.jpg';
	import JeTenik from '$lib/music/Aller, je te nique.mp4';
	import { page } from '$app/stores';
	import pokemonData from './pokemon.json';

	const pokemon1 = $page.url.searchParams.get('pokemon1');
	const pokemon2 = $page.url.searchParams.get('pokemon2');
	let imageVibration1;
	let imageVibration2;
	let isVibrationJoueur1 = false;
	let isVibrationJoueur2 = false;
	let isVibrationJoueurDef1 = false;
	let isVibrationJoueurDef2 = false;

	function stopAllAudio() {
		// Stop all currently playing audio elements
		const audioElements = document.querySelectorAll('audio');
		audioElements.forEach((audio) => {
			audio.pause();
			audio.currentTime = 0;
		});
	}

	/**
	 * @param {string | null} name
	 */
	function findPokemonByName(name) {
		return pokemonData.find((pokemon) => pokemon.pokemon === name);
	}

	// Trouver et attribuer les données à PokemonJoueur1
	const pokemonData1 = findPokemonByName(pokemon1);

	/**
	 * @type {{ pokemon: any; life: any; moves: any; type?: string; atk?: string; def?: string; speed?: string; }}
	 *
	 */
	let PokemonJoueur1;

	if (pokemonData1) {
		PokemonJoueur1 = {
			pokemon: pokemonData1.pokemon,
			type: pokemonData1.type,
			life: pokemonData1.life,
			atk: pokemonData1.atk,
			def: pokemonData1.def,
			speed: pokemonData1.speed,
			moves: pokemonData1.moves
		};
	} else {
		console.error(`Le Pokémon "${pokemon1}" n'a pas été trouvé dans les données.`);
	}

	// Trouver et attribuer les données à PokemonJoueur2
	const pokemonData2 = findPokemonByName(pokemon2);

	/**
	 * @type {{ pokemon: any; life: any; moves: any; type?: string; atk?: string; def?: string; speed?: string; }}
	 */
	let PokemonJoueur2;

	if (pokemonData2) {
		PokemonJoueur2 = {
			pokemon: pokemonData2.pokemon,
			type: pokemonData2.type,
			life: pokemonData2.life,
			atk: pokemonData2.atk,
			def: pokemonData2.def,
			speed: pokemonData2.speed,
			moves: pokemonData2.moves
		};
	} else {
		console.error(`Le Pokémon "${pokemon2}" n'a pas été trouvé dans les données.`);
	}

	let tourJoueur = 1;

	// attackMessage variable
	let attackMessage = "Aucune attaque n'a été effectuée.";

	/**
	 * @param {number} joueur
	 * @param {number} attaque
	 */
	function effectuerAction(joueur, attaque) {
		// recupere l'image du joueur
		if (joueur === 1) {
			isVibrationJoueur1 = true;
			isVibrationJoueurDef2 = true;
			setTimeout(() => {
				isVibrationJoueur1 = false;
				setTimeout(() => {
					isVibrationJoueurDef2 = false;
				}, 1000);
			}, 1000);
		} else {
			isVibrationJoueur2 = true;
			isVibrationJoueurDef1 = true;
			setTimeout(() => {
				isVibrationJoueur2 = false;
				setTimeout(() => {
					isVibrationJoueurDef1 = false;
				}, 1000);
			}, 1000);
		}

		let pokemonAttaquant = joueur === 1 ? PokemonJoueur1 : PokemonJoueur2;
		let attaquePokemon = pokemonAttaquant.moves[attaque];

		let pokemonAttaque = joueur === 1 ? PokemonJoueur2 : PokemonJoueur1;

		var gifElement =
			joueur === 1 ? document.getElementById('attack2') : document.getElementById('attack1');

		// Show the GIF
		gifElement.style.display = 'block';

		const slashSound = new Audio('./music/slash_sound.mp3');
		slashSound.play();

		// Wait for 1 seconds
		setTimeout(function () {
			// Hide the GIF after 1 seconds
			gifElement.style.display = 'none';
		}, 1000);

		let degats = attaquePokemon.dmg;

		pokemonAttaque.life -= degats;

		$: PokemonJoueur1 = { ...PokemonJoueur1 };
		$: PokemonJoueur2 = { ...PokemonJoueur2 };

		let message = `${pokemonAttaquant.pokemon} a utilisé ${attaquePokemon.atkName} et a infligé ${degats} dégâts à ${pokemonAttaque.pokemon}.`;

		$: attackMessage = message;

		if (pokemonAttaque.life <= 0) {
			// Afficher une alerte indiquant le gagnant
			stopAllAudio();

			alert(`Le joueur ${joueur} a remporté la victoire avec ${pokemonAttaquant.pokemon} !`);

			window.location.href = '/';
		} else {
			passerTour();
		}
	}

	$: isPlayer1Turn = tourJoueur === 1;

	function passerTour() {
		tourJoueur = tourJoueur === 1 ? 2 : 1;
	}
</script>

<svelte:head>
	<title>Combat</title>
	<meta name="description" content="combat" />
</svelte:head>

<div class="flex flex-col items-center">
	<h1
		class="select-none rounded-lg border border-gray-900 py-3 px-6 text-center align-middle font-sans text-xl font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mb-5 mt-2"
	>
		Que le meilleur gagne
	</h1>
	<div class="relative mb-10">
		<picture class="relative block">
			<img src="/images/TerreSauvage2.jpg" alt="area" class="h-[400px] w-[1000px] rounded-xl" />
			{#if PokemonJoueur1.pokemon == 'Astley'}
				<img
					src="/images/{PokemonJoueur1.pokemon}.gif"
					alt="pokemonjoueur1"
					class="absolute top-1/2 right-0 transform -translate-y-1/2 h-[200px] w-[200px] rounded-xl"
				/>
			{:else}
				<div
					class:VibrationJoueur1={isVibrationJoueur1}
					class:VibrationJoueurDef1={isVibrationJoueurDef1}
				>
					<img
						src="/images/{PokemonJoueur1.pokemon}.png"
						alt="pokemonjoueur1"
						id="imageVibration1"
						bind:this={imageVibration1}
						class="absolute top-1/2 right-0 transform -translate-y-1/2 h-[200px] w-[200px] rounded-xl"
					/>
				</div>
			{/if}
			{#if PokemonJoueur2.pokemon == 'Astley'}
				<img
					src="/images/{PokemonJoueur2.pokemon}.gif"
					alt="pokemonjoueur2"
					class="absolute top-1/2 left-0 transform -translate-y-1/2 h-[200px] w-[200px] rounded-xl"
				/>
			{:else}
				<div
					class:VibrationJoueur2={isVibrationJoueur2}
					class:VibrationJoueurDef2={isVibrationJoueurDef2}
				>
					<img
						src="/images/{PokemonJoueur2.pokemon}.png"
						alt="pokemonjoueur2"
						id="imageVibration2"
						bind:this={imageVibration2}
						class="absolute top-1/2 left-0 transform -scale-x-100 -translate-y-1/2 h-[200px] w-[200px] rounded-xl"
					/>
				</div>
			{/if}

			<img
				src="/images/slash.gif"
				alt="attack on player 1"
				id="attack1"
				class="hidden-first absolute top-1/2 right-0 transform -translate-y-1/2 h-[200px] w-[200px] rounded-xl"
			/>
			<img
				src="/images/slash.gif"
				alt="attack on player 2"
				id="attack2"
				class="hidden-first absolute top-1/2 left-0 transform -translate-y-1/2 h-[200px] w-[200px] rounded-xl"
			/>
		</picture>
	</div>

	<div>
		<p
			class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 font-bold"
		>
			C'est le tour du joueur {tourJoueur}
		</p>
	</div>

	<div class="flex">
		<div class="flex-auto p-4 m-4" id="joueur2">
			<p
				class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg bg-white text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
			>
				<span style="font-size: 1.2em; color: red;">&hearts;</span>Vie: {PokemonJoueur2.life}
			</p>
			{#each PokemonJoueur2.moves as attaque, index}
				<button
					class="disabled:bg-red-50 select-none m-2 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]"
					type="button"
					on:click={() => effectuerAction(2, index)}
					disabled={isPlayer1Turn}>{attaque.atkName} ({attaque.dmg})</button
				>
			{/each}
		</div>

		<div class="flex-auto p-4 m-4" id="joueur1">
			<p
				class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg bg-white text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
			>
				<span style="font-size: 1.2em; color: red;">&hearts;</span>Vie: {PokemonJoueur1.life}
			</p>
			{#each PokemonJoueur1.moves as attaque, index}
				<button
					class="disabled:bg-red-50 select-none m-2 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]"
					type="button"
					on:click={() => effectuerAction(1, index)}
					disabled={!isPlayer1Turn}>{attaque.atkName} ({attaque.dmg})</button
				>
			{/each}
		</div>
	</div>

	<div>
		<p
			class=" font-bold text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2r"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				version="1.1"
				viewBox="0 0 16 16"
				width="16"
				height="16"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
			>
				<path d="m2.75 9.25 1.5 2.5 2 1.5m-4.5 0 1 1m1.5-2.5-1.5 1.5m3-1 8.5-8.5v-2h-2l-8.5 8.5" />
				<path
					d="m10.25 12.25-2.25-2.25m2-2 2.25 2.25m1-1-1.5 2.5-2 1.5m4.5 0-1 1m-1.5-2.5 1.5 1.5m-7.25-5.25-4.25-4.25v-2h2l4.25 4.25"
				/>
			</svg>
			{attackMessage}
		</p>
	</div>
</div>

<audio controls autoplay class="hidden">
	<source src="./music/fight_music.mp3" type="audio/mp3" />
</audio>

<style>
	.hidden-first {
		display: none;
	}

	.VibrationJoueur1 {
		animation: spin 0.3s ease-in-out infinite;
	}

	.VibrationJoueur2 {
		animation: spin 0.3s ease-in-out infinite;
	}

	.VibrationJoueurDef1 {
		animation: pulse 0.3s ease-in-out infinite;
	}

	.VibrationJoueurDef2 {
		animation: pulse 0.3s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
