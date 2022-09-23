<script lang="ts">
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation"
    import { getSession } from "lucia-sveltekit/client"
    import { Book } from  "../../../../models/Book"

    /** @type {import('./$types').PageData} */
    export let data;

    const session = getSession();
    const googleBooksApiURL = "https://www.googleapis.com/books/v1/volumes/"
    
    let username: String;
    let user;
    let baseURL: String;
    let formattedBook: Book;
    let formattedBookString: String
    let bookCollections: any[]
    let promise1;
    

    // get book info
    let bookData: JSON;
    async function getBookInfo(){
        await fetch(`${googleBooksApiURL}${data.bookId}`)
        .then((response) => response.json())
        .then((data) => {
            bookData = data
        })
    }

    // getExistingCollections
    async function getExistingCollections(){
        await fetch(`${baseURL}/api/read/collections/${user.user_id}/${data.bookId}`)
        .then((response) => response.json()).then((returnedCollections) => {
            bookCollections = returnedCollections
            return bookCollections
        })
    }

    async function addNewCollection(){
        const response = await fetch(`/api/create/collection/${data.bookId}`, {
        method: 'POST',
        body: JSON.stringify({ title: title, userId: user.user_id }),
        headers: {
            'content-type': 'application/json'
        }
        });
        await response.json();
    }


    let title: String;
    

    // get session can only be used when user is on browser and logged on, window.location.origin will fail as window is undefined.
    if (browser){
        baseURL = window.location.origin;

        if ($session){
            // console.log($session)
            user = $session.user
            // console.log(user)               

            async function allInOrder(){
                await getBookInfo()
                formattedBook = new Book(bookData)
                // console.log(formattedBook)
                formattedBookString  = JSON.stringify(formattedBook)
                await getExistingCollections()
                return bookCollections
            }

            promise1 = allInOrder()
        }


        // Not authenticated, redirect back to login page
        else{
            goto("/authentication")
        }
    }
</script>


{#if user}
    <h1> Book </h1>
    <h2> {formattedBookString} </h2>


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
    {#await promise1}
        <p>Loading Book Collections...</p>
    {:then bookCollections} 
        <ul>
            {#if bookCollections}
                {#each bookCollections as bookCollection}
                    <li>{bookCollection.Title}</li>
                {/each}
            {/if}
        </ul>
    {/await}
    
{/if}
