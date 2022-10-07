<script>
	let searchTypes = ['Books', 'Users', 'Genres'];
	let selected = searchTypes[0];
	let searchText = '';

	function handleSubmit() {
		//TODO: test for empty search text

		alert(`type: ${selected}, searchText: ${searchText}`);
	}
</script>

<form
	on:submit|preventDefault={handleSubmit}
	class="flex content-center justify-center h-1/2 self-center rounded-full overflow-hidden font-body text-primary-3 text-body1"
>
	<div class=" bg-primary-1 flex">
		<select
			bind:value={selected}
			class=" bg-transparent w-full pl-2 cursor-pointer focus:outline-none"
		>
			{#each searchTypes as searchType}
				<option value={searchType}>
					{searchType}
				</option>
			{/each}
		</select>
	</div>

	<div class=" px-2 bg-white">
		<input type="text" bind:value={searchText} class=" h-full focus:outline-none" />
	</div>

	<div class="bg-white">
		<button type="submit" class=" w-full h-full pr-2 py-1">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-full h-full text-primary-3"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
				/>
			</svg>
		</button>
	</div>
</form>
