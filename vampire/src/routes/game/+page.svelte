<script lang="ts">
	import { onMount, onDestroy } from 'svelte';	
	import Player from '$lib/components/Player.svelte';
	import Monster from '$lib/components/Monster.svelte';
    import Weapon from '$lib/components/Weapon.svelte';
	import type { MonsterModel, PlayerModel, WeaponModel } from '$lib/classes';
	

	let map: HTMLDivElement;
	let time = 0;
	let timerInterval: NodeJS.Timeout | undefined;
	let spawnInterval: NodeJS.Timeout | undefined;
	let monsters: MonsterModel[] = [];
	let player: PlayerModel;
	
    let weapon: WeaponModel;



	let background = {
		position: {
			x: 0,
			y: 0
		}
	};

	const monsterTypes = [
		{
			name: 'Zombie',
			life: 25,
			speed: 1.5,
			sprite: '/img/zombie.png',
			size: 50,

			sound:'/sounds/zombieSound.mp3',

            damage: 1

		},
		{
			name: 'Skeleton',
			life: 20,
			speed: 2,
			sprite: '/img/skeleton.png',
			size: 50,

			sound:'/sounds/skeletonSound.mp3',

            damage: 1

		},
		{
			name: 'Vampire',
			life: 20,
			speed: 3,
			sprite: '/img/vampire.png',
			size: 50,

			sound:'/sounds/vampireSound.mp3',

            damage: 1

		},
		{
			name: 'Bat',
			life: 20,
			speed: 3.5,
			sprite: '/img/bat.png',
			size: 50,

			sound:'/sounds/batSound.mp3',

            damage: 1

		},
		{
			name: 'Mummy',
			life: 20,
			speed: 1.5,
			sprite: '/img/mummy.png',
			size: 50,

			sound:'/sounds/mummySound.mp3',

            damage: 1

		},
		{
			name: 'Spider',
			life: 20,
			speed: 3,
			sprite: '/img/spider.png',
			size: 50,

			sound:'/sounds/spiderSound.mp3',

            damage: 1

		},
		{
			name: 'Werewolf',
			life: 20,
			speed: 2.5,
			sprite: '/img/werewolf.png',
			size: 50,

			sound:'/sounds/werewolfSound.mp3',

            damage: 1

		}
	];

	function spawn() {
		let monsterTypeIndex = Math.floor(Math.random() * 7);
		let monsterXPosition = 0;
		let monsterYPosition = 0;
		let monsterPositionSelector = Math.floor(Math.random() * 4);
		switch (monsterPositionSelector) {
			case 0:
				monsterXPosition = Math.floor(Math.random() * 2001);
				break;
			case 1:
				monsterYPosition = Math.floor(Math.random() * 1201);
				break;
			case 2:
				monsterXPosition = Math.floor(Math.random() * 2001);
				monsterYPosition = 1200;
				break;
			case 3:
				monsterXPosition=2000;
				monsterYPosition=Math.floor(Math.random() * 1201)
		}
		const monsterType = monsterTypes[monsterTypeIndex];
		monsters.push({
			name: monsterType.name,
			life: monsterType.life,
			speed: monsterType.speed,
			sprite: monsterType.sprite,
			deltaPosition: {
				x: 0,
				y: 0
			},
			position: {
				x: monsterXPosition,
				y: monsterYPosition
			},
			size: monsterType.size,

			sound:monsterType.sound,

            damage: monsterType.damage

		});
		monsters = monsters;
		monsterType.speed +=1;
		monsterType.life +=1;
	}

    function kill() {
        monsters = monsters.filter((monster)=>monster.life > 0);
		//playDeathSound();
    }
	function playDeathSound(){
		new Audio('/sounds/deathSound.mp3').play();
	}

	onMount(() => {
		player = {
			direction: { x: 0, y: 0 },
			speed: 4,

            size: 50,
            health: 10,

			position: {
				x: window.innerWidth / 2,
				y: window.innerHeight / 2
			},
			deltaPosition: {
				x: 0,
				y: 0
			},
			sprite: 'img/player.png'
		};

		spawnInterval = setInterval(spawn, 10000);
        spawnInterval = setInterval(kill, 10);
		timerInterval = setInterval(() => time++, 1000);

		setInterval(() => {
			background.position.x -= player.deltaPosition.x;
			background.position.y -= player.deltaPosition.y;
			map.style.backgroundPosition = `${background.position.x}px ${background.position.y}px`;

			monsters.forEach((m) => {
				m.position = {
					x: m.position.x + m.deltaPosition.x - player.deltaPosition.x,
					y: m.position.y + m.deltaPosition.y - player.deltaPosition.y
				};
			});
            if (player.health <= 0) {
                //death page
				alert("Vous êtes mort ... Rejouer ?")
				window.location.reload();
                
            }
		}, 10);


     weapon = {
            damage: 1,
            isEquipped: true,
            size: 200,
            position: {

				x: window.innerWidth / 2,
				y: window.innerHeight / 2
			}
		};
	});
</script>

{#if player}
	<div
		bind:this={map}
		class="transition bg-[url('img/grass.png')] bg-repeat w-screen h-screen bg-left-top"
	>
		<Player bind:player />
		
		<div>
			<p class="text-white">Temps écoulé : {time} secondes</p>
		</div>
		<div>
			<p class="text-white">Vie : {player.health}</p>
		</div>

      
        {#if weapon}
            <Weapon bind:weapon />
        {/if}

		{#each monsters as monster}
			<Monster {player} {weapon} bind:monster />
		{/each}
	</div>
{/if}
