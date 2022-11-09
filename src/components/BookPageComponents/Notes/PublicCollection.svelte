<script lang="ts">
	import type { Collection } from 'src/types/book.type';
	import VoteButtons from '../../VoteButtons.svelte';
	import { getTimeAgo } from '../../../lib/scripts';
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
				<div class="profile_pic_small bg-white">
					{#if collection?.user?.profilePic != 'default'}
						<img src={collection?.user?.profilePic} alt="profile pic" />
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="w-full h-full text-primary-3"
						>
							<path
								fill-rule="evenodd"
								d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
								clip-rule="evenodd"
							/>
						</svg>
					{/if}
				</div>

				<div>
					<h2 class=" text-accent">{collection?.title}</h2>
					<p class=" text-body2">
						<span class=" text-primary-2">{collection?.user?.name}</span> - {diff}
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
