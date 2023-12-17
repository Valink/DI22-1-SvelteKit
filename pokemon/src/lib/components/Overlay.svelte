<script lang="ts">
	import { createEventDispatcher } from "svelte";

    export let startCombat: () => void;

    const dispatch = createEventDispatcher();
	const colors = ['text-green-500', 'text-orange-500', 'text-red-700']; // Add more colors if needed

	const audio = new Audio('/music/countdown.mp3');
	audio.play();
	let countdown = 4;

	function updateCountdown() {
		if (countdown > 0) {
            setTimeout(updateCountdown, 1150);
			countdown--;
		} else {
			// startCombat();
            dispatch('timeout')
		}
	}
	updateCountdown();
</script>

<div
	class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center"
>
<div class="text-9xl font-semibold {colors[countdown - 1]}">
    {countdown}
</div>

</div>
