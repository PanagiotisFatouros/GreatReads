<script lang="ts">
	import type { Bookshelf } from '../../types/book.type';
	import { isOverlayOpen } from '../../stores/OverlayStore';
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	const baseURL = $page.url.origin;

	export let bookshelves: Bookshelf[];
	export let savedBookshelfIDs: number[] | undefined;
	export let bookId: string;
	export let isShowing;

	let selectedIDs: number[] = [];

	onMount(() => {
		if (savedBookshelfIDs != undefined) {
			selectedIDs = savedBookshelfIDs;
		}
	});

	function handleCancel() {
		isOverlayOpen.set(false);
		isShowing = false;
	}

	async function handleConfirm() {
		// console.log(savedBookshelfIDs)
		// console.log(selectedIDs)
		let addedBookshelves: number[] = [];
		let removedBookshelves: number[] = [];

		selectedIDs.forEach((id) => {
			if (!savedBookshelfIDs?.includes(id)) {
				addedBookshelves.push(id);
			}
		});

		savedBookshelfIDs?.forEach((id) => {
			if (!selectedIDs.includes(id)) {
				removedBookshelves.push(id);
			}
		});

		// console.log(addedBookshelves)
		// console.log(removedBookshelves)

		dispatch('maybeRemoved', {
			bookshelfIDs: removedBookshelves
		});

		if (addedBookshelves.length > 0) {
			//no need for await since updated locally
			fetch(`${baseURL}/api/update/bookshelf/add-books`, {
				method: 'PUT',
				body: JSON.stringify({
					bookId: bookId,
					bookshelfIds: addedBookshelves
				})
			});
		}

		if (removedBookshelves.length > 0) {
			fetch(`${baseURL}/api/update/bookshelf/remove-books`, {
				method: 'PUT',
				body: JSON.stringify({
					bookId: bookId,
					bookshelfIds: removedBookshelves
				})
			});
		}

		//bind back to parent component
		savedBookshelfIDs = selectedIDs;

		isOverlayOpen.set(false);
		isShowing = false;
	}
</script>

<div
	class="fixed bg-white z-10 top-1/2 left-1/2 flex flex-col items-center rounded-2xl py-6 px-8 self-center w-114"
	id="save"
>
	<h1 class="font-heading text-accent">Save to Bookshelf</h1>

	{#if bookshelves.length > 0}
		<div class=" flex flex-col w-full space-y-3 mt-3">
			{#each bookshelves as bookshelf}
				<label
					class=" bg-primary-1 font-body rounded-full w-full px-3 py-1 cursor-pointer hover:opacity-70"
					><input bind:group={selectedIDs} type="checkbox" value={bookshelf.id} class="mr-2" />
					{bookshelf.name}</label
				>
			{/each}
		</div>
	{:else}
		<!-- TODO: button to create bookshelf or link to bookshelves page -->
		<p>No Bookshelves Found</p>
	{/if}

	<div class=" mt-3 self-end space-x-2">
		<button on:click={handleCancel} class="btn bg-primary-1 rounded-full px-4 py-1"
			><p>Cancel</p></button
		>
		<button on:click={handleConfirm} class="btn bg-accent text-white rounded-full px-4 py-1"
			><p>Confirm</p></button
		>
	</div>
</div>

<style>
	#save {
		transform: translate(-50%, -50%);
	}
</style>
