<script lang="ts">
	import type { Collection, Note } from 'src/types/book.type';
	import { createEventDispatcher } from 'svelte';
	import { isOverlayOpen } from '../../../stores/OverlayStore.js';
	import Confirmation from '../../Confirmation.svelte';
	import NoteCard from './NoteCard.svelte';
	import NoteInput from './NoteInput.svelte';

	import { page } from '$app/stores';
	import CollectionInput from './CollectionInput.svelte';

	const baseURL = $page.url.origin;

	const dispatch = createEventDispatcher();

	//selected collection
	export let collection: Collection | null;

	// keep track of which confirmation message to show
	let deletingCollection: boolean = false;
	let deletingNote: boolean = false;

	function showDeleteCollectionConfirmation() {
		deletingCollection = true;
		isOverlayOpen.set(true);
	}

	function cancelDeleteCollection() {
		deletingCollection = false;
		isOverlayOpen.set(false);
	}

	function deleteCollection() {
		isOverlayOpen.set(false);
		deletingCollection = false;

		dispatch('delete');
	}

	let savedNote: Note | undefined = undefined;

	function addSavedNote() {
		if (savedNote != undefined && collection != null && collection!.notes) {
			collection.notes?.push(savedNote);

			triggerRefresh();

			savedNote = undefined;
		}
	}

	let selectedNote: Note | null = null;

	function showDeleteNoteConfirmation(note: Note) {
		selectedNote = note;
		deletingNote = true;
		isOverlayOpen.set(true);
	}

	function cancelDeleteNote() {
		selectedNote = null;
		deletingNote = false;
		isOverlayOpen.set(false);
	}

	async function deleteNote() {
		if (selectedNote != null && collection!.notes) {
			const response = await fetch(`${baseURL}/api/delete/note/${selectedNote.id}`, {
					method: 'DELETE'
			});
			
			let deletedNote:Note = await response.json();
			
			if (deletedNote != undefined) {
				//successful - remove note from local collection
				collection!.notes = collection!.notes.filter((n) => n.id !== deletedNote!.id);
			}
			else {
				alert("Something went wrong. Collection not deleted");
			}
			
			deletingNote = false;
			isOverlayOpen.set(false);

			selectedNote = null;

		}
	}

	let editingCollection: boolean = false;

	function showEditInput() {
		editingCollection = true;
		isOverlayOpen.set(true);
	}

	function triggerRefresh() {
		console.log("triggering refresh");
		if (collection != null && collection.notes != undefined) {
			//collection.notes = collection.notes;
			collection = collection;

		}
	}

	function onUpdateCollection() {
		triggerRefresh();
		dispatch('update', {
			collection: collection
		})
	}

	// to update the ui when a note is added
	$: collection?.notes?.sort((note1, note2) => note1.pageNum - note2.pageNum);
</script>

{#if $isOverlayOpen && deletingCollection}
	<Confirmation
		title="Delete Collection"
		description="Are you sure you want to delete this collection? <br/>This can not be undone."
		on:cancel={cancelDeleteCollection}
		on:confirm={deleteCollection}
	/>
{:else if $isOverlayOpen && deletingNote}
	<Confirmation
		title="Delete Note"
		description="Are you sure you want to delete this note? <br/>This can not be undone."
		on:cancel={cancelDeleteNote}
		on:confirm={deleteNote}
	/>
{:else if $isOverlayOpen && editingCollection && collection != null}
	<CollectionInput collection={collection} on:cancel={() => editingCollection = false} on:update={onUpdateCollection}/>
{/if}

<div class="flex flex-col">
	<div class="flex justify-between items-center mt-3">
		<div class="flex">
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
			<h2 class=" ml-4 text-accent">{collection?.title}</h2>
		</div>

		<div class="flex items-center space-x-3">
			<!-- isPublic display -->
			<div class="mr-2 flex space-x-1">
				{#if collection?.isPublic}
				<p>Public Collection</p>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
					<path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
					<path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd" />
				</svg>
				
				{:else}
				<p>Private Collection</p>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
					<path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
					<path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
					<path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
				</svg>
				{/if}
			</div>

			<!-- edit button -->
			<button on:click={showEditInput} class='hover:opacity-70'>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-accent">
					<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
				  </svg>
				  
			</button>

			<!-- delete button -->
			<button on:click={showDeleteCollectionConfirmation} class=" hover:opacity-70">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6 text-accent"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
					/>
				</svg>
			</button>
		</div>
	</div>

	<!-- Note input -->
	{#if collection != null}
		<NoteInput bind:note={savedNote} collectionId={collection.id} on:newNote={addSavedNote} />
	{/if}

	<hr class=" border-1 border-primary-3 my-3" />

	<!-- Note Cards -->
	<div class=" space-y-4 mt-1 mb-5">
		{#if collection != null}
			{#if collection.notes}
				{#each collection.notes as note}
					<NoteCard {note} on:click={() => showDeleteNoteConfirmation(note)} on:update={triggerRefresh}/>
				{/each}
			{/if}
		{/if}
	</div>
</div>
