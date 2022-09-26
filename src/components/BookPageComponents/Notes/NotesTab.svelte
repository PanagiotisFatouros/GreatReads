<script lang="ts">
	import NotesCollection from './NotesCollection.svelte';
	import type { Collection, Client } from 'src/types/book.type';
	import { getTimeAgo } from '../../../scripts';

	export let collections: Collection[];

	import { isOverlayOpen } from '../../../stores/OverlayStore.js';
	import { browser } from '$app/environment';
	let newCollectionTitle = '';
	let isPublic = false;
	let baseURL: string
	
	if (browser){
		baseURL = window.location.origin
	}

	function createNewCollection() {
		//TODO: check string is not empty and add to database
		// alert(`Title: ${newCollectionTitle}, isPublic: ${isPublic}`);

		//remove overlay
		isOverlayOpen.set(false);

		// TODO: get user from session
		let user: Client = {
			name: 'James Smith',
			id: "123",
			profilePic:
				'https://images.unsplash.com/photo-1546961329-78bef0414d7c?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw3MjAxN3wwfDF8c2VhcmNofDEwfHx1c2VyfGVufDB8fHx8MTY2MzYzMjU2NQ&ixlib=rb-1.2.1&q=80&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450',
			bio: ''
		};

		let newCollection: Collection = {
			//TODO: get actual id from database
			id: Math.floor(Math.random() * 1000),
			title: newCollectionTitle,
			creationDate: new Date(),
			isPublic: isPublic,
			upvotes: 0,
			user: user,
			notes: []
		};

		collections.push(newCollection);
		//trigger refresh
		collections = collections;

		//reset
		newCollectionTitle = '';
		isPublic = false;
	}

	let selectedCollection: Collection | null = null;

	function deleteCollection() {
		if (selectedCollection != null) {
			let deletedCollection: Collection = selectedCollection;

			collections = collections.filter((c) => c.id !== deletedCollection!.id);
			selectedCollection = null;

			//TODO: remove deletedCollection from database
		}
	}

	async function getCollection(collectionId: number){
        const response = await fetch(`${baseURL}/api/read/collections/${JSON.stringify(collectionId)}`, )
        const responseJson = response.json()
        const collectionData: Collection = await responseJson
        return collectionData
    }


	$: collections;
</script>

<div class="flex flex-col justify-start w-full">
	<!-- TODO: maybe move to new component -->
	<!-- show form to create new collection -->
	{#if $isOverlayOpen && selectedCollection == null}
		<form
			on:submit={createNewCollection}
			class=" bg-white fixed z-10 self-center w-96 flex flex-col p-3 rounded-2xl"
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
			{#each collections as collection}
				<div
				on:click={() => getCollection(collection.id).then((returnedCollection) => selectedCollection = returnedCollection)}
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
		</div>
	{/if}
</div>
