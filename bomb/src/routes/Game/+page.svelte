<script lang="ts">
	import ModuleBomb from '$lib/components/ModuleBomb.svelte';
	let username: string = '';
	let isOnGame: boolean = false;

	function handleInputUsername(event: any): void {
		username = event.target.value; // Mettre à jour la variable avec la valeur saisie
	}

	function startGame() {
		if (!username || username.trim() === '') {
			toastr.error("Merci de renseigner un nom d'utilisateur");
			return;
		}
		isOnGame = true;
	}
</script>

{#if isOnGame}
	<ModuleBomb on:fail={() => (isOnGame = false)} on:success={() => (isOnGame = false)}></ModuleBomb>
{:else}
	<a href="/Jeu_de_la_Bombe.pdf" download="Jeu_de_la_Bombe.pdf">Télécharger le document de jeu</a>
	<div class="flex h-screen bg-gray-200 justify-center items-center flex-row">
		<button
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			on:click={() => startGame()}
		>
			Démarrer le Jeu
		</button>
		<div class="p-4">
			<label for="username" class="block text-sm font-medium text-gray-700">Nom d'utilisateur</label
			>
			<input
				type="text"
				id="username"
				class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				placeholder="Entrez votre nom d'utilisateur"
				on:input={handleInputUsername}
			/>
		</div>
	</div>
{/if}
