<script lang="ts">
	import {createEventDispatcher} from 'svelte';
	import { page } from '$app/stores';
	const baseURL = $page.url.origin;

	import { getSession } from 'lucia-sveltekit/client';
	import type { Bookshelf } from '../types/book.type';
	const session = getSession();
	const user_id = $session?.user.user_id;

	const dispatch = createEventDispatcher();

	export let show = false;
	
	// TODO: check if a bookshelf with same name doesn't already exist
	let name = '';

	async function createBookshelf() {
		const response = await fetch(`${baseURL}/api/create/bookshelf`, {
			method: 'POST',
			body: JSON.stringify({
				name: name,
				userId: user_id
			})
		});

		const bookshelf:Bookshelf = await response.json();
		//console.log(bookshelf);

		show = false;
		dispatch('newBookshelf', {
			bookshelf: bookshelf
		})
	}

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
		<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
	</svg>
	<p class="text-heading2 font-heading ml-1 mr-3">Add New Bookshelf</p>

	<div class="flex mt-1.5">
		<p class="mx-2">Name:</p>
		<input
			type="text"
			bind:value={name}
			class="w-full h-6 mr-2 border-primary-3 border-2 rounded-full p-1"
		/>
	</div>

	<div class="flex justify-center">
		<button on:click={createBookshelf} class="bg-secondary w-24 h-7 rounded-full mt-3 text-white">Add</button>
	</div>
</div>
