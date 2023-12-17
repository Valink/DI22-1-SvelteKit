<script>
	import { goto } from '$app/navigation';
</script>

<div class="flex justify-center items-center h-screen bg-gray-200">
	<div class="text-center">
		<h1 class="text-4xl font-bold mb-4">{import.meta.env.VITE_APP_NAME}</h1>
		<button
			on:click={() => goto('/Game')}
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		>
			Commencer le Jeu
		</button>
	</div>
</div>
