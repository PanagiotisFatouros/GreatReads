<script lang="ts">
    import BookReview from "../../../../components/BookReview.svelte";
    import SortPanel from "../../../../components/SortPanel.svelte";
    import { isOverlayOpen } from "../../../../stores/OverlayStore";
	import type { Client, Review } from '../../../../types/book.type'
   
	/** @type {import('./$types').PageData} */
	export let data;

	let reviews: Review[] = data.reviews;
	let user: Client = data.user;
    let reviewsShown: Review[] = data.reviews.slice();

    let sortOn = false;
    let sortOption: number;
    $: isOverlayOpen.set(sortOn);
</script>

    <div class="mt-6 mx-8" id="header">
        <div class="text-primary-3 text-heading2 font-heading flex items-center">
            <a href="/profile/{user.id}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>                  
            </a>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            {user.name}'s Reviews
        </div>
        <hr class=" border-1 border-primary-3 my-3" />
        <div class="text-primary-3 text-heading3 font-heading flex">
            <!-- sort button -->
            <div style="cursor:pointer" on:click={() => (sortOn = true)} class="flex">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-6 h-6 text-primary-3"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                    />
                </svg>
                <p class="ml-1 mr-3">Sort</p>
            </div>
        </div>
    </div>
<br/>
    {#each reviews as rv}
		{rv.title}
	{/each}<br/><br/>
    {#each reviewsShown as rv}
		{rv.title}
	{/each}<br/>
    <!--TODO: set default as upvoted-->
    <div class="flex flex-col justify-start w-full">
        {#if sortOn && $isOverlayOpen && reviewsShown != undefined}
            <div class="z-10 fixed self-center">
                <SortPanel bind:show={sortOn} sortReviews={true} reviews={reviews} bind:reviewsShown={reviewsShown} bind:sortOption={sortOption} />
            </div>
	    {/if}
    </div>

<div id="container">
    <div id="main" class=' space-y-6 px-4'>
        {#each reviewsShown as rev}
            <BookReview review={rev} displayText={true}/>
        {/each}
    </div>
</div>

<style>
    #container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 1%;
        margin-left: 15px;
        margin-right: 15px;
		margin-bottom: 30px;
    }
    #main {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        overflow-y: auto;
    }
</style>

