<script lang="ts">
    import BookReview from "../../../../components/BookReview.svelte";
    import type { Review } from "src/types/book.type"
   
   export let reviews: Review[];
</script>

<div id="main">
    {#each reviews as rev}
        <BookReview review={rev}/>
    {/each}
</div>

<style>
    #main {
        width: 100vw;
        height: 100wh;
    }
</style>

