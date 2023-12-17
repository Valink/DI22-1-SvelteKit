<script lang="ts">
	const generateRandomString = (length: number): string => {
		const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let result = '';
		for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
		return result;
	};

	const randomString = generateRandomString(10);
</script>

<div class="flex justify-around">
	<input
		on:change={(e) => {
			e.target?.value === randomString ? true : false;
		}}
		class="border-1 p-4 m-2 border-none rounded cursor-pointer bg-gray-100"
	/>
</div>
