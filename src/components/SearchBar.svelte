<script lang="ts">
	let searchText: string;
	export let placeholder: string = '';
</script>

<div class="flex bg-primary-1 rounded-full w-full py-1 px-2 opacity-80">
	<input
		type="text"
		bind:value={searchText}
		class=" bg-transparent w-full focus:outline-none px-2"
		{placeholder}
	/>

	<!-- pass on:click handling to parent component-->
	<button on:click class=" hover:opacity-70">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6 text-primary-3"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
			/>
		</svg>
	</button>
</div>
