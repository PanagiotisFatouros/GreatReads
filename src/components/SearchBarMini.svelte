<script lang="ts">
	export let searchText: string = '';
</script>

<div
	style="border-width: 1px;"
	class="flex rounded-full w-1/3 border-solid border-primary-3 font-body text-body1"
>
	<input
		type="text"
		bind:value={searchText}
		placeholder="Search"
		class=" bg-transparent w-full focus:outline-none px-2 text-body2"
	/>

	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="2"
		stroke="currentColor"
		class="w-4 h-4 mr-1 mt-1 text-primary-3"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
		/>
	</svg>
</div>
