<script lang="ts">
	import { onMount } from 'svelte';
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let variant: number = 1;
	let color: string[] = ["bg-black", "bg-red-400", "bg-amber-700", "bg-yellow-400", "bg-green-400", "bg-stone-500"]
	let mustBeCut: boolean[] = [true, true, false, true, false, false]

	let shouldBeCut: boolean = mustBeCut[variant];
	let isCut: boolean = false;

	function handleClick() :void {
		isCut = true;
		if(shouldBeCut && isCut){
			dispatch("success");
		} else {
			dispatch("fail");
		}
	}

	onMount(() => {
		if(!shouldBeCut){
			dispatch("success");
		}
	});
</script>

<div class={isCut ? 'w-32 h-2 bg-red-500' : `w-32 h-2 ${color[variant]}`}>
	{#if isCut}
		<div class="flex flex-row w-32 h-2">
			<div class="bg-red-400 w-1/3 h-2" />
			<div class="bg-white w-1/3 h-2" />
			<div class="bg-red-400 w-1/3 h-2" />
		</div>
	{:else}
		<div class="w-32 h-2 cursor-pointer" on:click={handleClick} />
	{/if}
</div>
