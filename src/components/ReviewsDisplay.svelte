<script lang="ts">
    import type { Review } from "../types/book.type";
    import BookReview from "./BookReview.svelte";

    export let name: string;
    export let reviews: Review[];
</script>

<div id="card" class="bg-primary-3">
    <div id="header" class="bg-secondary">
        <span id="header-left">
            {name}'s Reviews
        </span>
        <span id="header-right">
            <p>See all</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>  
        </span>
    </div>
    <div id="reviews-container">
        {#each reviews as review}
            <BookReview review ={review}/>
        {/each}
    </div>
</div>

<style>
    #card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 850px;
        height: 400px;
        border-radius: 10px;
        margin-top: 3vh;
    }

    #header {
        display: flex;
        justify-content: space-between;
        width : 100%;
        height: 15%;
        border-radius: 10px 10px 0 0;
        color: white;
        font-weight: 300;
    }

    #header-left {
        align-self: center;
        margin-left: 10px;
    }

    #header-right {
        display: flex;
        align-self: center;
        font-weight: 200;
    }

    #reviews-container {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
        padding-top: 10px;
        padding-bottom: 10px;
    }


</style>
