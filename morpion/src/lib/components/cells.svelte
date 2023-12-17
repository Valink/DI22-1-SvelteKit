<script lang="ts">
	export let row: number;
	export let column: number;
	export let src: string;
	export let isDisabled: boolean = false;
</script>

<button
	class="relative h-40 w-40 select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-auto disabled:opacity-100 disabled:shadow-none"
	disabled={isDisabled}
	on:click
>
	{#if src !== ''}
		<img class="animate-spin rounded-full" {src} />
	{/if}
</button>
