<script lang="ts">
    import type {Book} from '../types/book.type'
    import {Tabs} from '../types/bookPageTabs.enum'
    import BookTabSelection from "./BookTabSelection.svelte";

    export let book:Book;

    // TODO: changed based on if book is already saved or not
    let selectedTab:Tabs = Tabs.reviews
</script>

<BookTabSelection bind:selectedTab={selectedTab} />