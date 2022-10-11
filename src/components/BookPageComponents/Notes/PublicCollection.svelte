<script lang="ts">
	import type { Collection } from 'src/types/book.type';
	import VoteButtons from '../../VoteButtons.svelte';
	import { getTimeAgo } from '../../../scripts';
	import NoteCard from './NoteCard.svelte';

	//selected collection
	export let collection: Collection | null;

	let diff: string = '';

	if (collection != null) {
		diff = getTimeAgo(collection?.creationDate);
	}
</script>

<div>
	<div class="flex justify-between items-center">
		<div class="flex space-x-3 items-center">
			<button
				on:click={() => (collection = null)}
				class="flex items-center bg-white text-secondary pl-1 pr-3 rounded-3xl border-2 border-secondary hover:opacity-70"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
				</svg>
				<p>Back</p>
			</button>

			<div class="flex space-x-2 items-center">
				<div class="profile_pic_small">
					{#if collection?.user.profilePic != ''}
						<img src={collection?.user.profilePic} alt="profile pic" />
					{/if}
				</div>

				<div>
					<h2 class=" text-accent">{collection?.title}</h2>
					<p class=" text-body2">
						<span class=" text-primary-2">{collection?.user.name}</span> - {diff}
					</p>
				</div>
			</div>
		</div>

		<VoteButtons />
	</div>

	<!-- Note Cards -->
	<div class=" space-y-4 mt-3 mb-5">
		{#if collection != null && collection.notes != undefined}
			{#each collection.notes as note}
				<NoteCard {note} writtenByUser={false} />
			{/each}
		{/if}
	</div>
</div>
