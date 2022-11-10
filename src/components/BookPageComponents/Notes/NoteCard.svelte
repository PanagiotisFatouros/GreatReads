<script lang="ts">
	import type { Note } from 'src/types/book.type';
	import { isOverlayOpen } from '../../../stores/OverlayStore';
	import NoteInput from './NoteInput.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let note: Note;
	export let writtenByUser = true;

	let edittingNote: boolean = false;

	function showEditInput() {
		edittingNote = true;
		isOverlayOpen.set(true);
	}

	function closeEditInput(update: boolean = false) {
		edittingNote = false;
		isOverlayOpen.set(false);

		if (update) {
			dispatch('update');
		}
	}
</script>

{#if edittingNote}
	<div
		class="fixed bg-white rounded-2xl z-10 w-114 pt-1 pb-4 px-4 top-1/2 left-1/2 "
		id="noteInput"
	>
		<NoteInput {note} on:cancel={() => closeEditInput()} on:update={() => closeEditInput(true)} />
	</div>
{/if}
<div class="flex flex-col bg-primary-1 w-full rounded-lg p-2">
	<!-- note header -->
	<div class="flex justify-between items-center w-full ">
		<div class="flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6 text-secondary"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
				/>
			</svg>

			<p class=" text-secondary ml-2 mr-1">{note.title}</p>
			<!-- don't show page num if left as default -->
			{#if note.pageNum != 0}
				<p class=" text-body2">- pg. {note.pageNum}</p>
			{/if}
		</div>

		{#if writtenByUser}
			<div class=" space-x-2">
				<!-- edit note button -->
				<button on:click={showEditInput} class="hover:opacity-70">
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
							d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
						/>
					</svg>
				</button>

				<!-- delete note button -->
				<button on:click class=" hover:opacity-70 ">
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
		{/if}
	</div>

	<p class="mt-2">{note.content}</p>
</div>

<style>
	#noteInput {
		transform: translate(-50%, -50%);
	}
</style>
