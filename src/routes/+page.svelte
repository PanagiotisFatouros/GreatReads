<script lang="ts">
	//TODO: remove
	import { getSession } from 'lucia-sveltekit/client';
	import BooksDisplay from '../components/BooksDisplay.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { isOverlayOpen } from '../stores/OverlayStore';
	import type { Bookshelf, Client, Collection, Book } from '../types/book.type'
	import CollectionCard from '../components/CollectionCard.svelte';
	import MostPopular from '../components/MostPopular.svelte';

	isOverlayOpen.set(false)

	const session = getSession();

	if ($session) {
		console.log($session);
	} else {
		if (browser) {
			goto('/authentication/login');
		}
	}
	
	/** @type {import('./$types').PageData} */
	export let data;

	const favsBookshelf: Bookshelf = data.favsBookshelf;
	const readingBookshelf: Bookshelf = data.readingBookshelf;
	const collections: Collection[] = data.collections;
	const popularBooks: Book[] = data.popularBooks;

</script>

<div id="page">
	<div id="left">
		<div id="bookshelves">
			<div class="display">
				<BooksDisplay bookshelf={favsBookshelf}/>
			</div>
			<div class="display">
				<BooksDisplay bookshelf={readingBookshelf}/>
			</div>
		</div>
		<div id="notes">
			<h2 class="font-body font-body2 text-heading2">Recent Notes</h2>
			<hr class=" border-1 border-primary-3 my-3" />
			<div id="collections">
				{#each collections as collection}
					<CollectionCard collection={collection}/>
				{/each}
			</div>
		</div>
	</div>
	<div id="right">
		<MostPopular mostPopular={popularBooks}/>
	</div>
</div>

<style>
	#page {
		display: flex;
		justify-content: space-around;
		padding: 20px;
	}
	#left {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 70%;
	}

	#right {
		width: 25%;
	}

	.display {
		margin-bottom: 2%;
	}

	#bookshelves {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	#notes {
		width: 98%;
		align-self: center;
	}

	#collections {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}
</style>
