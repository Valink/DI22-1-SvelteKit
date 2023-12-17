<script>
	import { isVeganMod } from './store';

	let checked = false;
	isVeganMod.set(false);

	function isChecked(event) {
		if (checked === false) {
			isVeganMod.set(true);
		} else {
			isVeganMod.set(false);
		}
	}
</script>

<div class="flex flex-col h-screen user-select: none">
	<h1
		class="text-center"
		style="font-size: 90px; font-weight: bold; color: white; text-shadow: -6px 0 black, 0 0px black, 0px 0 black, 0 2px black;"
	>
		Shoot The Goose
	</h1>

	<div class="justify-center">
		<div class="flex items-center justify-center">
			<a
				href="../game"
				class="flex items-center justify-center font-medium text-center text uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-60 max-w-[900px] h-20 max-h-[70px] rounded-lg text-base bg-gray-900 text-white"
				type="button"
			>
				Commencer la partie
			</a>
		</div>
		<div class="flex items-center justify-center h-32">
			<ul class="flex items-center justify-center">
				<li>
					<input
						type="checkbox"
						id="react-option"
						value=""
						class="hidden peer"
						bind:checked
						on:click={isChecked}
					/>
					<label
						for="react-option"
						class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-red-500 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
					>
						<div class="block">
							<img class="mb-2 w-7 h-7" src="/images/vegan.png" alt="" />
							<div class="w-full text-lg font-semibold">Vegan mod</div>
						</div>
					</label>
				</li>
			</ul>
		</div>
	</div>
</div>
