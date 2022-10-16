<script lang="ts">
	import type { Book } from '../types/book.type';
	import StarRating from './StarRating.svelte';
	import { goto } from '$app/navigation'

	export let book: Book;

	function getRating () {
	if (book.avgRating === undefined) {
		return 0;
	} else {
		return book.avgRating
	}
	}

	let stars = getRating();
</script>

<div id="card" on:click={() => goto(`/books/${book.id}`)} class='group cursor-pointer'>
	<div id="cover"><img src={book.imageURL} alt="" /></div>
	<div id="text" class=" group-hover:opacity-70">
		<p class="text-body1 text-secondary ">{book.title}</p>
		<p id="rating" class="text-primary-2 text-body2">
			<!--{book.avgRating}-->
			<StarRating rating={stars} showRating={true} isSmall={true} />
		</p>
		<p class="text-primary-3 text-body2">{book.authors}</p>
	</div>
</div>

<style>
	#card {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: auto;
	}

	#cover {
		width: 30%;
		height: auto;
		margin-right: 10px;
	}

	#text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow-y: auto;
		width: 60%;
	}

	#rating {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
</style>
