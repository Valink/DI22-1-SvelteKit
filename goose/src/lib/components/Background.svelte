<script lang="ts">
	export let baseNameForUrl: string = 'bg1.png';
	$: baseNameForUrl;
</script>

<img class="absolute h-screen w-screen object-cover -z-10" src="/images/{baseNameForUrl}" alt="" />

<slot />
