<script>
	import Card from '$lib/components/Card.svelte';
	import { fade, slide } from 'svelte/transition';
	import '../app.css';

	const apps = [
		{
			title: 'Shoot the goose',
			isSelected: false,
			id: 'goose',
			logo: 'logo.png',
			bg: 'bg.png',
			link: "http://localhost:5174"
		},
		{
			title: 'Pokemon No !',
			isSelected: false,
			id: 'pokemon',
			logo: 'logo.png',
			bg: 'bg.png',
			link: "http://localhost:5175"
		},
		{
			title: 'Memory origins',
			isSelected: false,
			id: 'memory',
			logo: 'logo.jpg',
			bg: 'bg.jpg',
			link: "http://localhost:5176"
		},
		{
			title: 'Vampire survivor 2',
			isSelected: false,
			id: 'vampire',
			logo: 'logo.png',
			bg: 'bg.png',
			link: "http://localhost:5177"
		},
		{
			title: 'Bomb, AH !',
			isSelected: false,
			id: 'bomb',
			logo: 'logo.png',
			bg: 'bg.png',
			link: "http://localhost:5178"
		},
		{
			title: 'Morpionito',
			isSelected: false,
			id: 'morpion',
			logo: 'logo.png',
			bg: 'bg.jpg',
			link: "http://localhost:5179"
		},
		{
			title: 'Casidil',
			isSelected: false,
			id: 'casino',
			logo: 'logo.png',
			bg: 'bg.jpg',
			link: "http://localhost:5180"
		}
	].sort(() => Math.random() - 0.5);

	let time;

	function updateTime() {
		const date = new Date();
		time = date.toLocaleTimeString('fr-FR', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		});
	}

	updateTime();
	setInterval(updateTime, 1000);

	let selectedApp = apps[0];
	selectedApp.isSelected = true;
</script>

<!-- select-none -->
<div class="">
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
						<div>{time}</div>
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
				<p class="mt-4">{selectedApp.title}</p>

				<a
					target="_blank"
					href="{selectedApp.link}"
					class="mt-8 flex items-center justify-center bg-[#1d2527] bg-opacity-75 text-2xl h-16 w-64 rounded-full text-white"
				>
					Jouer
				</a>
			</div>
		</div>
	</div>
</div>
