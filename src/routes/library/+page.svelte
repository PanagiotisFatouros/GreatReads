<script lang="ts">
    import SearchBarMini from "../../components/SearchBarMini.svelte";
    import BookshelfCard from "../../components/BookshelfCard.svelte";
    import NotesPreview from "../../components/NotesPreview.svelte";
    import {goto} from '$app/navigation';
    import type { Bookshelf, Collection } from '../../types/book.type'

    /** @type {import('./$types').PageData} */
	export let data;

    let bookshelves: Bookshelf[] = data.bookshelves;
    let collections: Collection[] = data.collections;
</script>

<div class="mt-6 mx-8">
    <p class="text-primary-3 text-heading2 font-heading flex items-center">         
        My Library
    </p>
    <hr class=" border-1 border-primary-3 my-3">

    <div class="flex flex-row flex-wrap grow justify-items-center items-center">
        {#each bookshelves as bookshelf}
            <BookshelfCard bookshelf={bookshelf}/>
        {/each}
    </div>

    <!-- view all button -->
    <div class="flex justify-center">
        <button
            on:click={() => goto('/library/bookshelves')}
            class="std_button bg-secondary w-36 h-8 rounded-full text-white text-center font-body">View All</button
        >
    </div>
</div>

<div class="mt-6 mx-8">
    <p class="text-primary-3 text-heading2 font-heading flex items-center">         
        My Notes
    </p>
    <hr class=" border-1 border-primary-3 my-3">

    <SearchBarMini />

    <div class="flex flex-row flex-wrap grow justify-items-center items-center">
        {#each collections as collection}
            <NotesPreview collection={collection}/>
        {/each}
    </div>
</div>