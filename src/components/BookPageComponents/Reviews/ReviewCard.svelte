<script lang="ts">
	import type { Review } from 'src/types/book.type';
	import StarRating from '../../StarRating.svelte';
	import VoteButtons from '../../VoteButtons.svelte';
	import { isOverlayOpen } from '../../../stores/OverlayStore.js';
	import Confirmation from '../../Confirmation.svelte';
	import { createEventDispatcher } from 'svelte';

	import { getTimeAgo } from '../../../scripts';
	import { getSession } from 'lucia-sveltekit/client';

	const dispatch = createEventDispatcher();

	const session = getSession();
	const user_id = $session?.user.user_id;

	export let review: Review;
	const writtenByUser = review.user?.id === user_id;

	let diff = getTimeAgo(review.date);

	function showDeleteReviewConfirmation() {
		isOverlayOpen.set(true);
	}

	function cancelDeleteReview() {
		isOverlayOpen.set(false);
	}

	function deleteReview() {
		isOverlayOpen.set(false);
		console.log('dispatching delete');

		dispatch('delete');
	}
</script>

{#if $isOverlayOpen}
	<Confirmation
		title="Delete Review"
		description="Are you sure you want to delete this review? <br/>This can not be undone."
		on:cancel={cancelDeleteReview}
		on:confirm={deleteReview}
	/>
{/if}

<div class="bg-primary-1 rounded-lg my-3 px-3">
	<div class="flex justify-between items-center py-2">
		<div class="flex items-center space-x-3">
			<div class=" profile_pic_small">
				{#if review.user != undefined && review.user.profilePic != ''}
					<img src={review.user.profilePic} alt="user profile pic" />
				{/if}
			</div>

			<div class="flex flex-col justify-start">
				<div class="flex items-center text-secondary space-x-2">
					<h2 id="title">{review.title}</h2>
					<StarRating rating={review.rating} showRating={false} />
				</div>
				<div class="flex items-center space-x-1">
					{#if review.user != undefined}
						<p class=" text-primary-2">{review.user.name}</p>
					{/if}
					
					<p class="text-primary-3 text-body2 font-body">- {diff}</p>
					
					{#if review.isEdited == true}
					<p class='text-primary-3 text-body2 ml-1'>| edited</p>
					{/if}
				</div>
			</div>
		</div>

		{#if writtenByUser}
			<div>
				<button on:click={() => dispatch('edit')} class='hover:opacity-70'>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-accent">
						<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
					  </svg>
					  
				</button>
				<button on:click={showDeleteReviewConfirmation} class=" ml-3 hover:opacity-70">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6 text-accent"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
						/>
					</svg>
				</button>
			</div>
			
		{:else}
			<VoteButtons />
		{/if}
	</div>
	<p class="text-primary-3 pb-3">{review.comment}</p>
</div>
