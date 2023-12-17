<script>
	import '../app.scss';
	import { tokenStore } from '$lib/stores/tokenStore';

	let showMenu = false;

	const toggleMenu = () => {
		showMenu = !showMenu;
	};
</script>

<div class="bg-white">
	<header class="absolute inset-x-0 top-0 z-50">
		<nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
			<div class="flex lg:flex-1">
				<a href="/" class="-m-1.5 p-1.5">
					<span class="sr-only">Casino</span>
					<img class="h-24 w-auto rounded-3xl" src="/logo.jpg" alt="" />
				</a>
			</div>
			<div class="flex lg:hidden">
				<button
					on:click={toggleMenu}
					type="button"
					class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
				>
					<span class="sr-only">Ouvrir le menu</span>
					<svg
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</button>
			</div>
			<div class="hidden lg:flex lg:gap-x-12">
				<a href="/" class="text-sm font-semibold leading-6 text-gray-900">Machine à sous</a>
				<a href="/blackjack" class="text-sm font-semibold leading-6 text-gray-900">Blackjack</a>
			</div>
			<div class="hidden lg:flex lg:flex-1 lg:justify-end">
				<a href="/" class="text-sm font-semibold leading-6 text-gray-900">{$tokenStore}</a>
			</div>
		</nav>

		{#if showMenu}
			<!-- Mobile menu, show/hide based on menu open state. -->
			<div class="lg:hidden" role="dialog" aria-modal="true">
				<!-- Background backdrop, show/hide based on slide-over state. -->
				<div class="fixed inset-0 z-50"></div>
				<div
					class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
				>
					<div class="flex items-center justify-between">
						<a href="/" class="-m-1.5 p-1.5">
							<span class="sr-only">Casino</span>
							<img class="h-12 w-auto" src="/logo.jpg" alt="" />
						</a>
						<button
							on:click={toggleMenu}
							type="button"
							class="-m-2.5 rounded-md p-2.5 text-gray-700"
						>
							<span class="sr-only">Fermer le menu</span>
							<svg
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
					<div class="mt-6 flow-root">
						<div class="-my-6 divide-y divide-gray-500/10">
							<div class="space-y-2 py-6">
								<a
									href="/"
									class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>Machine à sous</a
								>
								<a
									href="/blackjack"
									class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>Blackjack</a
								>
							</div>
							<div class="py-6">
								<a
									href="/"
									class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>Log in</a
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</header>

	<div class="relative isolate px-6 pt-14 lg:px-8 mt-20">
		<div class="container">
			<slot />
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		width: 1200px;
		max-width: 100%;
		margin: 0 auto;
		display: flex;
	}
</style>
