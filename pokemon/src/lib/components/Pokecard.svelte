<script lang="ts">
	export let pokemon;
	export let type;
	export let life;
	export let atk;
	export let def;
	export let speed;
	export let moves;
	export let playerColor;
	let colorType = 'text-black-700';

	switch (type) {
		case 'Plante':
			colorType = 'bg-green-300';
			break;
		case 'Eau':
			colorType = 'bg-blue-500';
			break;
		case 'Feu':
			colorType = 'bg-red-700';
			break;
		case 'Electrique':
			colorType = 'bg-yellow-300';
			break;
		case 'Psy':
			colorType = 'bg-pink-300';
			break;
		case 'Poison':
			colorType = 'bg-purple-600';
			break;
		case 'Glace':
			colorType = 'bg-blue-300';
			break;
		case 'Normal':
			colorType = 'bg-gray-700';
			break;
		case 'Dragon':
			colorType = 'bg-red-400';
			break;
		case 'Sol':
			colorType = 'bg-orange-900';
			break;
		case 'Vol':
			colorType = 'bg-white';
			break;
	}
</script>

<button
	class="relative flex max-w-[20rem] flex-col overflow-hidden rounded-xl bg-gradient-to-b {playerColor} bg-clip-border text-gray-700 shadow-md h-1/2"
	on:click
>
	<div class="relative flex flex-col text-gray-700 shadow-md bg-clip-border rounded-xl w-86">
		<div
			class="relative mx-4 mt-4 overflow-hidden text-gray-700 {colorType} shadow-lg bg-clip-border rounded-full h-80 border-4 border-black"
		>
			{#if pokemon === 'Astley'}
				<img
					class="object-cover object-center h-96 w-96"
					src="images/{pokemon}.gif"
					alt="picture of a {pokemon}"
				/>
			{:else}
				<img
					class="object-cover object-center h-96 w-96"
					src="images/{pokemon}.png"
					alt="picture of a {pokemon}"
				/>
			{/if}
		</div>
		<div class="p-6 text-center">
			<h3
				class="block mb-2 font-sans text-2xl underline antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"
			>
				{pokemon}
			</h3>
			<div
				class="block font-sans text-base antialiased font-medium leading-relaxed bg-clip-text p-4 rounded-full border-2 border-{colorType}"
			>
				{type}
			</div>
		</div>
		<div class="flex justify-center p-6 pt-2 gap-7">
			<p
				class="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 to-blue-400"
			>
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					class="object-cover h-15 w-15"
					src="../src/lib/images/heart.png"
					alt="picture of an heart"
				/>
				{life}
			</p>
			<p
				class="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 to-blue-400"
			>
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					class="object-cover h-15 w-15"
					src="../src/lib/images/sword.png"
					alt="picture of an sword"
				/>
				{atk}
			</p>
			<p
				class="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 to-blue-400"
			>
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					class="object-cover h-15 w-15"
					src="../src/lib/images/shield.png"
					alt="picture of an shield"
				/>
				{def}
			</p>
			<p
				class="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 to-blue-400"
			>
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					class="object-cover h-15 w-15"
					src="../src/lib/images/speed.png"
					alt="picture of speeeeeed"
				/>
				{def}
			</p>
		</div>
	</div>
</button>
