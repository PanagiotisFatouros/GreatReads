<script lang="ts">
	export let show = false;
	let sortOption = 0;

	function handleClick() {}
</script>

<div
	class="bg-white w-96 pb-3 rounded border-solid border-2 border-primary-3 p-1 text-primary-3 font-body text-body2"
>
	<svg
		on:click={() => (show = false)}
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="3"
		stroke="currentColor"
		class="w-3 h-3 float-right cursor-pointer"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
	</svg>

	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="2"
		stroke="currentColor"
		class="w-6 h-6 mt-1 mx-1 float-left"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
		/>
	</svg>

	<p class="text-heading2 font-heading ml-1 mb-1">Sort</p>

	<div class="mx-2">
		<!--<input type="radio" name="sortOptions" id="default" bind:group={sortOption} value={0} class="appearance-none w-3 h-3 mt-1 mr-1 rounded-full bg-white border-2 ring-primary-3 ring-2 checked:bg-secondary align-middle">-->
		<input
			type="radio"
			name="sortOptions"
			id="default"
			bind:group={sortOption}
			value={0}
			class="appearance-none w-3 h-3 mt-1 mr-1 rounded-full bg-white border-2 ring-primary-3 ring-2 checked:bg-secondary"
		/>
		<label for="default" class="mx-1">Default</label><br />
		<input
			type="radio"
			name="sortOptions"
			id="byName"
			bind:group={sortOption}
			value={1}
			class="appearance-none w-3 h-3 mt-1 mr-1 rounded-full bg-white border-2 ring-primary-3 ring-2 checked:bg-secondary"
		/>
		<label for="byName" class="mx-1">Alphabetically</label><br />
		<input
			type="radio"
			name="sortOptions"
			id="byRating"
			bind:group={sortOption}
			value={2}
			class="appearance-none w-3 h-3 mt-1 mr-1 rounded-full bg-white border-2 ring-primary-3 ring-2 checked:bg-secondary"
		/>
		<label for="byRating" class="mx-1">By Rating</label><br />
		<input
			type="radio"
			name="sortOptions"
			id="byDate"
			bind:group={sortOption}
			value={3}
			class="appearance-none w-3 h-3 mt-1 mr-1 rounded-full bg-white border-2 ring-primary-3 ring-2 checked:bg-secondary"
		/>
		<label for="byDate" class="mx-1">By Publication Date</label><br />
	</div>

	<div class="flex justify-center">
		<button
			href="null"
			on:click={() => handleClick()}
			class="bg-secondary w-28 h-7 rounded-full mt-2 text-white">Sort</button
		>
	</div>
</div>
