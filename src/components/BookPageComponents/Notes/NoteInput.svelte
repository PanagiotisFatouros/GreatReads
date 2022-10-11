<script lang="ts">
	import type { Note } from "../../../types/book.type";
    import { page } from '$app/stores';
    import { onMount, createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

	const baseURL = $page.url.origin;

    export let note: Note | undefined;
    export let collectionId: number | undefined = undefined;

    let pageNum: number = 0;
	let title: string = '';
	let noteContent: string = '';

    onMount(() => {
        if (note != undefined) {
            pageNum = note.pageNum;
            title = note.title;
            noteContent = note.content;
        }
    })

    async function saveNote() {
		if (collectionId != undefined) {
            if (title == '' || noteContent == '') {
                alert("Title and Note can't be empty");
            } 
            else if (pageNum < 0) {
                alert("Page Number must be positive");
            }
            else {
                const response = await fetch(`${baseURL}/api/create/note/${collectionId}`, {
                    method: 'POST',
                    body: JSON.stringify({
                        title: title,
                        content: noteContent,
                        pageNum: pageNum
                    })
                });
                const newNote: Note = await response.json();

                note = newNote;
                dispatch('newNote');

                //reset
                pageNum = 0;
                title = '';
                noteContent = '';
            }
        }
        else {
            //TODO: remove
            alert('CollectionId undefined')
        }
	}

    async function updateNote() {
        if (note != undefined) {
            if (title == '' || noteContent == '') {
                alert("Title and Note can't be empty");
            } 
            else if (pageNum < 0) {
                alert("Page Number must be positive");
            }
            else {
                //TODO: update in database
                //const newNote: Note = await response.json();

                note.pageNum = pageNum;
                note.title = title;
                note.content = noteContent;
                dispatch('update');

                //reset
                pageNum = 0;
                title = '';
                noteContent = '';
            }
        }   
    }

</script>

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
    {#if note == undefined}
        <!-- new note -->
        <button on:click={saveNote} class="std_button self-end">Save</button>
    {:else}
        <!-- editting note -->
		<div class="self-end">
			<button on:click={() => dispatch('cancel')} class=" std_button bg-primary-1 text-primary-3">Cancel</button>
			<button on:click={updateNote} class=" std_button">Update</button>
		</div>
    {/if}
</div>