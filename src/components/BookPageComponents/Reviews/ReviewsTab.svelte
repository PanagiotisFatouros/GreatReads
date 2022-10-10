<script lang="ts">
	import ReviewInput from './ReviewInput.svelte';
	import ReviewCard from './ReviewCard.svelte';
	import type { Review } from '../../../types/book.type';
	import { getSession } from 'lucia-sveltekit/client';
	import { page } from '$app/stores';

	const session = getSession();
	const user_id = $session?.user.user_id;

	const baseURL = $page.url.origin;

	export let reviews: Review[] | undefined;

	let userReview: Review | undefined;
	let otherReviews: Review[] = [];

	if (reviews != undefined) {
		reviews.forEach((review) => {
			if (review.user?.id === user_id) {
				userReview = review;
			} else {
				otherReviews.push(review);
			}
		});
	}
	

	async function deleteUserReview() {
		if (userReview != undefined) {
			//TODO: call deleteReview route
			const response = await fetch(`${baseURL}/api/delete/review/${userReview.id}`, {
					method: 'DELETE'
			});
			let deletedReview: Review = await response.json();
			if (deletedReview != undefined) {
				//successful
				userReview = undefined;
			}
			else {
				alert("Something went wrong. Review not deleted");
			}
		}
	}

	let edittingReview:boolean = false;

	function handleEdit() {
		edittingReview = true;
	}

	$: userReview;
</script>

<div class=" mt-3 w-full">
	{#if userReview === undefined || edittingReview}
		<ReviewInput bind:review={userReview} on:cancel={() => edittingReview = false}/>
	{:else}
		<!-- TODO: not catching delete event for some reason -->
		<ReviewCard review={userReview} on:delete={deleteUserReview} on:edit={handleEdit} />
	{/if}

	<hr class=" border-1 border-primary-3 my-3" />

	<div>
		{#each otherReviews as review}
			<!-- on:delete never occurs here but without it, it doesn't work above -->
			<ReviewCard {review} on:delete={deleteUserReview} on:edit={handleEdit} />
		{/each}
	</div>
</div>
