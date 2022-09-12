<script lang="ts">
    import type {Book} from '../../types/book.type'
    import {Tabs} from '../../types/bookPageTabs.enum'
    import BookTabSelection from "./BookTabSelection.svelte";

    import ReviewsTab from './Reviews/ReviewsTab.svelte';
    import NotesTab from './Notes/NotesTab.svelte';
    import PublicNotesTab from './Notes/PublicNotesTab.svelte';

    export let book:Book;

    // TODO: changed based on if book is already saved or not
    let selectedTab:Tabs = Tabs.reviews
</script>

<BookTabSelection bind:selectedTab={selectedTab} />

{#if selectedTab === Tabs.reviews}
    <ReviewsTab />
{:else if selectedTab === Tabs.notes}
    <NotesTab />
{:else}
    <PublicNotesTab />
{/if}