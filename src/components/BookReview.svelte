<script lang="ts">
	import type { Review } from 'src/types/book.type';
	import StarRating from './StarRating.svelte';
	import { getTimeAgo } from '../scripts';

	export let review: Review;
	export let displayText: boolean;

	let diff = getTimeAgo(review.date);
</script>

<div id="{displayText ? 'displayAll' : 'review'}" class="flex p-4 bg-primary-1 rounded-2xl w-full">
	<div id="cover"><img src={review.img} alt="" /></div>
	<div id="text">
		<div class="flex items-center text-secondary">
			<h2 id="title">{review.title}</h2>
			<StarRating rating={review.rating} showRating={false} />
		</div>
		<p class="text-primary-3 text-body2 font-body">{diff}</p>
		{#if (displayText == true)}
			<p id="allText" class="text-primary-3">{review.comment}</p>
		{:else}
			<p id="comment" class="text-primary-3">{review.comment}</p>
		{/if}
	</div>
</div>

<style>
	/* TODO: add button to expand review when clicked */
	/* #review {
		display: flex;

		width: 98%;
		height: 31%;

		border-radius: 10px;
		margin-bottom: 10px;
		padding: 8px;
		margin-left: 10px;

	} */
	#title {
		margin-right: 10px;
	}

	#text {
		/* margin: auto; */
		margin-left: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: start;
		width: 90%;
		padding-bottom: 10px;
		overflow-y: auto;
	}

	#comment {
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 6;
		-webkit-box-orient: vertical;
	}

	#cover {
		height: 100%;
		align-self: center;
	}

	img {
		height: 100%;
		width: auto;
	}
</style>
