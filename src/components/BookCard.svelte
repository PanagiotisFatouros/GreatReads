<script lang="ts">
	import type { Book, Bookshelf } from 'src/types/book.type';
	import StarRating from '../components/StarRating.svelte';
	import { isOverlayOpen } from '../stores/OverlayStore';
	import SaveToBookshelf from './BookPageComponents/SaveToBookshelf.svelte';

	export let book: Book;
	export let bookshelves: Bookshelf[];

	let isSavingBook: boolean = false
	function saveBook() {
		isSavingBook = true;
		isOverlayOpen.set(true)
	}

	$: {
		if ($isOverlayOpen == false) {
			isSavingBook = false;
		}
	}
</script>

{#if isSavingBook}
	<SaveToBookshelf on:maybeRemoved bookshelves={bookshelves} bind:savedBookshelfIDs={book.savedBookshelfIDs} bookId={book.id} bind:isShowing={isSavingBook} />
{/if}

<div on:click id="bookCard" class="bg-primary-1 w-96 h-52 m-4 p-2 pr-4 rounded-2xl cursor-pointer">
	
	<img src={book.imageURL} alt="Book" class="p-3 pr-4 w-34 max-h-48 float-left align-middle" />
	<p class="text-secondary pt-3 font-heading text-xl font-bold truncate">{book.title}</p>
	<p class="text-primary-3 font-body text-sm">{book.authors}</p>
	<div class="flex items-center mt-2">
		{#if book.avgRating != undefined}
			<StarRating bind:rating={book.avgRating} />
		{/if}
		<p class="text-primary-3 ml-2 font-body text-sm">{book.numRatings} Reviews</p>
	</div>

	<p class="mb-2 text-black font-body text-sm line-clamp-2 overflow-hidden">
		<span class="text-secondary">Genres: </span>{book.genres}
	</p>
	
	{#if book.savedBookshelfIDs == undefined || book.savedBookshelfIDs.length == 0}
		<button
			on:click|stopPropagation={saveBook}
			class=" bg-secondary rounded-3xl text-white text-body1 font-body px-4 py-1 btn"
			>+ Save Book</button
		>
	{:else}
		<button
			on:click|stopPropagation={saveBook}
			class=" bg-accent rounded-3xl text-white text-body1 font-body px-4 py-1 btn"
		>
			<div class='flex space-x-2'>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
				</svg>
				<p>Saved</p>
			</div>
		</button>
	{/if}
</div>
