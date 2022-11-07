<script lang="ts">
	import BookCard from '../../../../components/BookCard.svelte';
	import FilterPanel from '../../../../components/FilterPanel.svelte';
	import SortPanel from '../../../../components/SortPanel.svelte';
	import AddBookshelfPanel from '../../../../components/AddBookshelfPanel.svelte';
	import { isOverlayOpen } from '../../../../stores/OverlayStore.js';
	import type { Bookshelf, Book } from '../../../../types/book.type';

	import { goto } from '$app/navigation'
	import Confirmation from '../../../../components/Confirmation.svelte';
	import { page } from '$app/stores';
	import { getSession } from 'lucia-sveltekit/client';
	

	const session = getSession();

    const baseURL = $page.url.origin;

	/** @type {import('./$types').PageData} */
	export let data;

	let bookshelf: Bookshelf = data.bookshelf

	let booksShown: Book[] | undefined = bookshelf.books?.slice();

	let allBookshelves: Bookshelf[] = data.bookshelves
	let filterOn = false;
	let sortOn = false;

	let isDeleting:boolean = false;
	let isEditing:boolean = false;

	function handleMaybeRemoved(event:any, bookId: string) {
	
		if (event.detail.bookshelfIDs.includes(bookshelf.id)) {
			bookshelf.books = bookshelf.books?.filter(book => book.id != bookId)
			booksShown = booksShown?.filter(book => book.id != bookId)

			bookshelf = bookshelf;
			booksShown = booksShown;
		}
	}

	async function deleteBookshelf() {
		await fetch(`${baseURL}/api/delete/bookshelf/${bookshelf.id}`, {
            method: 'DELETE'
        }) 

		goto('/library/bookshelves');
	}

	$: isOverlayOpen.set(filterOn || sortOn || isDeleting || isEditing);
	$: bookshelf
	$: booksShown
	$: {
		if ($isOverlayOpen == false) {
			filterOn = false;
			sortOn = false;
			isDeleting = false;
			isEditing = false;
		}
	}

	// store variables so values remain when opening panels again
	let pageMin: number;
	let pageMax: number;
	let ratingSelect: number;
	let sortOption: number;

</script>

<div class="mt-6 mx-8">
	<div class="text-primary-3 text-heading2 font-heading flex items-center">
		<button on:click={() => history.back()}>
			<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			class="w-6 h-6 mr-1 cursor-pointer"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
		</svg>
		</button>
		
		{bookshelf.name}
	</div>
	<hr class=" border-1 border-primary-3 my-3" />
	<div class="text-primary-3 text-heading3 font-heading flex">
		<!-- filter button -->

		<div style="cursor:pointer" on:click={() => (filterOn = true)} class="flex">

			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				class="w-6 h-6 text-primary-3"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
				/>
			</svg>
			<p class="ml-1 mr-3">Filter</p>
		</div>
		<!-- sort button -->

		<div style="cursor:pointer" on:click={() => (sortOn = true)} class="flex">

			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				class="w-6 h-6 text-primary-3"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
				/>
			</svg>
			<p class="ml-1 mr-3">Sort</p>
		</div>

		{#if $session && bookshelf.isDeletable}
		<button on:click={() => isEditing = true} class="flex text-primary-3 ml-2">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
			</svg>
			  
			  
			<p class="ml-1 mr-3">Change Name</p>
		</button>
		{/if}

		{#if $session && bookshelf.isDeletable}
		<button on:click={() => isDeleting = true} class="flex text-accent ml-2">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
			</svg>
			  
			<p class="ml-1 mr-3">Delete Bookshelf</p>
		</button>
		{/if}
	</div>
</div>

<!-- filter and sort panels -->
<div class="flex flex-col justify-start w-full">
	{#if filterOn && bookshelf.books != undefined}
		<div class="z-10 fixed self-center">
			<FilterPanel bind:show={filterOn} books={bookshelf.books} bind:booksShown={booksShown} bind:pageMin={pageMin} bind:pageMax={pageMax} bind:ratingSelect={ratingSelect} />
		</div>
	{/if}
	{#if sortOn && bookshelf.books != undefined}
		<div class="z-10 fixed self-center">
			<SortPanel bind:show={sortOn} books={bookshelf.books} bind:booksShown={booksShown} bind:sortOption={sortOption} />
		</div>
	{/if}
	{#if isDeleting}
		<Confirmation title={"Delete Bookshelf"} description={"Are you sure you want to delete this bookshelf? <br/>This can not be undone."} on:cancel={() => isDeleting = false} on:confirm={deleteBookshelf}/>
	{/if}
	{#if isEditing}
		<AddBookshelfPanel bind:show={isEditing} bind:bookshelf={bookshelf} />
	{/if}
</div>

<div class="mx-6 flex flex-row flex-wrap grow justify-items-center items-center">
	{#if booksShown != undefined && booksShown.length > 0}
		{#each booksShown as book}
			<BookCard on:click={() => goto(`/books/${book.id}`)} on:maybeRemoved={event => handleMaybeRemoved(event, book.id)} book={book} bookshelves={allBookshelves} />
		{/each}
	{:else}
	<h2 class=" ml-3 mt-5">No Books Found</h2>
	{/if}
</div>
