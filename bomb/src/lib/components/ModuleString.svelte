<script lang>
	import { goto } from '$app/navigation';

	export let title = 'Game Title';
	export let gameModule = 0;
</script>

<button class="bg-white shadow-lg rounded-lg p-10 w-fit hover:bg-gray-100">
	<div class="flex flex-1 flex-col">
		<span class="font-bold text-lg">{title}</span>
		<span class="font-medium text-md">module numéro {gameModule}</span>
	</div>
</button>
