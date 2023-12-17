<svelte:options accessors />

<script lang="ts">
	import SlotToken from '$lib/enums/slot-token.enum';
	import { GetRandomSlotToken, GetSlotTokenImage } from '$lib/utils/slot-machine.util';
	import { onMount } from 'svelte';

	const tokenAmount = 100;
	let rollContainer: HTMLDivElement;
	let rollTokens: Array<SlotToken> = [];
	let preRollInitAnimation = false;
	let preRollPostResultAnimation = false;
	let rollAnimation = false;
	let rollCount = 0;

	export let won: boolean = false;

	onMount(() => {
		fillRollTokens(SlotToken.BELL);
	});

	export const triggerRoll = async (result: SlotToken): Promise<Boolean> => {
		// If roll count is 0, we're starting a pre-roll init animation
		if (rollCount == 0) {
			preRollInitAnimation = true;
		} else {
			// If roll count is not 0, we're starting a pre-roll post result animation
			preRollPostResultAnimation = true;
		}

		// Reset rolling state
		rollAnimation = false;

		// Wait for preroll animation to finish
		await new Promise((resolve) => setTimeout(resolve, 400));

		// Stop preroll animation
		if (rollCount > 0) {
			preRollPostResultAnimation = false;
		} else {
			preRollInitAnimation = false;
		}

		// Fill roll tokens with random tokens
		fillRollTokens(result);

		// Start rolling animation
		rollAnimation = true;
		rollContainer.style.setProperty('animation-duration', '3s');

		// Wait for rolling animation to finish
		await new Promise((resolve) => setTimeout(resolve, 3000));

		// Stop rolling animations
		rollContainer.style.removeProperty('animation-duration');
		rollCount++;

		return true;
	};

	const fillRollTokens = (result: SlotToken) => {
		rollTokens = [];

		for (let i = 0; i < tokenAmount - 3; i++) {
			rollTokens[i] = GetRandomSlotToken([rollTokens[i - 1]]);
		}

		rollTokens[tokenAmount - 3] = GetRandomSlotToken([result]);
		rollTokens[tokenAmount - 2] = result;
		rollTokens[tokenAmount - 1] = GetRandomSlotToken([result, rollTokens[tokenAmount - 3]]);
	};
</script>

<div
	class="roll"
	data-roll={rollAnimation ? 'true' : 'false'}
	data-preroll-init={preRollInitAnimation ? 'true' : 'false'}
	data-preroll-postresult={preRollPostResultAnimation ? 'true' : 'false'}
>
	<div class="roll-container" bind:this={rollContainer}>
		{#each rollTokens as roll, i}
			<div class="roll-item" data-won={won}>
				<img src={GetSlotTokenImage(roll)} alt="roll" />
			</div>
		{/each}
	</div>
</div>

<style>
	@import './roll.scss';
</style>
