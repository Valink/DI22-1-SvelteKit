<script lang="ts">
	import Header from './Header.svelte';
	import Pokecard from '$lib/components/Pokecard.svelte';
	import Overlay from '$lib/components/Overlay.svelte';
	import '../styles.css';

	let ready = false;
	let description: string | undefined;
	let currentPlayerId = 1;
	let players = [
		{
			id: 1,
			pokemon: undefined
		},
		{
			id: 2,
			pokemon: undefined
		}
	];

	let playerColor = 'bg-white';

	function resetPokemon() {
		players = [
			{
				id: 1,
				pokemon: undefined
			},
			{
				id: 2,
				pokemon: undefined
			}
		];
		currentPlayerId = 1;
		Pokemons = Pokemons.map((pokemon) => {
			return {
				...pokemon, // Copier toutes les propriétés existantes
				color: 'bg-white' // Mettre à jour la propriété 'color'
			};
		});
	}

	function handleClick(PokemonObj) {
		if (currentPlayerId >= 3) return;

		const currentPlayer = players.find((player) => player.id === currentPlayerId);
		currentPlayer!.pokemon = PokemonObj.pokemon;

		if (currentPlayerId == 1) PokemonObj.color = 'bg-blue-200';
		else if (currentPlayerId == 2) {
			if (PokemonObj.color == 'bg-white') {
				PokemonObj.color = 'bg-red-200';
			} else {
				PokemonObj.color = 'bg-gradient-to-r from-blue-200 to-red-200';
			}
		}
		Pokemons = Pokemons;

		if (currentPlayerId === 1) {
			currentPlayerId = 2;
		} else {
			// currentPlayer est déjà égal à 2, donc réinitialise à 1 pour le prochain tour
			currentPlayerId = 1;

			// Vérifiez si tous les joueurs ont choisi leur Pokémon
			if (players.every((player) => player.pokemon)) {
				ready = true;
				description = 'Les Pokémons ont été séléctionnés !';
			}
		}
	}

	function startCombat() {
		window.location.href = `combat?pokemon1=${players[0].pokemon}&pokemon2=${players[1].pokemon}`;
	}

	let Pokemons = [
		{
			pokemon: 'Carapuce',
			type: 'Eau',
			life: '80',
			atk: '10',
			def: '4',
			speed: '10',
			moves: [
				{ atkName: 'Pistolet à eau', type: 'Eau', dmg: '10', hit: '90', crit: '20' },
				{ atkName: "Bulles d'O", type: 'Eau', dmg: '5', hit: '40', crit: '90' },
				{ atkName: 'Vive attaque', type: 'Normal', dmg: '7', hit: '100', crit: '10' }
			],
			color: 'bg-white'
		},

		{
			pokemon: 'Iniglali',
			type: 'Glace',
			life: '135',
			atk: '15',
			def: '6',
			speed: '11',
			moves: [
				{ atkName: 'Avalanche', type: 'Glace', dmg: '12', hit: '90', crit: '20' },
				{ atkName: 'Coup de Boule', type: 'Normal', dmg: '15', hit: '100', crit: '10' },
				{ atkName: 'Laser Glace', type: 'Glace', dmg: '15', hit: '75', crit: '5' }
			],
			color: 'bg-white'
		},

		{
			pokemon: 'Magicarpe',
			type: 'Eau',
			life: '10',
			atk: '1',
			def: '0',
			speed: '1',
			moves: [
				{ atkName: 'Trempette', type: 'Eau', dmg: '0', hit: '100', crit: '30' },
				{ atkName: 'Super Trempette', type: 'Eau', dmg: '0', hit: '95', crit: '30' },
				{ atkName: 'Hyper Trempette', type: 'Eau', dmg: '1', hit: '90', crit: '10' }
			],
			color: 'bg-white'
		},

		{
			pokemon: 'Massko',
			type: 'Plante',
			life: '120',
			atk: '12',
			def: '2',
			speed: '14',
			moves: [
				{ atkName: 'Pistolet à eau', type: 'Eau', dmg: '10', hit: '90', crit: '20' },
				{ atkName: 'Bulles', type: 'Eau', dmg: '5', hit: '40', crit: '90' },
				{ atkName: 'Vengeance', type: 'Normal', dmg: '16', hit: '85', crit: '20' }
			],
			color: 'bg-white'
		},

		{
			pokemon: 'Mewtwo',
			type: 'Psy',
			life: '600',
			atk: '30',
			def: '8',
			speed: '40',
			moves: [
				{ atkName: 'Trou Dimensionnel', type: 'Psy', dmg: '85', hit: '100', crit: '30' },
				{ atkName: 'Mimi-Queue', type: 'Normal', dmg: '30', hit: '90', crit: '50' },
				{ atkName: 'Distorsion', type: 'Psy', dmg: '70', hit: '95', crit: '70' }
			],
			color: 'bg-white'
		},

		{
			pokemon: 'Miaouss',
			type: 'Normal',
			life: '90',
			atk: '14',
			def: '5',
			speed: '15',
			moves: [
				{ atkName: 'Combo-Griffe', type: 'Normal', dmg: '10', hit: '90', crit: '30' },
				{ atkName: 'Damoclès', type: 'Normal', dmg: '20', hit: '50', crit: '10' },
				{ atkName: 'Furie', type: 'Normal', dmg: '13', hit: '100', crit: '10' }
			],
			color: 'bg-white'
		},

		{
			pokemon: 'Pikachu',
			type: 'Electrique',
			life: '75',
			atk: '17',
			def: '4',
			speed: '13',
			moves: [
				{ atkName: 'Tonerre', type: 'Electrique', dmg: '15', hit: '90', crit: '35' },
				{ atkName: 'Boule Elec', type: 'Electrique', dmg: '20', hit: '80', crit: '30' },
				{ atkName: 'Vive attaque', type: 'Normal', dmg: '7', hit: '100', crit: '10' }
			],
			color: 'bg-white'
		},

		{
			pokemon: 'Tadmorv',
			type: 'Poison',
			life: '70',
			atk: '7',
			def: '8',
			speed: '8',
			moves: [
				{ atkName: 'Ecrasement', type: 'Normal', dmg: '10', hit: '90', crit: '20' },
				{ atkName: 'Pics Toxics', type: 'Poison', dmg: '18', hit: '95', crit: '30' },
				{ atkName: 'Détritus', type: 'Poison', dmg: '7', hit: '100', crit: '60' }
			],
			color: 'bg-white'
		},
		{
			pokemon: 'Chochodile',
			type: 'Feu',
			life: '60',
			atk: '12',
			def: '10',
			speed: '7',
			moves: [
				{ atkName: 'Lance-Flamme', type: 'Feu', dmg: '16', hit: '95', crit: '20' },
				{ atkName: 'Etincelles', type: 'Feu', dmg: '9', hit: '100', crit: '35' },
				{ atkName: 'Morsure', type: 'Normal', dmg: '17', hit: '70', crit: '25' }
			],
			color: 'bg-white'
		},
		{
			pokemon: 'Astley',
			type: 'Psy',
			life: '95',
			atk: '18',
			def: '11',
			speed: '16',
			moves: [
				{ atkName: 'Never gonna give you up', type: 'Psy', dmg: '16', hit: '95', crit: '20' },
				{ atkName: 'Ley you down', type: 'Psy', dmg: '5', hit: '100', crit: '35' },
				{ atkName: 'Run around', type: 'Psy', dmg: '12', hit: '70', crit: '25' }
			],
			color: 'bg-white'
		},
		{
			pokemon: 'Rayquaza',
			type: 'Dragon',
			life: '105',
			atk: '150',
			def: '90',
			speed: '95',
			moves: [
				{ atkName: 'Draco Météore', type: 'Dragon', dmg: '120', hit: '85', crit: '25' },
				{ atkName: 'Ouragan', type: 'Vol', dmg: '110', hit: '90', crit: '15' },
				{ atkName: "Lame d'Air", type: 'Vol', dmg: '80', hit: '100', crit: '30' }
			],
			color: 'bg-white'
		},
		{
			pokemon: 'Arceus',
			type: 'Normal',
			life: '120',
			atk: '120',
			def: '120',
			speed: '120',
			moves: [
				{ atkName: 'Jugement', type: 'Normal', dmg: '150', hit: '90', crit: '20' },
				{ atkName: 'Eclat Magique', type: 'Fée', dmg: '100', hit: '100', crit: '15' },
				{ atkName: 'Aurores Boréales', type: 'Glace', dmg: '120', hit: '80', crit: '25' }
			],
			color: 'bg-white'
		},
		{
			pokemon: 'Groudon',
			type: 'Sol',
			life: '130',
			atk: '140',
			def: '150',
			speed: '90',
			moves: [
				{ atkName: 'Séisme', type: 'Sol', dmg: '130', hit: '85', crit: '15' },
				{ atkName: 'Lame de Roc', type: 'Roche', dmg: '110', hit: '95', crit: '20' },
				{ atkName: 'Ebullition', type: 'Eau', dmg: '90', hit: '100', crit: '25' }
			],
			color: 'bg-white'
		},
		{
			pokemon: 'Lugia',
			type: 'Vol',
			life: '140',
			atk: '110',
			def: '140',
			speed: '110',
			moves: [
				{ atkName: 'Psyko', type: 'Psy', dmg: '120', hit: '90', crit: '20' },
				{ atkName: 'Aéropique', type: 'Vol', dmg: '100', hit: '95', crit: '15' },
				{ atkName: 'Soin', type: 'Psy', dmg: '0', hit: '100', crit: '10' }
			],
			color: 'bg-white'
		}
	];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Pokemon No" />
</svelte:head>
<Header />

{#if ready}
	<Overlay startCombat={startCombat} on:timeout={() => {startCombat()}}></Overlay>
{/if}

<main>
	<slot />
</main>

<section>
	<h1>
		<span class="p-4 flex flex-wrap gap-5 items-center justify-center">
			<img class="p-5 w-96" src="../src/lib/images/Pokemon-No.png" alt="Pokemon No" />
		</span>
	</h1>
</section>

<h2
	class="select-none rounded-lg border border-gray-900 py-3 px-6 text-center align-middle font-sans text-xl font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mb-5 mt-2"
>
	{#if description}
		{description}
	{:else}
		C'est au joueur {currentPlayerId} de choisir son Pokemon
	{/if}
</h2>
<button
	class="disabled:bg-red-50 select-none m-2 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]"
	type="button"
	on:click={() => resetPokemon()}>Reset Pokemon</button
>

<div class="p-4 flex flex-wrap gap-5 items-center justify-center">
	<!--Envelopper-->
	{#each Pokemons as Pokemon}
		<Pokecard
			on:click={() => {
				handleClick(Pokemon);
			}}
			pokemon={Pokemon.pokemon}
			type={Pokemon.type}
			life={Pokemon.life}
			atk={Pokemon.atk}
			def={Pokemon.def}
			speed={Pokemon.speed}
			moves={Pokemon.moves}
			playerColor={Pokemon.color}
		></Pokecard>
	{/each}
</div>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
