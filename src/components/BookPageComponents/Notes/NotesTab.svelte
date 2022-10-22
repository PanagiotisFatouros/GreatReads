<script lang="ts">
	import NotesCollection from './NotesCollection.svelte';
	import type { Collection } from 'src/types/book.type';
	import { getTimeAgo } from '../../../scripts';
	import { createEventDispatcher } from 'svelte';

	export let collections: Collection[] | undefined;

	import { isOverlayOpen } from '../../../stores/OverlayStore.js';
	import { page } from '$app/stores';
	import CollectionInput from './CollectionInput.svelte';

	const baseURL: string = $page.url.origin;

	const dispatch = createEventDispatcher();

	let newCollection: Collection | undefined = undefined;
	let selectedCollection: Collection | null = null;

	async function deleteCollection() {
		if (selectedCollection != null) {

			const response = await fetch(`${baseURL}/api/delete/collection/${selectedCollection.id}`, {
					method: 'DELETE'
			});
			
			let deletedCollection:Collection = await response.json();
			
			if (deletedCollection != undefined && collections != undefined) {
				//successful
				collections = collections.filter((c) => c.id !== selectedCollection!.id);
				
				dispatch('delete', {
					collection: selectedCollection
				})
				selectedCollection = null;

			}
			else {
				alert("Something went wrong. Collection not deleted");
			}
		}
	}

	async function getCollectionNotes(collection: Collection) {
		if (collection.notes === undefined) {
			const response = await fetch(`${baseURL}/api/read/collections/${collection.id}`);
			console.log(response.body);
			const returnedCollection: Collection = await response.json();
			console.log(returnedCollection);

			//replace collection with one that has its notes loaded
			collection.notes = returnedCollection.notes;
		}

		selectedCollection = collection;
	}

	function displayNewCollection() {
		if (newCollection != undefined && collections != undefined) {
			collections.push(newCollection);
			
			//trigger refresh
			collections = collections;

			if (newCollection.isPublic) {
				dispatch('newPublicCollection', {
					collection: newCollection
				})
			}

			newCollection = undefined;
		}
	}

	$: collections;
</script>

<div class="flex flex-col justify-start w-full mb-5">
	<!-- TODO: maybe move to new component -->
	<!-- show form to create new collection -->
	{#if $isOverlayOpen && selectedCollection == null}
		<CollectionInput bind:collection={newCollection} on:newCollection={displayNewCollection}/>

	{:else if selectedCollection != null}
		<!-- show selected collection -->
		<NotesCollection bind:collection={selectedCollection} on:delete={deleteCollection} on:update />

	{:else}
		<!-- show list of collections -->
		<div class=" mt-3 flex">
			<h2 class=" text-accent mr-3">Collections</h2>
			<button
				on:click={() => isOverlayOpen.set(true)}
				class="btn rounded-full w-6 h-6 text-white bg-accent self-center"
				><p class=" text-xl leading-none">+</p></button
			>
		</div>

		<div class="flex flex-col mt-1">
			{#if collections == undefined || collections.length == 0}
				<p class="mt-3">No Collections Found</p>
			{:else}
				{#each collections as collection}
					<div
						on:click={() => getCollectionNotes(collection)}
						class=" bg-primary-1 my-2 rounded-2xl pl-2 pr-1 py-1 flex justify-between items-center cursor-pointer hover:opacity-70"
					>
						<div>
							<p class="text-secondary">{collection.title}</p>
							<!-- TODO: maybe change to last edited -->
							<p class="text-body2">Created {getTimeAgo(collection.creationDate)}</p>
						</div>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6 text-secondary"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
						</svg>
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</div>

