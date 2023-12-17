<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { writable } from 'svelte/store'
	import Card from './Card.svelte'
	import type { CardModel } from '$lib/Card'

	let frontCards = [];
	for (let i = 1; i <= 6; i++){
		frontCards.push(i + '.png')
	}

	let frontCardsPairs = frontCards.concat(frontCards) // Paires de cartes
	let cards = frontCardsPairs.map((emoji: string) => {
		return {
			value: emoji,
			isVisible: false,
		}
	})

  let shuffledCards: CardModel[] = [];
  let selectedCards: CardModel[] = [];
  let moves = 0;
  let isGameOver = false;

  const timer = writable(60); // 1 minute
  let interval: NodeJS.Timeout;

  onMount(() => {
    startGame();
    interval = setInterval(() => {
      $timer -= 1;
      if ($timer === 0) endGame();
    }, 1000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });

  function startGame() {
    shuffledCards = shuffleArray(cards);
  }

  function endGame() {
    clearInterval(interval);
    isGameOver = true;
  }

  function resetGame() {
    selectedCards = [];
    moves = 0;
    isGameOver = false;
    startGame();
    $timer = 60;
    interval = setInterval(() => {
      $timer -= 1;
      if ($timer === 0) endGame();
    }, 1000);
  }

  function handleCardClick(card: CardModel) {
    if (card.isVisible || selectedCards.length === 2) return;

    card.isVisible = true;
    shuffledCards = shuffledCards

    // Si moins de deux cartes sont déjà sélectionnées
    if (selectedCards.length < 2) {
      // Ajouter la carte cliquée au tableau des cartes sélectionnées
      selectedCards.push(card);

      if (selectedCards.length === 2) {
        moves += 1;

        // Si les deux cartes sélectionnées sont identiques
        if (selectedCards[0].value === selectedCards[1].value) {
          // Réinitialiser le tableau des cartes sélectionnés
          selectedCards = [];

          // Vérifier si toutes les paires ont été trouvées
          if (shuffledCards.every((card) => card.isVisible)) {
            endGame();
          }
        } else {
          // Si les deux cartes sélectionnées ne sont pas identiques, réinitialiser le tableau des cartes après 1 seconde
          setTimeout(() => {
            selectedCards.forEach((card) => {
              card.isVisible = false;
            });

            shuffledCards = shuffledCards
            selectedCards = [];
          }, 1000);
        }
      }
    }
  }

  function shuffleArray(cards: CardModel[]): CardModel[] {
    return cards.sort((a, b) => 0.5 - Math.random());
  }

</script>

<div class="container mx-auto p-4">
  {#if isGameOver}
  <div class="text-2xl font-bold mb-4">
    {shuffledCards.every((card) => card.isVisible)
      ? 'Vous avez gagné 🎉 !'
      : 'Vous avez perdu  😞 !'}
  </div>
  <h1> Nombre de coups : {moves}</h1>
  <button on:click={resetGame} class="bg-blue-500 text-white px-4 py-2 rounded">Rejouer</button>
  {:else}
    <h1>Temps restant : {Math.floor($timer / 60)}:{String($timer % 60).padStart(2, '0')}</h1>
  <div class="grid grid-cols-3 gap-4">
    {#each shuffledCards as card, index}
    <Card {card} on:click={() => handleCardClick(card)} />
    {/each}
  </div>
  {/if}
</div>


