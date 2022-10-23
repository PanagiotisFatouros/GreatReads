<script lang="ts">
	import type { Book } from '../../types/book.type';
	import { Tabs } from '../../types/bookPageTabs.enum';
	import BookTabSelection from './BookTabSelection.svelte';

	import ReviewsTab from './Reviews/ReviewsTab.svelte';
	import NotesTab from './Notes/NotesTab.svelte';
	import PublicNotesTab from './Notes/PublicNotesTab.svelte';
	import { onMount } from 'svelte';

	export let book: Book;

	// TODO: changed based on if book is already saved or not
	let selectedTab: Tabs = Tabs.reviews;

	onMount(() => {
		if (book.userNotes != undefined && book.userNotes != undefined) {
			book.userNotes.forEach(collection => {
				if (collection.isPublic) {
					//remove duplicate object
					book.publicNotes?.splice(book.publicNotes.findIndex(publicCollection => collection.id == publicCollection.id), 1);

					//replace with original object so both are updated when changed
					book.publicNotes?.push(collection);
				}
			})
		}
	})

	

	function addToPublicCollections(event:any) {
		book.publicNotes?.push(event.detail.collection);
	}

	function updateCollection(event:any) {
		let collection = event.detail.collection;

		if (collection.isPublic) {
			//check if already in public collecions, add if not
			let index = book.publicNotes?.findIndex(publicCollection => collection.id == publicCollection.id);

			if (index == -1) {
				book.publicNotes?.push(collection);
			}
		}
		else {
			//check if in public collection, remove if it is
			let index = book.publicNotes?.findIndex(publicCollection => collection.id == publicCollection.id);

			if (index != undefined && index != -1) {
				book.publicNotes?.splice(index, 1);
			}
		}
	}
	function deleteCollection(event:any) {
		if (book.publicNotes != undefined) {
			book.publicNotes = book.publicNotes.filter(collection => collection.id != event.detail.collection.id)
		}
		
	}
</script>

<BookTabSelection bind:selectedTab />

<div class=" flex justify-center">
	{#if selectedTab === Tabs.reviews}
		<ReviewsTab bind:reviews={book.reviews} />
	{:else if selectedTab === Tabs.notes}
		<NotesTab bind:collections={book.userNotes} on:newPublicCollection={addToPublicCollections} on:update={updateCollection} on:delete={deleteCollection}/>
	{:else}
		<PublicNotesTab bind:collections={book.publicNotes} />
	{/if}
</div>
