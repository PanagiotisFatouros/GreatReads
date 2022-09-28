<script lang="ts">
	import ReviewInput from './ReviewInput.svelte';
	import ReviewCard from './ReviewCard.svelte';
	import type { Review } from '../../../types/book.type';
	import { getSession } from 'lucia-sveltekit/client';

	const session = getSession();
	const user_id = $session?.user.user_id;

	export let reviews: Review[];

	let userReview: Review | undefined;
	let otherReviews: Review[] = [];

	reviews.forEach((review) => {
		if (review.user?.id === user_id) {
			userReview = review;
		} else {
			otherReviews.push(review);
		}
	});

	function deleteUserReview() {
		//TODO: call deleteReview route
		console.log('deleting');

		userReview = undefined;
	}

	$: userReview;
</script>

<div class=" mt-3 w-full">
	{#if userReview === undefined}
		<ReviewInput bind:review={userReview} />
	{:else}
		<!-- TODO: not catching delete event for some reason -->
		<ReviewCard review={userReview} on:delete={deleteUserReview} />
	{/if}

	<hr class=" border-1 border-primary-3 my-3" />

	<div>
		{#each otherReviews as review}
			<!-- on:delete never occurs here but without it, it doesn't work above -->
			<ReviewCard {review} on:delete={deleteUserReview} />
		{/each}
	</div>
</div>
