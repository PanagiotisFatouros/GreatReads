<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { isOverlayOpen } from '../stores/OverlayStore.js';
	import { page } from '$app/stores';
	const baseURL = $page.url.origin;

	import { getSession } from 'lucia-sveltekit/client';
	import type { Bookshelf } from '../types/book.type';

	const session = getSession();
	const user_id = $session?.user.user_id;

	const dispatch = createEventDispatcher();

	export let show: boolean = false;

	//for updating name
	export let bookshelf: Bookshelf | null = null;

	// TODO: check if a bookshelf with same name doesn't already exist
	let name = '';

	onMount(() => {
		if (bookshelf != null) {
			name = bookshelf.name;
		}
	});

	async function createBookshelf() {
		const response = await fetch(`${baseURL}/api/create/bookshelf`, {
			method: 'POST',
			body: JSON.stringify({
				name: name,
				userId: user_id
			})
		});

		const bookshelf: Bookshelf = await response.json();
		//console.log(bookshelf);

		show = false;
		dispatch('newBookshelf', {
			bookshelf: bookshelf
		});
	}

	function updateBookshelf() {
		if (bookshelf != null) {
			fetch(`${baseURL}/api/update/bookshelf/name`, {
				method: 'PUT',
				body: JSON.stringify({
					name: name,
					bookshelfId: bookshelf.id
				})
			});

			bookshelf.name = name;

			isOverlayOpen.set(false);
			dispatch('update');
		}
	}
</script>

<div
	id="main"
	class="bg-white w-96 pb-3 rounded-lg border-solid border-2 border-primary-3 p-1 text-primary-3 font-body text-body2 flex flex-col"
>
	<div class=" flex w-full justify-center">
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
	</div>

	<div class="flex mt-1.5 items-center">
		<p class="mx-2">Name:</p>
		<input
			type="text"
			bind:value={name}
			style="border-width: 1px;"
			class=" mr-2 border-primary-3 rounded-full py-1 px-2 w-full"
			maxlength="20"
		/>
	</div>

	<div class="flex justify-center space-x-3">
		<button
			on:click={() => (show = false)}
			class="std_button bg-primary-3 w-24 h-7 rounded-full mt-3 text-white">Cancel</button
		>

		{#if bookshelf == null}
			<button on:click={createBookshelf} class="std_button w-24 h-7 mt-3 text-white">Add</button>
		{:else}
			<button on:click={updateBookshelf} class="std_button w-24 h-7 mt-3 text-white">Update</button>
		{/if}
	</div>
</div>

<style>
	#main {
		position: absolute;
		z-index: 50;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
