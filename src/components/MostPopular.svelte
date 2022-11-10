<script lang="ts">
	import type { Book } from '../types/book.type';
	import AbbreviatedBookCard from './AbbreviatedBookCard.svelte';

	export let mostPopular: Book[];

	// console.log(mostPopular);
</script>

<div>
	<div id="head" class="font-body text-body">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="rgb(255, 102, 99)"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
			/>
		</svg>
		<p>What's Popular</p>
		<!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgb(21, 176, 151)" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg> -->
	</div>
	<hr class=" border-1 border-primary-3 my-3" />
	<div id="book-container">
		{#each mostPopular as book, i}
			<div id="book" class="group">
				<p id="rank" class="text-heading1 font-heading text-secondary group-hover:opacity-70">
					{i + 1}
				</p>
				<AbbreviatedBookCard {book} />
			</div>
		{/each}
	</div>
</div>

<style>
	#head {
		display: flex;
		justify-content: flex-start;
	}
	#head > * {
		margin-right: 5%;
	}
	#book {
		display: flex;
		align-items: center;
	}
	#book-container {
		display: flex;
		flex-direction: column;
		width: 80%;
	}
	#book-container > * {
		margin-bottom: 5%;
	}
	#rank {
		margin-right: 5%;
	}
</style>
