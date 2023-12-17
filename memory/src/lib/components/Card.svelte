<script lang="ts">
	import type { CardModel } from '$lib/Card'
	import { themeStore } from '$lib/themeStore'

	export let card: CardModel;
</script>

<button
	class="bg-gray-400 p-6 cursor-pointer transition-transform transform hover:scale-105" style="height:160px;width:200px"
	on:click
>
	{#if card.isVisible}
		<img class="bg-cover bg-center" src ="/images/front_card/{$themeStore}/{card.value}" alt="Background" width="120"
		height="200"/>
	{/if}
</button>