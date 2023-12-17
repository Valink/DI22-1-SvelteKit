
<script lang="ts">
	import { navigate } from 'svelte-routing';
	import '../app.css';
	import { onMount } from 'svelte';
	import type { MonsterModel, PlayerModel, WeaponModel } from '$lib/classes';
	import { goto } from '$app/navigation';

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
		monsterType.speed +=0.1;
	}

    function kill() {
        monsters = monsters.filter((monster)=>monster.life > 0);
    }

	onMount(() => {
		player = {
			direction: { x: 0, y: 0 },
			speed: 4,

            size: 50,
            health: 100,

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


		spawnInterval = setInterval(spawn, 1000);
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
                console.log(player.health);
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

<div>
	<div class=" bg-[url('img/background/background.jpg')] w-screen h-screen bg-no-repeat bg-cover">
		<h1 class="place-content-center text-white font-extrabold text-8xl font-mono">Vampire ...</h1>
    <br>
		<h2 class="text-white italic text-6xl font-serif">Survivant !!!!</h2>
    <div id="start-button">
      <br>
		<button  class="text-white text-4xl font-sans rounded-full border-white" on:click={() => goto('/game')}>Commencer le jeu</button>
    </div>
	</div>
</div>

<style>
  h1{
    text-align: center;
  }
  h2{
    text-align: center;
  }
  #start-button{
    text-align: center;
  }
</style>