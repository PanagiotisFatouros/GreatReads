<script lang="ts">
	import BookCard from '../../components/BookCard.svelte';
	import FilterPanel from '../../components/FilterPanel.svelte';
	import SortPanel from '../../components/SortPanel.svelte';
	import { isOverlayOpen } from '../../stores/OverlayStore.js';
	import type { Book } from '../../types/book.type';
	import {page} from '$app/stores';
	import { goto } from '$app/navigation';
    
    //let searchText = $page.params.searched ? $page.params.searched : ""
    //let searchText = decodeURI($page.url.pathname.substring(1))
	console.log($page.url.search)

	//TODO: not reloading when search text changes

	/** @type {import('./$types').PageData} */
	export let data;
	console.log(data);



	let searchTerm: string = '';
	let book: Book = {
		id: 'zyTCAlFPjgYC',
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
	let filter = false;
	let sort = false;
	$: isOverlayOpen.set(filter || sort);
</script>

<div class="mt-6 mx-8">
	<div class="text-primary-3 text-heading2 font-heading">Search Results for "{searchTerm}"</div>
	<hr class=" border-1 border-primary-3 my-3" />
	<div class="text-primary-3 text-heading3 font-heading flex">
		<!-- filter button -->
		<div style="cursor:pointer" on:click={() => (filter = true)} class="flex">
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
		<div style="cursor:pointer" on:click={() => (sort = true)} class="flex">
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
	</div>
</div>

<!-- filter and sort panels -->
<div class="flex flex-col justify-start w-full">
	{#if filter}
		<div class="z-10 fixed self-center">
			<FilterPanel bind:show={filter} />
		</div>
	{/if}
	{#if sort}
		<div class="z-10 fixed self-center">
			<SortPanel bind:show={sort} />
		</div>
	{/if}
</div>

<div class="mx-6 flex flex-row flex-wrap justify-start items-center">
	{#each books as book}
		<BookCard on:click={() => goto(`/books/${book.id}`)} book={book}/>
	{/each}
</div>
