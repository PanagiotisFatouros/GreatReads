<script lang="ts">
	import BookCard from '../../components/BookCard.svelte';
	import UserCard from '../../components/UserCard.svelte';
	import FilterPanel from '../../components/FilterPanel.svelte';
	import SortPanel from '../../components/SortPanel.svelte';
	import { isOverlayOpen } from '../../stores/OverlayStore.js';
	import type { Book, Client } from '../../types/book.type';
	import { goto } from '$app/navigation';
	import { searchTypes } from '../../types/searchTypes.enum';
	//import { handleFilter } from '../../components/FilterPanel.svelte';
    
    //let searchText = $page.params.searched ? $page.params.searched : ""
    //let searchText = decodeURI($page.url.pathname.substring(1))
	//$: console.log($page.url.search)
	

	/** @type {import('./$types').PageData} */
	export let data:any;

	let isBookSearch:boolean;

	$: {if (data.searchType == searchTypes.books 
	 || data.searchType == searchTypes.authors
	 || data.searchType == searchTypes.genres) {

		isBookSearch = true;
	}
	else if (data.searchType == searchTypes.users) {
		isBookSearch = false;
	}}

	// one will be empty list if searching for the other type
	let books: Book[];
	let users: Client[];

	// subset of books - based on filters applied
	let booksShown: Book[];

	books = data.books;
	users = data.users;
	booksShown = books;

	let searchTerm: string 
	$: searchTerm = data.searchString;

	let filterOn = false;
	let sortOn = false;
	$: isOverlayOpen.set(filterOn || sortOn);

	// store variables so values remain when opening panels again
	let pageMin: number;
	let pageMax: number;
	let ratingSelect: number;
	let sortOption: number;
</script>

{#if isBookSearch}
<div class="mt-6 mx-8">
	<div class="text-primary-3 text-heading2 font-heading">Search Results for "{searchTerm}"</div>
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
	</div>
</div>

<!-- filter and sort panels -->
<div class="flex flex-col justify-start w-full">
	{#if filterOn && $isOverlayOpen}
		<div class="z-10 fixed self-center">
			<FilterPanel bind:show={filterOn} books={books} bind:booksShown={booksShown} bind:pageMin={pageMin} bind:pageMax={pageMax} bind:ratingSelect={ratingSelect} />
		</div>
	{/if}
	{#if sortOn && $isOverlayOpen}
		<div class="z-10 fixed self-center">
			<SortPanel bind:show={sortOn} bind:booksShown={booksShown} bind:sortOption={sortOption} />
		</div>
	{/if}
</div>

<div class="mx-6 flex flex-row flex-wrap justify-start items-center">
	{#each booksShown as book}
		<BookCard on:click={() => goto(`/books/${book.id}`)} book={book}/>
	{/each}
</div>
{:else}
<div class="mt-6 mx-8">
	<div class="text-primary-3 text-heading2 font-heading">Search Results for "{searchTerm}"</div>
	<hr class=" border-1 border-primary-3 my-3" />
</div>

<div class="mx-6 flex flex-row flex-wrap grow justify-items-center items-center">
	{#each users as user}
		<UserCard />
	{/each}
</div>
{/if}
