<script lang="ts">
	//import type { Review } from 'src/types/book.type';
	import RatingInput from './../../RatingInput.svelte';
	import { page } from '$app/stores';
	import { getSession } from 'lucia-sveltekit/client';
	import type { Review } from '../../../types/book.type';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const session = getSession();
	const user_id = $session?.user.user_id;

	const bookId = $page.params.bookId;
	//console.log(bookId);
	const baseURL = $page.url.origin;

	let rating: number = 0;
	let title: string = '';
	let comment: string = '';

	export let review: Review | undefined;

	onMount(() => {
		if (review !== undefined) {
			rating = review.rating;
			title = review.title;
			comment = review.comment;
		}
	})

	// async function getBookInfo(){
	//     const response = await fetch(`${baseURL}/api/read/books/${bookId}/${client.user_id}`, )
	//     const responseJson = response.json()
	//     const bookData: Book = await responseJson
	// 	console.log(bookData)
	//     return bookData
	// }

	async function postReview() {
		if (rating != 0 && title != '' && comment != '') {
			const response = await fetch(`${baseURL}/api/create/review/${bookId}`, {
				method: 'POST',
				body: JSON.stringify({
					title: title,
					comment: comment,
					rating: rating,
					userId: user_id
				})
			});
			//bind response to userReview in ReviewsTab
			review = await response.json();

			//reset input
			rating = 0;
			title = '';
			comment = '';
		} else {
			alert(`missing required value`);
		}
	}

	async function updateReview() {
		if (review != undefined && rating != 0 && title != '' && comment != '') {
			
			//TODO: update review in database


			review.rating = rating;
			review.title = title;
			review.comment = comment;
			review.isEdited = true;

			//tell Reviews Tab to go back to displaying ReviewCard
			dispatch('cancel')
		}
	}
</script>

<div class=" flex flex-col space-y-2 text-body1 font-body">
	<RatingInput bind:rating />
	<input type="text" bind:value={title} class=" std_input" placeholder="Title..." />
	<textarea
		cols="30"
		rows="5"
		bind:value={comment}
		class=" std_text_area"
		placeholder="Write a review..."
	/>
	{#if review == undefined}
		<!-- new review -->
		<button on:click={postReview} class=" std_button self-end">Post</button>
	{:else}
		<!-- editting review -->
		<div class="self-end">
			<button on:click={() => dispatch('cancel')} class=" std_button bg-primary-1 text-primary-3">Cancel</button>
			<button on:click={updateReview} class=" std_button">Update</button>
		</div>
		
	{/if}
</div>
