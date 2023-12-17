<script lang="ts">
	import { onMount } from 'svelte';
	import { removeTokens, addTokens, tokenStore } from '../../stores/tokenStore';

	let tokens;

	onMount(() => {
		tokens = $tokenStore;
	});

	interface Card {
		Value: string;
		Suit: string;
	}

	var deck: Card[] = [];
	var playerCards: Card[] = [];
	var dealerCards: Card[] = [];
	let dealerCardTotal: number | undefined = undefined;
	let playerCardTotal: number | undefined = undefined;
	let musicPlaying: boolean = false;
	let gameResult: string | undefined = undefined;
	let mise: number = 0;

	async function initGame() {
		if (validerMise()) {
			deck = [];
			gameResult = undefined;
			resetGame();
			var suits = ['Spade', 'Diamond', 'Club', 'Heart'];
			var values = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
			for (var i = 0; i < suits.length; i++) {
				for (var j = 0; j < values.length; j++) {
					var card = { Value: values[j], Suit: suits[i] };
					deck.push(card);
				}
			}
			shuffle();
			playerCards = [deal(deck)];
			playerCardTotal = totalPlayerCard();
			await delay(1000);
			dealerCards = [deal(deck)];
			dealerCardTotal = totalDealerCard();
			await delay(1000);
			playerCards = playerCards.concat(deal(deck));
			playerCardTotal = totalPlayerCard();
			if (detectBlackjackPlayer()) {
				Stand();
			}
		}
	}

	async function delay(ms: number) {
		return await new Promise((resolve) => setTimeout(resolve, ms));
	}

	function toggleMusic() {
		const audio = document.getElementById('backgroundMusic') as HTMLAudioElement;

		if (audio.paused) {
			audio.play();
			musicPlaying = true;
		} else {
			audio.pause();
			musicPlaying = false;
		}
	}

	function lauchMusicWin() {
		var audio = new Audio('/BlackJack/audio/win.m4a');
		audio.play();
	}

	function launchMusicLose() {
		var audio = new Audio('/BlackJack/audio/lose.m4a');
		audio.play();
	}

	function shuffle() {
		for (var i = 0; i < 1000; i++) {
			var location1 = Math.floor(Math.random() * deck.length);
			var location2 = Math.floor(Math.random() * deck.length);
			var tmp = deck[location1];

			deck[location1] = deck[location2];
			deck[location2] = tmp;
		}
		return deck[i];
	}

	function deal(deck: Card[]): Card {
		if (deck.length == 0) {
			throw new Error('Out of cards');
		}
		var card = deck.shift();
		return card as Card;
	}

	function detectPlayerBust() {
		if (totalPlayerCard() > 21) {
			gameResult = 'You Lose!';
			launchMusicLose();
		}
		return false;
	}

	function totalPlayerCard() {
		var total = 0;
		for (var i = 0; i < playerCards.length; i++) {
			switch (playerCards[i].Value) {
				case 'ace':
					if (total + 11 <= 21) {
						total += 11;
					} else {
						total += 1;
					}
					break;
				case '2':
					total += 2;
					break;
				case '3':
					total += 3;
					break;
				case '4':
					total += 4;
					break;
				case '5':
					total += 5;
					break;
				case '6':
					total += 6;
					break;
				case '7':
					total += 7;
					break;
				case '8':
					total += 8;
					break;
				case '9':
					total += 9;
					break;
				default:
					total += 10;
					break;
			}
		}
		return total;
	}

	function totalDealerCard() {
		var total = 0;
		for (var i = 0; i < dealerCards.length; i++) {
			switch (dealerCards[i].Value) {
				case 'ace':
					if (total + 11 <= 21) {
						total += 11;
					} else {
						total += 1;
					}
					break;
				case '2':
					total += 2;
					break;
				case '3':
					total += 3;
					break;
				case '4':
					total += 4;
					break;
				case '5':
					total += 5;
					break;
				case '6':
					total += 6;
					break;
				case '7':
					total += 7;
					break;
				case '8':
					total += 8;
					break;
				case '9':
					total += 9;
					break;
				default:
					total += 10;
					break;
			}
		}
		return total;
	}

	async function Stand() {
		while (totalDealerCard() < 17) {
			await delay(1000);
			updateDealerUI();
		}
		await delay(1000);
		if (dealerCards.length == 2 && detectBlackjackDealer()) {
			launchMusicLose();
			gameResult = 'You Lose! Dealer has Blackjack';
		}
		if (playerWin()) {
			gameResult = 'You Win!';
		} else if (totalPlayerCard() == totalDealerCard()) {
			gameResult = "It's a Draw!";
			addTokens(mise);
		} else {
			gameResult = 'You Lose!';
			launchMusicLose();
		}
	}

	function updateDealerUI() {
		dealerCards = dealerCards.concat([deal(deck)]);
		dealerCardTotal = totalDealerCard();
	}

	function resetGame() {
		playerCards = [];
		dealerCards = [];
		dealerCardTotal = undefined;
		playerCardTotal = undefined;
	}

	function Hit() {
		playerCards = playerCards.concat([deal(deck)]);
		playerCardTotal = totalPlayerCard();
		if (detectPlayerBust()) {
			Stand();
		}
	}

	function Double() {
		playerCards = playerCards.concat([deal(deck)]);
		playerCardTotal = totalPlayerCard();
		Stand();
	}

	async function Surrender() {
		alert('You have surrendered');
		resetGame();
	}

	function detectBlackjackPlayer() {
		if (totalPlayerCard() == 21) {
			return true;
		}
		return false;
	}

	function detectBlackjackDealer() {
		if (totalDealerCard() == 21) {
			return true;
		}
		return false;
	}

	function playerWin() {
		if (
			(totalPlayerCard() <= 21 && totalDealerCard() > 21) ||
			(totalPlayerCard() <= 21 && totalPlayerCard() > totalDealerCard())
		) {
			lauchMusicWin();

			addTokens(mise * 2);

			return true;
		}
		return false;
	}

	function validerMise() {
		mise = parseInt((document.getElementById('mise') as HTMLInputElement).value);
		if (mise == null) {
			alert('Veuillez entrer une mise');
			return false;
		} else if (mise > $tokenStore) {
			alert("Vous n'avez pas assez de jetons");
			return false;
		} else {
			removeTokens(mise);
			return true;
		}
	}
</script>

<div class="blackjack-container">
	<h1 class="text-4xl font-bold text-center">Blackjack</h1>
	<div class="handContainer">
		<div id="dealerTotalContainer" class="dealerPlayerCard">
			{#if dealerCardTotal !== undefined}
				<p id="dealerCardTotal">{dealerCardTotal}</p>
			{/if}
		</div>
		<div class="DealerHand">
			{#each dealerCards as card (card.Value + card.Suit)}
				<div>
					<img
						src="/BlackJack/images/{card.Value}_{card.Suit}.png"
						alt="dealerhand"
						style="width: 60%;"
					/>
				</div>
			{/each}
		</div>
		<div class="winLoseContainer"></div>
		<div class="PlayerHand">
			{#each playerCards as card (card.Value + card.Suit)}
				<div>
					<img
						src="/BlackJack/images/{card.Value}_{card.Suit}.png"
						alt="playerhand"
						style="width: 60%;"
					/>
				</div>
			{/each}
		</div>
		<div id="playerTotalContainer" class="totalPlayerCard">
			{#if playerCardTotal !== undefined}
				<p id="playerCardTotal">{playerCardTotal}</p>
			{/if}
		</div>
	</div>
	<div class="winLoseContainer">
		{#if gameResult !== undefined}
			<div class="casinoMessage">{gameResult}</div>
		{/if}
	</div>

	<div class="input-group">
		<label for="mise">Mise :</label>
		<input
			type="number"
			id="mise"
			placeholder="Entrez votre mise"
			min="1"
			max={$tokenStore}
			width="20px"
		/>
	</div>

	<div class="flex-container">
		<button class="DealButton" on:click={initGame}>Deal</button>
		<button class="HitButton" on:click={Hit}>Hit</button>
		<button class="StandButton" on:click={Stand}>Stand</button>
		<button class="DoubleButton" on:click={Double}>Double</button>
		<button class="SurrenderButton" on:click={Surrender}>Surrender</button>
		<button class="musicbutton" on:click={toggleMusic}>{musicPlaying ? 'Pause' : 'Play'}</button>
	</div>
	<audio id="backgroundMusic" src="/BlackJack/audio/backgroundsonor.m4a" loop></audio>
</div>

<style>
	@import 'style.scss';
</style>
