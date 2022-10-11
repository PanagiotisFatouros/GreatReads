<script lang="ts">
	import type { Book } from '../../types/book.type';
	import { Tabs } from '../../types/bookPageTabs.enum';
	import BookTabSelection from './BookTabSelection.svelte';

	import ReviewsTab from './Reviews/ReviewsTab.svelte';
	import NotesTab from './Notes/NotesTab.svelte';
	import PublicNotesTab from './Notes/PublicNotesTab.svelte';

	export let book: Book;
	console.log(book)

	if (book.userNotes != undefined && book.userNotes != undefined) {
		book.userNotes.forEach(note => {
			if (note.isPublic) {
				//remove duplicate object
				book.publicNotes?.splice(book.publicNotes.findIndex(publicNote => note.id == publicNote.id), 1);

				//replace with original object so both are updated when changed
				book.publicNotes?.push(note);
			}
		})
	}
	

	// TODO: changed based on if book is already saved or not
	let selectedTab: Tabs = Tabs.reviews;

	function addToPublicCollections(event:any) {
		book.publicNotes?.push(event.detail.collection);
	}
</script>

<BookTabSelection bind:selectedTab />

<div class=" flex justify-center">
	{#if selectedTab === Tabs.reviews}
		<ReviewsTab bind:reviews={book.reviews} />
	{:else if selectedTab === Tabs.notes}
		<NotesTab bind:collections={book.userNotes} on:newPublicCollection={addToPublicCollections}/>
	{:else}
		<PublicNotesTab bind:collections={book.publicNotes} />
	{/if}
</div>
