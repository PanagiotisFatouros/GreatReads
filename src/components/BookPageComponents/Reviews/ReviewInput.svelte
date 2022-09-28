<script lang="ts">
	//import type { Review } from 'src/types/book.type';
	import RatingInput from './../../RatingInput.svelte';
	import { page } from '$app/stores';
	import { getSession } from 'lucia-sveltekit/client';
	import type { Review } from '../../../types/book.type';

	const session = getSession();
	const user_id = $session?.user.user_id;

	const bookId = $page.params.bookId;
	//console.log(bookId);
	const baseURL = $page.url.origin;

	let rating: number = 0;
	let title: string = '';
	let comment: string = '';

	export let review: Review | undefined;

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
			review = await response.json();

			//reset input
			rating = 0;
			title = '';
			comment = '';
		} else {
			alert(`missing required value`);
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

	<button on:click={postReview} class=" std_button self-end">Post</button>
</div>
