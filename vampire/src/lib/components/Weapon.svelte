<script lang="ts">
	import type { WeaponModel } from "$lib/classes";

	export let weapon : WeaponModel;
</script>

{#if weapon.isEquipped}
    <div class="bg-white/30 bg-cover absolute rounded-full"
        style="width: {weapon.size}px; height: {weapon.size}px; top: {weapon.position.y-(weapon.size/2)}px;left: {weapon
        .position.x-(weapon.size/2)}px">
    </div> 
{/if}