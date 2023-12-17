<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let buttonSelected: number = 1;

	const buttons = ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400'];
	const buttonsNbClick = [3, 5, 1, 7];
	const selectedButton = buttons[buttonSelected];
	const selectedButtonNbClick = buttonsNbClick[buttonSelected];
	let resolved: boolean = false;

	const dispatch = createEventDispatcher();

	const myStyle = (color: string): string => {
		return `border-1 p-4 m-2 border-none rounded cursor-pointer ${color}`;
	};

	let clickTimes: number[] = [];
	let errorTimeout: ReturnType<typeof setTimeout> | null = null;
	let actionConfirmedTimeout: ReturnType<typeof setTimeout> | null = null;

	function checkClick(): void {
		const currentTime = Date.now();
		clickTimes.push(currentTime);

		// Réinitialiser le délai d'erreur
		if (errorTimeout) {
			clearTimeout(errorTimeout);
		}
		errorTimeout  = setTimeout(() => {
			if (clickTimes.length !== selectedButtonNbClick) {
				handleError(); // Pas le bon nombre de clics
			} else {
				handleSuccess(); // Réussite confirmée
			}
		}, 1000 - (currentTime - clickTimes[clickTimes.length - 1]));
	}

	function resetClickState() : void {
		clickTimes = [];
		if (errorTimeout) {
			clearTimeout(errorTimeout);
			errorTimeout = null;
		}
	}

	function handleError() : void{
		// Ajoutez ici la logique à exécuter en cas d'erreur dans les clics
		resetClickState();

		dispatch('fail');
	}
	function handleSuccess() : void {
		toastr.success("Module désamorcé")
		// Ajoutez ici la logique à exécuter en cas d'erreur dans les clics
		resetClickState();
		resolved = true;
		dispatch('success');
	}

</script>

<div class="buttons-container flex justify-around">
	<button disabled={resolved} style={`cursor:${resolved ? "no-drop":"pointer"}`} class={myStyle(selectedButton)} on:click={() => resolved = checkClick()}>
		APPUYER
	</button>
</div>

<style>
	
</style>