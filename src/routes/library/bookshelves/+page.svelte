<script lang="ts">
	import SearchBarMini from '../../../components/SearchBarMini.svelte';
	import BookshelfCard from '../../../components/BookshelfCard.svelte';
	import AddBookshelfPanel from '../../../components/AddBookshelfPanel.svelte';
	import { isOverlayOpen } from '../../../stores/OverlayStore.js';
	import type { Bookshelf } from 'src/types/book.type';
	import {goto} from '$app/navigation'
	

	let addBookshelf = false;

	/** @type {import('./$types').PageData} */
	export let data;

	let bookshelves:Bookshelf[] = data.bookshelves;

	// console.log(bookshelves)

	function addBookshelfLocally(event:any) {
		
		bookshelves.push(event.detail.bookshelf);

		bookshelves = bookshelves
	}
	
	$: isOverlayOpen.set(addBookshelf);
	$: bookshelves
	$: {
		if ($isOverlayOpen == false) {
			addBookshelf = false;
		}
	}
</script>

<div class="mt-6 mx-8">
	<div class="text-primary-3 text-heading2 font-heading flex items-center">
		<button on:click={() => goto('/library')}>
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
		
		Bookshelves
	</div>
	<hr class=" border-1 border-primary-3 my-3" />
	<div class="mb-3 flex">
		<SearchBarMini />
		<!-- add bookshelf button -->
		<div class="flex justify-center">
			<button
				href="null"
				on:click={() => (addBookshelf = true)}
				class="bg-secondary w-44 h-7 rounded-full mx-3 text-white text-center font-body"
				>+ Add Bookshelf</button
			>
		</div>
	</div>

	<div class="flex flex-row flex-wrap grow justify-items-center items-center">
		{#each bookshelves as bookshelf}
			<BookshelfCard bookshelf={bookshelf}/>
		{/each}
	</div>
</div>

<!-- TODO: close panel when click outside -->
{#if addBookshelf}
	<div class="flex flex-col justify-start w-full">
		<div class="z-20 fixed top-1/2 left-1/2" id="addBookshelf">
			<AddBookshelfPanel bind:show={addBookshelf} on:newBookshelf={addBookshelfLocally} />
		</div>
	</div>
{/if}

<style>
	#addBookshelf {
		transform: translate(-50%, -50%);
	}
</style>
