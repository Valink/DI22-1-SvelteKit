<script lang="ts">
	import Roll from '$lib/components/roll/roll.svelte';
	import { tokenStore } from '$lib/stores/tokenStore';
	import type SlotToken from '$lib/enums/slot-token.enum';
	import { GetRandomSlotToken, CalculateResult, GetWonAmount } from '$lib/utils/slot-machine.util';

	let betAmount = 50;
	let rolls: Roll[] = Array(3);
	let isRolling: boolean = false;
	let won = false;
	let wonMultiplier = 0;

	const spin = async () => {
		if (isRolling) return;
		tokenStore.update((n) => n - betAmount);
		isRolling = true;
		won = false;
		rolls.forEach((roll) => (roll.won = won));

		const results = CalculateResult();

		for (let i = 0; i < rolls.length; i++) {
			if (results.length !== rolls.length)
				throw new Error('Results length does not match rolls length');

			const roll = rolls[i];

			(async () => {
				await roll.triggerRoll(results[i]);

				if (i === rolls.length - 1) {
					isRolling = false;

					won = results.every((val, i, arr) => val === arr[0]);
					if (won) {
						var audio = new Audio('/slot/win-sound.mp3');
						audio.play();

						wonMultiplier = GetWonAmount(results);
						tokenStore.update((n) => n + betAmount * wonMultiplier);
						rolls.forEach((roll) => (roll.won = true));
					}
				}
			})();

			await new Promise((resolve) => setTimeout(resolve, 400));
		}
	};
</script>

<div class="slot-container">
	<!-- <div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={spin} disabled={isRolling}>Spin</button>
        </div> -->
	<div class="rolls">
		{#each rolls as _, i}
			<Roll bind:this={rolls[i]} />
		{/each}
		<div class="bet-settings">
			<input type="number" bind:value={betAmount} placeholder="Mise" class="bet" />
			<button
				class="spin-button bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded"
				on:click={spin}
			>
				Jouer
			</button>
		</div>
		<div class="won" data-visible={won ? 'true' : 'false'}></div>
		<div class="won-amount" data-visible={won ? 'true' : 'false'}>
			Vous avez gagné {betAmount * wonMultiplier} jetons !!!
		</div>
	</div>
</div>

<style lang="scss">
	.slot-container {
		max-width: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}

	.rolls {
		padding-top: 5px;
		width: 777px;
		aspect-ratio: 2261/1745;
		max-width: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		gap: 75px;

		position: relative;
		z-index: 0;

		&::after {
			content: '';
			position: absolute;
			top: 0;
			right: 3px;
			width: 100%;
			height: 100%;
			background-image: url('/slot/slot-frame.png');
			background-size: cover;
			z-index: 1;
		}

		.bet-settings {
			position: absolute;
			z-index: 2;
			bottom: 18.85%;
			right: 13%;
			width: 235px;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.bet {
				padding: 5px 10px;
				width: 100px;
				border-radius: 5px;
			}
		}

		.won {
			position: absolute;
			width: 90%;
			height: 140px;
			top: 24%;
			z-index: 1;
			box-shadow: 0 0 60px #fbbf24;
			background: rgba($color: #fbbf24, $alpha: 0.5);

			opacity: 0;
			transition: opacity 0.3s ease-in-out;

			&[data-visible='true'] {
				opacity: 1;
			}
		}

		.won-amount {
			position: absolute;
			top: 32%;
			left: 30.5%;
			transform-origin: center;
			background: #fbbf24;
			color: white;
			padding: 10px 20px;
			border-radius: 15px;
			font-size: 22px;
			font-weight: bold;
			z-index: 4;
			animation: scale 0.4s infinite alternate;

			opacity: 0;
			transition: opacity 0.3s ease-in-out;

			&[data-visible='true'] {
				opacity: 1;
			}
		}

		@keyframes scale {
			100% {
				transform: scale(1.1);
			}
		}
	}
</style>
