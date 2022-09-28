<script lang="ts">
	import type { Collection, Note } from 'src/types/book.type';
	import { onMount, createEventDispatcher } from 'svelte';
	import { isOverlayOpen } from '../../../stores/OverlayStore.js';
	import Confirmation from '../../Confirmation.svelte';
	import NoteCard from './NoteCard.svelte';

	import { page } from '$app/stores';


	const baseURL = $page.url.origin;

	onMount(() => {
		if (collection != null) {
			isPublic = collection.isPublic;
		} else {
			isPublic = false;
		}
	});

	const dispatch = createEventDispatcher();

	//selected collection
	export let collection: Collection | null;

	let isPublic: boolean;

	//runs everytime isPublic value changes
	$: if (isPublic != undefined) {
		// TODO: save change
		collection!.isPublic = isPublic;

		//alert(isPublic);
	}

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

	let pageNum: number = 0;
	let title: string = '';
	let noteContent: string = '';

	async function saveNote() {
		if (title != '' && noteContent != '' && collection !== null) {

			const response = await fetch(`${baseURL}/api/create/note/${collection.id}`, {
				method: 'POST',
				body: JSON.stringify({
					title: title,
					content: noteContent,
					pageNum: pageNum
				})
			})
			const newNote:Note = await response.json();

			if (newNote !== undefined && collection!.notes) {
				collection.notes?.push(newNote);
			}
			
			//trigger reload
			collection!.notes = collection!.notes;

			//reset
			pageNum = 0;
			title = '';
			noteContent = '';
		} else {
			alert("Title and Note can't be empty");
		}
	}

	let deletedNote: Note | null = null;

	function showDeleteNoteConfirmation(note: Note) {
		deletedNote = note;
		deletingNote = true;
		isOverlayOpen.set(true);
	}

	function cancelDeleteNote() {
		deletedNote = null;
		deletingNote = false;
		isOverlayOpen.set(false);
	}

	function deleteNote() {
		if (deletedNote != null) {
			if (collection!.notes){
				collection!.notes = collection!.notes.filter((n) => n.id !== deletedNote!.id);
			}
			deletingNote = false;
			isOverlayOpen.set(false);

			//TODO: remove from database

			deletedNote = null;
		}
	}

	// to update the ui when a note is deleted
	$: collection?.notes?.sort((note1, note2) => note1.pageNum - note2.pageNum);
</script>

<!-- TODO: 2 different overlays - delete collection or note -->
<!-- TODO: reload list of collections/notes after deleting -->

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

		<div class="flex items-center">
			<label for="publicCheckbox" class="text-body1 font-body mr-2">Make Public</label>
			<!-- TODO: replace with toggle -->
			<input
				type="checkbox"
				id="publicCheckbox"
				bind:checked={isPublic}
				class=" text-accent rounded-sm"
			/>

			<button on:click={showDeleteCollectionConfirmation} class=" ml-3 hover:opacity-70">
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
	<div class="flex flex-col mt-3 space-y-2">
		<div class="flex">
			<p>Page Number (optional):</p>
			<!-- TODO: replace with custom number input - see figma -->
			<input
				type="number"
				bind:value={pageNum}
				min="0"
				class="bg-primary-1 w-16 ml-3 text-center rounded-full"
			/>
		</div>
		<input type="text" bind:value={title} class="std_input" placeholder="Title..." />
		<textarea
			bind:value={noteContent}
			cols="30"
			rows="5"
			class="std_text_area"
			placeholder="Note..."
		/>
		<button on:click={saveNote} class="std_button self-end">Save</button>
	</div>

	<hr class=" border-1 border-primary-3 my-3" />

	<!-- Note Cards -->
	<div class=" space-y-4 mt-1 mb-5">
		{#if collection != null}
			{#if collection.notes}
				{#each collection.notes as note}
					<NoteCard {note} on:click={() => showDeleteNoteConfirmation(note)} />
				{/each}
			{/if}
		{/if}
	</div>
</div>
