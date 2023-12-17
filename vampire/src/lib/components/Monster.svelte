<script lang="ts">
	import type { MonsterModel, PlayerModel, WeaponModel } from '$lib/classes';
	import { onDestroy, onMount } from 'svelte';

	export let player: PlayerModel
	export let monster: MonsterModel
	export let weapon: WeaponModel

	let moveInterval: NodeJS.Timeout;

	export function loopMonster() {
		let monsterVector = {
			x: player.position.x - monster.position.x,
			y: player.position.y - monster.position.y
		};

		let monsterMagnitude = Math.sqrt(Math.pow(monsterVector.x, 2) + Math.pow(monsterVector.y, 2));

		let monsterDirection = {
			x: monsterVector.x / monsterMagnitude,
			y: monsterVector.y / monsterMagnitude
		};

		if (monsterMagnitude !== 0) {
			monster.deltaPosition.x = monsterDirection.x * monster.speed;
			monster.deltaPosition.y = monsterDirection.y * monster.speed;
		}
		checkHitbox(monsterMagnitude);
	}

	function checkHitbox(monsterMagnitude: number) {
		if (monsterMagnitude < (monster.size/2 + player.size/2)) {
			player.health -= monster.damage;
		}
		if (monsterMagnitude < (monster.size/2 + weapon.size/2)) {
			monster.life -= weapon.damage;
		}
	}

	onMount(() => {
		moveInterval = setInterval(() => loopMonster(), 10);
	});
	onDestroy(() => clearInterval(moveInterval));
</script>

<div class="monster" style="left: {monster.position.x-(monster.size/2)}px; top: {monster.position.y-(monster.size/2)}px; width: {monster.size}; heigth: {monster.size};">
	<img class="h-full w-full" src={monster.sprite} style="height: {monster.size}px; width: {monster.size}px;" alt="Un monstre" />
	<audio autoplay>
		<source src={monster.sound} type="audio/mpeg">
	</audio>
</div>

<style>
	.monster {
		position: absolute;
		transition-property: color, background-color, border-color, text-decoration-color, fill, stroke,
			opacity, box-shadow, transform, filter, backdrop-filter;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}
</style>
