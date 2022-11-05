<script lang="ts">
    import type { Collection } from "../types/book.type"
    import { goto } from '$app/navigation'
    import {getNoteText, getTimeAgo} from '../scripts'
    
    export let collection: Collection;

</script>

<div on:click={() => goto(`/books/${collection.bookId}`)} id="main" class="bg-primary-1 cursor-pointer group">
    <div id='left'>
        <img src={collection.imgURL} alt="Book Cover">
    </div>
    <div id="centred" class=" group-hover:opacity-70 text-primary-3">
        <div id="right">
            <p class="text-secondary text-heading3 font-heading">{collection.title}</p>
            {#if collection.numNotes != undefined}
            <p class="text-body2">{collection.numNotes | 0} {getNoteText(collection.numNotes | 0)}</p>
            {/if}

            {#if collection.lastUpdateDate}
            <p class="text-body2">Updated {getTimeAgo(collection.lastUpdateDate)}</p>
            {:else}
            <p class="text-body2">Created {getTimeAgo(collection.creationDate)}</p>
            {/if}
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgb(255, 102, 99)" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>  
    </div>    
</div>

<style>
    #main {
        display: flex;
        justify-content: space-around;
        max-width: 33%;
        border-radius: 10px;
        padding: 5px;
        /* margin-left: 1%;
        margin-right: 1%; */
    }
    #left {
       margin: 2% 5% 2% 2%;
       width: 28%;
       height: auto;
       display: flex;
       justify-content: center;
       align-items: center;
    }

    #centred {
        width: 70%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    #right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 80%;
        overflow-wrap: break-word;
    }
</style>