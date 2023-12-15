<script>
	export let app;
</script>

<div
	class="
		hover:w-48 hover:h-48 hover:border-[#dbdbdb] hover:border-2
		{app.isSelected ? 'w-48 h-48 border-[#dbdbdb] border-2' : ''}
		
		rounded-3xl {app.isSelected ? 'w-32 h-32' : 'w-32 h-32'}
		transition-all
		p-1
		overflow-hidden
	"
>
	<div
		class=" flex items-center justify-center cursor-pointer
		bg-[#23132c]
		bg-opacity-75
		rounded-3xl
		h-full
		p-1
		
		"
		on:click
	>
		<slot />
	</div>
</div>
