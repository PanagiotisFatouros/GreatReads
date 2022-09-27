<script lang="ts">
	import type { Review } from 'src/types/book.type';
	import StarRating from '../../StarRating.svelte';
	import VoteButtons from '../../VoteButtons.svelte';

	import { getTimeAgo } from '../../../scripts';

	export let review: Review;

	let diff = getTimeAgo(review.date);
</script>

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
				</div>
			</div>
		</div>

		<VoteButtons />
	</div>
	<p class="text-primary-3 pb-3">{review.comment}</p>
</div>
