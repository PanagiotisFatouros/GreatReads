<script lang="ts">
	import { getTimeAgo } from '../../../lib/scripts';
	import type { Collection } from 'src/types/book.type';
	import SearchBar from '../../SearchBar.svelte';
	import VoteButtons from '../../VoteButtons.svelte';
	import PublicCollection from './PublicCollection.svelte';
	import { getNoteText } from '../../../lib/scripts';

	import { page } from '$app/stores';

	const baseURL: string = $page.url.origin;

	export let collections: Collection[] | undefined;

	// console.log(collections)

	let filteredCollections: Collection[] | undefined = collections;
	let searchText: string = '';

	// runs every time searchText changes
	$: filteredCollections =
		collections != undefined
			? collections.filter((collection) => {
					let titleCheck: boolean = collection.title
						.toLocaleLowerCase()
						.startsWith(searchText.toLocaleLowerCase());
					let authorCheck: boolean = collection.user
						? collection.user.name.toLocaleLowerCase().startsWith(searchText.toLocaleLowerCase())
						: false;

					return titleCheck || authorCheck;
			  })
			: [];

	let selectedCollection: Collection | null = null;

	async function getCollectionNotes(collection: Collection) {
		// TODO: maybe activate check
		//if (collection.notes === undefined) {
		const response = await fetch(`${baseURL}/api/read/collections/${collection.id}`);
		console.log(response.body);
		const returnedCollection: Collection = await response.json();
		console.log(returnedCollection);

		//replace collection with one that has its notes loaded
		collection.notes = returnedCollection.notes;
		//}

		selectedCollection = collection;
	}

	async function handleVoteChange(event: any, collectionId: number) {
		// console.log(event.detail.change)

		const voteChange = event.detail.change;

		await fetch(`${baseURL}/api/update/collection/vote`, {
			method: 'PUT',
			body: JSON.stringify({
				id: collectionId,
				voteChange: voteChange
			})
		});
		console.log(collectionId);
		let collection: Collection | undefined = collections?.find((c) => c.id == collectionId);
		console.log(collection);

		if (collection) {
			collection.upvotes += voteChange;
		}
	}
</script>

<div class="flex flex-col w-full mt-4">
	{#if selectedCollection != null}
		<PublicCollection bind:collection={selectedCollection} />
	{:else}
		<!-- header -->
		<div class="flex justify-between">
			<h2 class=" text-accent mr-3">Collections</h2>

			<!-- don't need to handle on:click since search happens automatically -->
			<SearchBar bind:searchText placeholder="Search by title or author..." />
		</div>

		<div class="flex flex-col space-y-0">
			{#if filteredCollections == undefined || filteredCollections.length == 0}
				<p class="mt-5 mx-auto">No Collections Found</p>
			{:else}
				{#each filteredCollections as collection}
					<div
						on:click={() => getCollectionNotes(collection)}
						class=" bg-primary-1 my-4 rounded-3xl pl-2 pr-1 py-2 flex items-center cursor-pointer hover:bg-opacity-70"
					>
						<VoteButtons
							voteCount={collection.upvotes}
							on:change={(e) => handleVoteChange(e, collection.id)}
						/>

						<div class="flex ml-3 space-x-3 items-center">
							<div class="profile_pic_small">
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
								<p class="text-secondary">{collection.title}</p>

								<div class="flex items-center">
									{#if collection.user}
										<p class=" text-primary-2 mr-1">{collection.user.name}</p>
									{/if}

									{#if collection.numNotes != undefined}
										<p class="text-body2 mr-1">
											- {collection.numNotes | 0}
											{getNoteText(collection.numNotes | 0)},
										</p>
									{/if}

									{#if collection.lastUpdateDate}
										<p class="text-body2">Updated {getTimeAgo(collection.lastUpdateDate)}</p>
									{:else}
										<p class="text-body2">Created {getTimeAgo(collection.creationDate)}</p>
									{/if}
								</div>
							</div>
						</div>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6 text-secondary ml-auto"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
						</svg>
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</div>
