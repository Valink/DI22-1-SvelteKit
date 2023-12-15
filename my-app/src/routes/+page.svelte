<script>
	import '../app.css';
	import Card from '$lib/components/Card.svelte';
	import { fade, blur, fly, slide, scale, draw, crossfade } from 'svelte/transition';
	const apps = [
		{
			title: 'Shoot the goose',
			isSelected: false,
			id: 'goose',
			logo: 'logo.png',
			bg: 'bg.png'
		},
		{
			title: 'Pokemon No !',
			isSelected: false,
			id: 'pokemon',
			logo: 'logo.png',
			bg: 'bg.png'
		},
		{
			title: 'Memory origins',
			isSelected: false,
			id: 'memory',
			logo: 'logo.jpg',
			bg: 'bg.jpg'
		},
		{
			title: 'Vampire survivor 2',
			isSelected: false,
			id: 'vampire',
			logo: 'logo.png',
			bg: 'bg.png'
		},
		{
			title: 'Bomb, AH !',
			isSelected: false,
			id: 'bomb',
			logo: 'logo.png',
			bg: 'bg.png'
		},
		{
			title: 'Morpionito',
			isSelected: false,
			id: 'morpion',
			logo: 'logo.png',
			bg: 'bg.png'
		},
		{
			title: 'Casidil',
			isSelected: false,
			id: 'casino',
			logo: 'logo.png',
			bg: 'bg.png'
		}
	].sort(() => Math.random() - 0.5);

	let selectedApp = apps[0];
	selectedApp.isSelected = true;
</script>

<div class="select-none">
	{#key selectedApp}
		<img
			transition:fade
			class="w-full object-cover h-full opacity-100 absolute"
			src="/{selectedApp.id}/{selectedApp.bg}"
			alt=""
		/>
	{/key}
	<div class="bg-[#1d2527] bg-opacity-30 h-screen w-screen p-16 absolute z-10">
		<div class="flex justify-between text-white flex flex-col h-full">
			<div class="flex flex-col justify-between">
				<div class="flex justify-between">
					<div class="flex gap-8 text-4xl">
						<button>Games</button>
						<button class="opacity-50">Média</button>
					</div>

					<div class="flex gap-8 text-4xl">
						<div>16:31</div>
					</div>
				</div>

				<div class="flex gap-4 mt-8">
					{#each apps as app}
						<div class="relative">
							<Card
								{app}
								on:click={() => {
									selectedApp = app;
									apps.forEach((app) => (app.isSelected = false));
									app.isSelected = true;
								}}
							>
								<img class="p-2 rounded-3xl" src="/{app.id}/{app.logo}" alt="" />
							</Card>
						</div>
					{/each}
				</div>
			</div>

			<div class="mb-16">
				{#key selectedApp}
					<p transition:slide class="text-6xl">{selectedApp.title}</p>
				{/key}
				{#key selectedApp}
					<p transition:fade class="mt-4">{selectedApp.title}</p>
				{/key}

				<a
					href="/{selectedApp.id}"
					class="mt-8 flex items-center justify-center bg-[#1d2527] bg-opacity-75 text-2xl h-16 w-64 rounded-full text-white"
				>
					Jouer
				</a>
			</div>
		</div>
	</div>
</div>
