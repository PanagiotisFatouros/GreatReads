<script lang='ts'>
	import type { Collection, Note } from "src/types/book.type";
    import { onMount } from 'svelte';
    import {isOverlayOpen} from '../../../stores/OverlayStore.js'
    import Confirmation from '../../Confirmation.svelte'

    onMount(() => {
        if (collection != null) {
            isPublic = collection.isPublic
        }
        else {
            isPublic = false;
        }
    })

    //selected collection
    export let collection: Collection | null;

    let isPublic:boolean;

    //runs everytime isPublic value changes
    $: if (isPublic != undefined) {
        
        // TODO: save change
        collection!.isPublic = isPublic;
        
        //alert(isPublic);
    }

    function deleteCollection() {
        //TODO: delete collection from database

        isOverlayOpen.set(false);
        //go back to collections page
        collection = null;
    }

    let pageNum: number = 0;
    let title: string = '';
    let noteContent: string = '';

    function saveNote() {
        
        if (title != '' && noteContent != '') {
                let newNote:Note = {
                pageNum: pageNum,
                title: title,
                content: noteContent,
                creationDate: new Date()
            }

            //TODO: save note to collection in database

            //add note to local collection object so it doesn't have to be reloaded
            collection!.notes.push(newNote);

            //reset
            pageNum = 0;
            title = '';
            noteContent = '';
        }
        else {
            alert("Title and Note can't be empty");
        }
        
    }

</script>

{#if $isOverlayOpen}
    <Confirmation title="Delete Collection" description="Are you sure you want to delete this collection? <br/>This can not be undone." on:cancel={() => isOverlayOpen.set(false)} on:confirm={deleteCollection} />
{/if}

<div class="flex flex-col">

    <div class="flex justify-between items-center mt-3">
        <div class="flex">
            <button on:click={() => collection = null} class='flex items-center bg-white text-secondary pl-1 pr-3 rounded-3xl border-2 border-secondary hover:opacity-70'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <p>Back</p>
            </button>
            <h2 class=" ml-4 text-accent">{collection?.title}</h2>
        </div>
        
        <div class="flex items-center">
            <label for="publicCheckbox" class="text-body1 font-body mr-2">Make Public</label>
            <!-- TODO: replace with toggle -->
            <input type="checkbox" id="publicCheckbox" bind:checked={isPublic} class=" text-accent rounded-sm">
    
            <button on:click={() => isOverlayOpen.set(true)} class=" ml-3 hover:opacity-70">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-accent">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>
        </div>
    </div>
    
    <!-- Note input -->
    <div class="flex flex-col mt-3 space-y-2">
        <div class="flex">
            <p>Page Number (optional):</p>
            <!-- TODO: replace with custom number input - see figma -->
            <input type="number" bind:value={pageNum} min='0' class="bg-primary-1 w-16 ml-3 text-center rounded-full">
        </div>
        <input type="text" bind:value={title} class="std_input" placeholder="Title...">
        <textarea bind:value={noteContent} cols="30" rows="5" class="std_text_area" placeholder="Note..."></textarea>
        <button on:click={saveNote} class="std_button self-end">Save</button>
    </div>

</div>

