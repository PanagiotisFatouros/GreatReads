<script lang="ts">
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation"
    import { getSession } from "lucia-sveltekit/client"
    import type { Book } from "../../../../types/book.type"


    /** @type {import('./$types').PageData} */
    export let data:any;

    const session = getSession();
    let user:any;
    let baseURL: String;
    let getBookPromise: Promise<Book>
    

    // get book info
    export async function getBookInfo(){
        const response = await fetch(`/api/read/books/${data.bookId}/${user.user_id}`, )
        const responseJson = response.json()
        const bookData: Book = await responseJson
        return bookData
    }


    async function addNewCollection(){
        const response = await fetch(`/api/create/collection/${data.bookId}`, {
        method: 'POST',
        body: JSON.stringify({ title: title, userId: user.user_id }),
        headers: {
            'content-type': 'application/json'
        }})
        await response.json()
    }

    async function addNewReview(){
        const response = await fetch(`/api/create/review/${data.bookId}`, {
            method: 'POST',
            body: JSON.stringify({ title: title, comment: comment, rating: rating, userId: user.user_id}),
            headers: {
            'content-type': 'application/json'
        }})
        await response.json()
    }

    let title: String;
    let comment: String;
    let rating: Number;
    

    // get session can only be used when user is on browser and logged on, window.location.origin will fail as window is undefined.
    if (browser){
        baseURL = window.location.origin;

        if ($session){
            // console.log($session)
            user = $session.user
            // console.log(user)               

            getBookPromise = getBookInfo()
        }
        // Not authenticated, redirect back to login page
        else{
            goto("/authentication")
        }
    }
</script>


{#if user}
    <h1> Book </h1>
    {#await getBookPromise}
        <h2> Book Loading... </h2>
    {:then book} 
        <h2> {JSON.stringify(book)} </h2>

        <h3> Create Collection </h3>
        <form method="POST" action="?/createNewCollection">
            <input name="title" type="text" placeholder="Title...">
            <input name="userId" value="{user?.user_id}" hidden>
            <input name="bookId" value="{data?.bookId}" hidden>
            <input name="_lucia" value="{$session?.access_token}" hidden />
            <button>Save</button>
        </form>

        <h1> newVersionOfCreateCollection </h1>
        <p>Enter Name for Title:</p> <input bind:value={title}>
        <button on:click={addNewCollection}>addNewCollection</button>


        <h3> Existing Collections </h3>
        <ul>
            {#if book.userNotes.length > 0}
                {#each book.userNotes as bookCollection}
                    <li>{bookCollection.title}</li>
                {/each}
            {/if}
        </ul>

        <h1> addNewReview </h1>
        <p>Enter Name for Title:</p> <input bind:value={title}>
        <p>Enter Comment:</p> <input bind:value={comment}>
        <p>Enter Rating:</p> <input type="number" bind:value={rating}>

        <button on:click={addNewReview}>addNewCollection</button>
        <h3> Existing reviews </h3>

        <ul>
            {#if book.reviews.length > 0}
                {#each book.reviews as bookReview}
                    <li>{bookReview.title}</li>
                {/each}
            {/if}
        </ul>


    {/await}
    

{/if}
