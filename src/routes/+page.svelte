<script lang="ts">
	//TODO: remove
	import { getSession } from 'lucia-sveltekit/client';
	import BooksDisplay from '../components/BooksDisplay.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { isOverlayOpen } from '../stores/OverlayStore';
	import type { Bookshelf, Client } from '../types/book.type'

	isOverlayOpen.set(false)

	const session = getSession();

	if ($session) {
		console.log($session);
	} else {
		if (browser) {
			goto('/authentication');
		}
	}
	let user1: Client = {
		id: "1",
		reviews: [
			{
				id: 123,
				title: 'Worst Book Ever',
				comment:
					'This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks',
				date: new Date(),
				img: 'http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
				rating: 3,
				upvotes: 10,

				isEdited: false
			},
			{
				id: 123,
				title: 'Worst Book Ever',
				comment:
					'This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks',
				date: new Date(),
				img: 'http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
				rating: 3,
				upvotes: 10,
				isEdited: false
			},
			{
				id: 123,
				title: 'Worst Book Ever',
				comment:
					'This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks',
				date: new Date(),
				img: 'http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
				rating: 3,
				upvotes: 10,
				isEdited: false,
			}
		],
		profilePic:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8kiSH5ZSAcVoj3tAQQDoP_ux0sSricMyUg&usqp=CAU',
		bio: "My name is Bob; I'm a avid reader, and lover of non-fiction. My favourite genres of book include literature and sci-fi. When I'm not reading, you will find me in the forest enjoying nature, or kayaking in the moutains.",
		name: 'Dean Coleman'
	};
	
	let currentlyReading: Bookshelf = {
		name: "Currently Reading",
		id: 1,
		isDeletable: false,
		creationDate: new Date(),
		user: user1,
		books: [{
			id: "1",
			title: "Hello",
			authors: ["Bob Marley"],
			pageCount: 150,
			genres: ["Sci-fi"],
			isbn: "9780439023481",
			datePublished: "23/2/2021",
			imageURL: 'http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api'
		},
		{
			id: "1",
			title: "Hello",
			authors: ["Bob Marley"],
			pageCount: 150,
			genres: ["Sci-fi"],
			isbn: "9780439023481",
			datePublished: "23/2/2021",
			imageURL:'http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api'
		},
		{
			id: "1",
			title: "Hello",
			authors: ["Bob Marley"],
			pageCount: 150,
			genres: ["Sci-fi"],
			isbn: "9780439023481",
			datePublished: "23/2/2021",
			imageURL: "http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
		}],
	}

</script>

<div id="left">
	<BooksDisplay bookshelf={currentlyReading}/>
	<BooksDisplay bookshelf={currentlyReading}/>
</div>

<style>
	#left {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 65%;
		margin-left: 2%;
		height: 50vh;
	}
</style>
