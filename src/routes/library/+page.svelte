<script lang="ts">
    import SearchBarMini from "../../components/SearchBarMini.svelte";
    import BookshelfCard from "../../components/BookshelfCard.svelte";
    import NotesPreview from "../../components/NotesPreview.svelte";
    import AddBookshelfPanel from '../../components/AddBookshelfPanel.svelte';
    import { isOverlayOpen } from '../../stores/OverlayStore.js';
    import {goto} from '$app/navigation';
    import type { Bookshelf, Collection } from '../../types/book.type'

    /** @type {import('./$types').PageData} */
	export let data;

    let bookshelves: Bookshelf[] = data.bookshelves;
    let collections: Collection[] = data.collections;
    let addBookshelf: boolean = false;
    let searchText: string = '';

    $: isOverlayOpen.set(addBookshelf);
	$: bookshelves

	$: {
		if ($isOverlayOpen == false) {
			addBookshelf = false;
		}
	}

    function addBookshelfLocally(event:any) {
		
		bookshelves.push(event.detail.bookshelf);

		bookshelves = bookshelves
	}
</script>

<div class="mt-6 mx-8">
    <p class="text-primary-3 text-heading2 font-heading flex items-center">         
        My Library
    </p>
    <hr class=" border-1 border-primary-3 my-3">

    <!-- add bookshelf button -->
	<button
		href="null"
		on:click={() => (addBookshelf = true)}
		class="std_button bg-secondary w-44 h-7 rounded-full mb-3 text-white text-center font-body"
		>+ Add Bookshelf</button
	>

    <div class="flex flex-row flex-wrap grow justify-items-center items-center">
        {#each ((bookshelves.length >= 6) ? bookshelves.slice(0,6) : bookshelves) as bookshelf}
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

    <SearchBarMini bind:searchText />

    <div class="flex flex-row flex-wrap grow justify-items-center items-center">
        {#each collections as collection}
            {#if (collection.title.toLowerCase().includes(searchText.toLowerCase()))}
                <NotesPreview collection={collection}/>
            {/if}
        {/each}
    </div>
</div>

{#if addBookshelf}
	<div class="flex flex-col justify-start w-full">

		<div class="z-20 fixed top-1/2 left-1/2" id="addBookshelf">
			<AddBookshelfPanel bind:show={addBookshelf} on:newBookshelf={addBookshelfLocally} />
		</div>
	</div>
{/if}