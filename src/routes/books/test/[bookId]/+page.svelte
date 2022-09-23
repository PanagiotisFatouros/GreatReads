<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { getSession } from 'lucia-sveltekit/client';
	import { Book } from '../../../../models/Book';

	/** @type {import('./$types').PageData} */
	export let data;

	const session = getSession();
	const googleBooksApiURL = 'https://www.googleapis.com/books/v1/volumes/';

	let username: String;
	let user;
	let formattedBook: Book;
	let formattedBookString: String;
	let bookCollections: any[];
	let bookData: JSON;
	let promise1;

	// fetch user info
	async function bindUser(baseURL: String) {
		await fetch(`${baseURL}/api/read/user-profile/${username}`)
			.then((response) => response.json())
			.then((userprofile) => {
				user = userprofile;
				return userprofile;
			});
	}

	// get book info
	async function getBookInfo() {
		await fetch(`${googleBooksApiURL}${data.bookId}`)
			.then((response) => response.json())
			.then((data) => {
				bookData = data;
			});
	}

	// getExistingCollections
	async function getExistingCollections(baseURL: String) {
		await fetch(`${baseURL}/api/read/collections/${user.ID}/${data.bookId}`)
			.then((response) => response.json())
			.then((returnedCollections) => {
				bookCollections = returnedCollections;
				return bookCollections;
			});
	}

	async function allInOrder(baseURL: String) {
		await bindUser(baseURL);
		await getBookInfo();
		formattedBook = new Book(bookData);
		// console.log(formattedBook)
		formattedBookString = JSON.stringify(formattedBook);
		await getExistingCollections(baseURL);
		return bookCollections;
	}

	// If user is logged on
	if (browser) {
		const baseURL = window.location.origin;

		if ($session) {
			// console.log($session)
			username = $session.user.username;
			promise1 = allInOrder(baseURL);
		}

		// Not authenticated, redirect back to login page
		else {
			goto('/authentication');
		}
	}
</script>

{#if user}
	<h1>Book</h1>
	<h2>{formattedBookString}</h2>

	<h3>Create Collection</h3>
	<form method="POST" action="?/createNewCollection">
		<input name="title" type="text" placeholder="Title..." />
		<input name="userId" value={user?.ID} hidden />
		<input name="bookId" value={data?.bookId} hidden />
		<input name="_lucia" value={$session?.access_token} hidden />
		<button>Save</button>
	</form>

	<h3>Existing Collections</h3>
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
