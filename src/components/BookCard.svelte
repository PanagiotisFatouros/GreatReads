<script lang="ts">
	import type { Book } from 'src/types/book.type';
	import StarRating from '../components/StarRating.svelte';

	export let book: Book;
</script>

<div on:click id="bookCard" class="bg-primary-1 w-96 h-52 m-4 p-2 pr-4 rounded-2xl cursor-pointer">
	
	<img src={book.imageURL} alt="Book" class="p-3 pr-4 w-34 max-h-48 float-left align-middle" />
	<p class="text-secondary pt-3 font-heading text-xl font-bold truncate">{book.title}</p>
	<p class="text-primary-3 font-body text-sm">{book.authors}</p>
	<div class="flex items-center mt-2">
		{#if book.avgRating != undefined}
		<StarRating rating={book.avgRating} />
		{/if}
		<p class="text-primary-3 ml-2 font-body text-sm">{book.numRatings} Reviews</p>
	</div>

	<p class="text-black font-body text-sm line-clamp-2 overflow-hidden">
		<span class="text-secondary">Genres: </span>{book.genres}
	</p>
	<button on:click|stopPropagation={() => {}} class="std_button bg-secondary w-32   font-body mt-3"
		>+ Save Book</button
	>
</div>
