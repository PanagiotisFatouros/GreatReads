<script lang="ts">
	import StarRating from '../../../components/StarRating.svelte';
	import BookPageContent from '../../../components/BookPageComponents/BookPageContent.svelte';
	import AbbreviatedBookCard from '../../../components/AbbreviatedBookCard.svelte';
	import SaveToBookshelf from '../../../components/BookPageComponents/SaveToBookshelf.svelte';
	import { isOverlayOpen } from '../../../stores/OverlayStore';
	import { getSession } from 'lucia-sveltekit/client';

	const session = getSession();

	import type { Book, Bookshelf } from '../../../types/book.type';
	// import { getSession } from 'lucia-sveltekit/client'
	// import { browser } from '$app/environment';

	/** @type {import('./$types').PageData} */
	export let data;

	let book: Book = data.book;
	let bookshelves: Bookshelf[] = data.bookshelves;
	let similarBooks: Book[] = data.similarBooks;

	let isSavingBook: boolean = false;
	function saveBook() {
		isSavingBook = true;
		isOverlayOpen.set(true);
	}

	function convertToString(val: any) {
		if (Array.isArray(val) && val.every((i) => typeof i === 'string')) {
			return val.join(', ');
		}
		return '';
	}

	$: {
		if ($isOverlayOpen == false) {
			isSavingBook = false;
		}
	}
</script>

{#if isSavingBook}
	<SaveToBookshelf
		{bookshelves}
		bind:savedBookshelfIDs={book.savedBookshelfIDs}
		bookId={book.id}
		bind:isShowing={isSavingBook}
	/>
{/if}

<div class=" grid grid-cols-10 text-body1 font-body text-primary-3 mt-1">
	<!-- left column - cover image and info -->
	<div class=" col-span-3 flex justify-center items-center flex-col self-start">
		<div class=" h-coverHeight w-coverWidth my-5">
			<img src={book.imageURL} alt="book cover" class=" w-full h-full object-contain" />
		</div>

		{#if $session && (book.savedBookshelfIDs == undefined || book.savedBookshelfIDs.length == 0)}
			<button
				on:click={saveBook}
				class=" bg-secondary rounded-3xl text-white text-body1 font-body px-4 py-1 btn"
				>+ Save Book</button
			>
		{:else if $session}
			<button
				on:click={saveBook}
				class=" bg-accent rounded-3xl text-white text-body1 font-body px-4 py-1 btn"
			>
				<div class="flex space-x-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
					</svg>
					<p>Saved</p>
				</div>
			</button>
		{/if}

		<ul class=" mt-5 space-y-1 font-body text-body1 ml-14 mr-9">
			<li><p><span class=" text-secondary">Published: </span>{book.datePublished}</p></li>
			<li>
				<p><span class=" text-secondary">Genres: </span></p>
				<div class="flex flex-col ml-3">
					{#each book.genres as genre}
						<a class="hover:underline" href="/search?Genres={genre}">- {genre}</a>
					{/each}
				</div>
			</li>
			<li><p><span class=" text-secondary">Number of Pages: </span>{book.pageCount}</p></li>
			<li><p><span class=" text-secondary">ISBN: </span>{book.isbn}</p></li>
		</ul>
	</div>

	<!-- middle column - book overview and reviews/notes -->
	<div class=" col-span-5 mt-5 mr-3">
		<div class="flex justify-start items-center flex-wrap">
			<h1 class=" text-heading1 font-heading text-secondary mr-5">{book.title}</h1>
			{#if book.avgRating != undefined}
				<StarRating rating={book.avgRating} />
			{/if}
			<p class=" text-body2 ml-4">{book.numRatings} Reviews</p>
		</div>

		<h2 class=" text-heading2 font-heading">{convertToString(book.authors)}</h2>
		<p class="mt-3 mb-5">{@html book.description}</p>

		<BookPageContent {book} />
	</div>

	<!-- right column - similar books -->
	<div class=" col-span-2 bg-primary-1 rounded-3xl m-4 py-2 px-3">
		<h2 class=" text-heading2 font-heading">Similar Books</h2>
		<hr class=" border-1 border-primary-3" />

		<div class=" space-y-3 mt-3">
			{#each similarBooks && similarBooks.length >= 8 ? similarBooks.slice(0, 8) : similarBooks as book}
				<AbbreviatedBookCard {book} />
			{/each}
		</div>
	</div>
</div>

<!-- {/await} -->
