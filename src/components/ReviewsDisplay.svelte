<script lang="ts">
	import type { Review } from '../types/book.type';
	import BookReview from './BookReview.svelte';

	export let name: string;
	export let reviews: Review[];
	export let clientID: string;
</script>

<div id="card" class="bg-primary-3 shadow-xl">
	<div id="header" class="bg-accent">
		<h2 class=" self-center ml-3">
			{name}'s Reviews
		</h2>
		<span id="header-right">
			<a href="/profile/{clientID}/reviews"><p>See all</p></a>
			<a href="/profile/{clientID}/reviews">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
				</svg>
			</a>
		</span>
	</div>
	<div id="reviews-container" class=" flex flex-col justify-start items-center ">
		{#each reviews.sort(function (a, b) {
			return a.upvotes < b.upvotes ? 1 : -1;
		}) as review}
			<BookReview {review} displayText={false} />
		{/each}
	</div>
</div>

<style>
	#card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
		height: 55vh;
		border-radius: 10px;
		margin-top: 3vh;
		box-shadow: 5px 5px 5px gray;
	}

	#header {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 8%;
		border-radius: 10px 10px 0 0;
		color: white;
		font-weight: 300;
	}

	#header-right {
		display: flex;
		align-self: center;
		font-weight: 200;
	}

	#reviews-container {
		/* display: flex;
		justify-content: flex-start;
		flex-direction: column;
		align-items: center; */
		height: 92%;
		padding-top: 10px;
		padding-bottom: 5px;
	}
</style>
