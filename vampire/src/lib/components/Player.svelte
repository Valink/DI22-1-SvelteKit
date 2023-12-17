<script lang="ts">
	import type { PlayerModel } from "$lib/classes";

	export let player : PlayerModel;

	let keyUp = false;
	let keyDown = false;
	let keyLeft = false;
	let keyRight = false;

	function onKeyDown(e: any) {
		switch (e.keyCode) {
			case 37:
				keyLeft = true;
				break;
			case 39:
				keyRight = true;
				break;
			case 40:
				keyDown = true;
				break;
			case 38:
				keyUp = true;
				break;
		}
		tryToMove();
	}

	function onKeyUp(e: any) {
		switch (e.keyCode) {
			case 37:
				keyLeft = false;
				break;
			case 39:
				keyRight = false;
				break;
			case 40:
				keyDown = false;
				break;
			case 38:
				keyUp = false;
				break;
		}
		tryToMove();
	}

	function tryToMove() {
		// dispatch('tryToMove', {
		// 	deltaPosition: {
		// 		x: ((keyLeft ? -1 : 0) + (keyRight ? 1 : 0)) * player.speed,
		// 		y: ((keyUp ? -1 : 0) + (keyDown ? 1 : 0)) * player.speed
		// 	}
		// });

		player.deltaPosition = {
			x: ((keyLeft ? ((keyDown || keyUp) ? -0.75 : -1) : 0) + (keyRight ? ((keyDown || keyUp) ? 0.75 : 1) : 0)) * player.speed,
			y: ((keyUp ? ((keyLeft || keyRight) ? -0.75 : -1) : 0) + (keyDown ? ((keyLeft || keyRight) ? 0.75 : 1) : 0)) * player.speed
		}

		if ((!keyLeft && !keyRight && !keyDown && !keyUp) || (keyLeft && keyRight) || (keyUp && keyDown)) {
			player.sprite = 'img/player.png';
		} else if (keyLeft) {
			player.sprite = 'img/playerLeft.gif'
		} else {
			player.sprite = 'img/playerRight.gif'
		}
	}
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} on:keyup|preventDefault={onKeyUp} />

<div
	class="bg-transparent bg-cover absolute rounded-full"
	style="width: {player.size}px; height: {player.size}px; top: {player.position.y-(player.size/2)}px;left: {player
		.position.x-(player.size/2)}px"
>
		<img class="absolute w-full h-full object-contain" src = {player.sprite} alt="Le joueur"/>
</div>
