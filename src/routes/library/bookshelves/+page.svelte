<script lang="ts">
	import SearchBarMini from '../../../components/SearchBarMini.svelte';
	import BookshelfCard from '../../../components/BookshelfCard.svelte';
	import AddBookshelfPanel from '../../../components/AddBookshelfPanel.svelte';
	import { isOverlayOpen } from '../../../stores/OverlayStore.js';
	import type { Bookshelf, Book } from 'src/types/book.type';


	let addBookshelf = false;

	let book: Book = {
		id: '123',
		title: 'The Hunger Games',
		authors: ['Suzanne Collins'],
		pageCount: 384,
		avgRating: 4.3,
		numRatings: 35,
		description:
			'The Hunger Games is a 2008 dystopian novel by the American writer Suzanne Collins. It is written in the perspective of 16-year-old Katniss Everdeen, who lives in the future, post-apocalyptic nation of Panem in North America.',
		reviews: [],
		genres: ['Dystopian', 'science fiction', 'drama', 'action'],
		isbn: '9780440335702',
		datePublished: '1st December 2011',
		imageURL:
			'http://books.google.com/books/content?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71m9nvyzo1NJxodp6cD1grRr1hk7wGgHSNBRhJkMVVz0-VmnqgHo5KemZGD3W7N5JHue3ZyfQ7q6TxUuzN9AIg8BVj9sibBrgsRF2TbgRojWCr7sxR0rWh2Cydv2lRG4Ppg12p_&source=gbs_api',
		userNotes: [],
		publicNotes: []
	};
	let books = [book, book, book, book, book, book, book];

	let bookshelf: Bookshelf = {
		id: 123,
		name: "Favourites",
		isDeletable: false,
		creationDate: new Date(),
		user:  {bio: "",
				favAuthor: "",
				favGenre: "",
				id: "4bAKz93G",
				name: "lucas",
				profilePic: ""},
		books: books
	}
	
	export let bookshelves: Bookshelf[] = [bookshelf, bookshelf, bookshelf, bookshelf];
	
	$: isOverlayOpen.set(addBookshelf);
</script>

<div class="mt-6 mx-8">
	<div class="text-primary-3 text-heading2 font-heading flex items-center">
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
	<AddBookshelfPanel bind:show={addBookshelf} />
{/if}
