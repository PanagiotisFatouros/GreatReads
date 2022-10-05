<script lang="ts">
	import NotesCollection from './NotesCollection.svelte';
	import type { Collection } from 'src/types/book.type';
	import { getTimeAgo } from '../../../scripts';

	export let collections: Collection[];

	import { isOverlayOpen } from '../../../stores/OverlayStore.js';
	import { page } from '$app/stores';
	import { getSession } from 'lucia-sveltekit/client';

	const session = getSession();
	const user_id = $session?.user.user_id;

	const bookId = $page.params.bookId;
	const baseURL: string = $page.url.origin;

	let newCollectionTitle = '';
	let isPublic = false;

	async function createNewCollection() {
		//TODO: check string is not empty and add to database
		// alert(`Title: ${newCollectionTitle}, isPublic: ${isPublic}`);

		//remove overlay
		isOverlayOpen.set(false);

		const response = await fetch(`${baseURL}/api/create/collection/${bookId}`, {
			method: 'POST',
			body: JSON.stringify({
				title: newCollectionTitle,
				userId: user_id,
				isPublic: isPublic
			})
		});

		//reset
		newCollectionTitle = '';
		isPublic = false;

		const newCollection: Collection = await response.json();
		console.log(newCollection);

		collections.push(newCollection);
		//trigger refresh
		collections = collections;
	}

	let selectedCollection: Collection | null = null;

	async function deleteCollection() {
		if (selectedCollection != null) {

			const response = await fetch(`${baseURL}/api/delete/collection/${selectedCollection.id}`, {
					method: 'DELETE'
			});
			
			let deletedCollection:Collection = await response.json();
			
			if (deletedCollection != undefined) {
				//successful
				collections = collections.filter((c) => c.id !== selectedCollection!.id);
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

	$: collections;
</script>

<div class="flex flex-col justify-start w-full mb-5">
	<!-- TODO: maybe move to new component -->
	<!-- show form to create new collection -->
	{#if $isOverlayOpen && selectedCollection == null}
		<form
			on:submit={createNewCollection}
			class=" bg-white fixed z-10 top-1/2 left-1/2 w-96 flex flex-col p-3 rounded-2xl"
			id="collectionForm"
		>
			<h2 class=" text-secondary">New Notes Collection</h2>

			<input
				bind:value={newCollectionTitle}
				type="text"
				placeholder="Title..."
				class=" standard_input my-2"
			/>

			<div class="flex justify-between text-body2 space-x-2 mt-1 w-full items-center">
				<!-- TODO: replace with Flowbite toggle - wasn't working -->
				<div class="flex items-center space-x-3 ml-1">
					<label for="publicCheckbox" class="text-body1 font-body">Make Public</label>
					<input
						type="checkbox"
						id="publicCheckbox"
						bind:checked={isPublic}
						class=" text-accent rounded-sm"
					/>
				</div>

				<div class="">
					<button
						on:click={() => isOverlayOpen.set(false)}
						class=" btn bg-primary-1 rounded-full px-2"><p>Cancel</p></button
					>
					<button type="submit" class="btn bg-accent text-white rounded-full px-2"
						><p>Create</p></button
					>
				</div>
			</div>
		</form>
	{:else if selectedCollection != null}
		<!-- show selected collection -->
		<NotesCollection bind:collection={selectedCollection} on:delete={deleteCollection} />
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
			{#if collections.length == 0}
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

<style>
	#collectionForm {
		transform: translate(-50%, -50%);
	}
</style>
