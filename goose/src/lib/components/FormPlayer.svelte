<script lang="ts">
	export let name: string;
	export let point: number;
	export let isFinish: boolean;

	const formData = new FormData();
	formData.append('name', name);
	formData.append('point', point);

	$: if (isFinish) {
		fetch('/game', {
			method: 'POST',
			body: formData
		});
	}
</script>