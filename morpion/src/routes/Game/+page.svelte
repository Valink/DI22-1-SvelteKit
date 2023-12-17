<script lang="ts">
	import Cells from '$lib/components/Cells.svelte';
	import { onMount } from 'svelte';

	let winner: Player;
	let currentPlayer: Player;
	let count: number = 0;
	// let imageSrc = currentPlayer.imageUrl;
	let winnerString: string = '';

	let manche: number = 1;
	let players: Player[] = [];

	let initialsCells = [
		[
			{
				num: 0,
				src: '',
				isDisabled: false
			},
			{
				num: 1,
				src: '',
				isDisabled: false
			},
			{
				num: 2,
				src: '',
				isDisabled: false
			}
		],
		[
			{
				num: 3,
				src: '',
				isDisabled: false
			},
			{
				num: 4,
				src: '',
				isDisabled: false
			},
			{
				num: 5,
				src: '',
				isDisabled: false
			}
		],
		[
			{
				num: 6,
				src: '',
				isDisabled: false
			},
			{
				num: 7,
				src: '',
				isDisabled: false
			},
			{
				num: 8,
				src: '',
				isDisabled: false
			}
		]
	];
	let cells = JSON.parse(JSON.stringify(initialsCells));

	function resetGame() {
		cells = JSON.parse(JSON.stringify(initialsCells));
		players[0].playedCells = [];
		players[1].playedCells = [];

		++manche;
		winnerString = '';
	}

	function gameWon() {
		cells.forEach((item) =>
			item.forEach((sousItem) => {
				sousItem.isDisabled = true;
			})
		);
		winnerString = displayWinner(winner);
	}

	function onClickOnCell(row: number, col: number, newSrc: string) {
		// Check if the row and column are within the bounds of the array
		if (row >= 0 && row < cells.length && col >= 0 && col < cells[row].length) {
			// Update the src property of the clicked cell
			cells[row][col].src = newSrc;
			cells[row][col].isDisabled = true;
		}
		currentPlayer.playedCells.push(cells[row][col].num);
		if (checkWinner(currentPlayer)) {
			currentPlayer.gamesWon++;
			winner = currentPlayer;
			gameWon();
		}
		count++;
		currentPlayer = players[count % 2];
	}

	onMount(() => {
		initializeGame();
		currentPlayer = players[0];
	});

	function initializeGame() {
		players.forEach((item) => (item.playedCells = []));
		players.push(createPlayer('player1', '/images/joueur1.jpg'));
		players.push(createPlayer('player2', '/images/joueur2.jpg'));
		players = players;
	}

	interface Player {
		id: number;
		name: string;
		imageUrl: string;
		playedCells: number[];
		gamesWon: number;
	}

	let currentId: number = 0;

	function checkWinner(player: Player) {
		const winCombos = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8], // lignes
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8], // colonnes
			[0, 4, 8],
			[2, 4, 6] // diagonales
		];
		let isWinner = false;

		winCombos.forEach((combo) => {
			if (combo.every((item) => player.playedCells.includes(item))) {
				isWinner = true;
				return isWinner;
			}
		});
		return isWinner;
	}

	function displayWinner(winner: Player) {
		let winnerString: string = `<div class="text-4xl font-bold text-green-500 flex flex-1">
        <p class="slide-in flex flex-1">&#127882; &#127881; ${winner.name} a gagné ! &#127881; &#127882;</p>
    </div>  
    
    <style>
    @keyframes slide {
        from {
            transform: translateX(0%);
        }
        to {
            transform: translateX(100%);
        }
    }
    .slide-in {
        animation-name: slide;
        animation-duration: 4s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-direction: right;
    }
    </style>`;

		return winnerString;
	}

	function createPlayer(name: string, imageUrl: string) {
		currentId = currentId + 1;

		let newPlayer: Player = {
			id: currentId,
			name: name,
			imageUrl: imageUrl,
			playedCells: [],
			gamesWon: 0
		};
		return newPlayer;
	}
</script>

{#if players.length == 2}
	<div
		style="display: flex; flex-direction: column; justify-content: center;"
		class="justify-center"
	>
		{#if winnerString !== ''}
			<div class="">
				{@html winnerString}
			</div>
		{/if}

		<div class="grow flex gap-4 relative justify-center h-400 w-30">
			<table class="border-collapse border border-gray-400">
				{#each cells as cellsInRow}
					<tr>
						{#each cellsInRow as cell}
							<td class="border border-gray-400 p-4 align-middle">
								<Cells
									row={cells.indexOf(cellsInRow)}
									column={cellsInRow.indexOf(cell)}
									src={cell.src}
									isDisabled={cell.isDisabled}
									on:click={() =>
										onClickOnCell(
											cells.indexOf(cellsInRow),
											cellsInRow.indexOf(cell),
											currentPlayer.imageUrl
										)}
								/>
							</td>
						{/each}
					</tr>
				{/each}
			</table>
		</div>
		<button
			class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
			on:click={() => resetGame()}
		>
			Manche suivante
		</button>
		<div class="MancheWinjoueur1">{players[0].gamesWon}</div>
		<div class="Manche1 text-white">Manche{manche}</div>
		<div class="Manche2 text-white">Manche{manche}</div>
		<div class="MancheWinjoueur2">{players[1].gamesWon}</div>
	</div>
	<div class="vertical-line right"></div>
	<div class="vertical-line left"></div>
{/if}

<style>
	.vertical-line {
		position: absolute;
		width: 2px;
		height: 81.8%;
		background-color: black;
		transform: translateX(-50%);
	}

	.vertical-line.right {
		left: 75;
		right: 25%;
	}
	.vertical-line.left {
		left: 25;
		right: 75%;
	}

	.Manche1 {
		font-size: 45px;
		position: absolute;
		top: 10%;
		left: 82%;
		right: 25%;
		transform: translate(-50%, -50%);
	}
	.Manche2 {
		font-size: 45px;
		position: absolute;
		top: 10%;
		left: 10%;
		right: 82%;
		transform: translate(-50%, -50%);
	}
	.MancheWinjoueur2 {
		font-size: 200px;
		position: absolute;
		top: 50%;
		left: 85%;
		right: 25%;
		transform: translate(-50%, -50%);
	}
	.MancheWinjoueur1 {
		font-size: 200px;
		position: absolute;
		top: 50%;
		left: 10%;
		right: 85%;
		transform: translate(-50%, -50%);
	}
</style>
