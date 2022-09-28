<script lang="ts">
    import SearchBarMini from "../../../components/SearchBarMini.svelte";
    import BookshelfCard from "../../../components/BookshelfCard.svelte";
    import AddBookshelfPanel from "../../../components/AddBookshelfPanel.svelte";
    import {isOverlayOpen} from '../../../stores/OverlayStore.js';
    import type {Book} from '../../../types/book.type';

    let addBookshelf = false;
    let bookshelves = ['', '', ''];
    $: isOverlayOpen.set(addBookshelf);
</script>

<div class="mt-6 mx-8">
    <div class="text-primary-3 text-heading2 font-heading flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 mr-1 cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>          
        Bookshelves
    </div>
    <hr class=" border-1 border-primary-3 my-3">
    <div class="text-primary-3 text-heading3 font-heading flex">
        <SearchBarMini/>
        <!-- add bookshelf button -->
        <div class="flex justify-center">
            <button
                href="null"
                on:click={() => addBookshelf=true}
                class="bg-secondary w-44 h-7 rounded-full mx-3 text-white text-center">+ Add Bookshelf</button
            >
        </div>
    </div>
</div>

<div class="flex flex-col justify-start w-full">
    {#if addBookshelf}
        <div class="z-10 fixed self-center">
            <AddBookshelfPanel bind:show={addBookshelf}/>
        </div>
    {/if}
</div>

<div class="flex flex-row flex-wrap grow justify-items-center items-center">
	{#each bookshelves as bookshelf}
		<BookshelfCard />
	{/each}
</div>