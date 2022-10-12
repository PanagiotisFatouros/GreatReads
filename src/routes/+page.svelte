<script lang="ts">
	//TODO: remove
	import { getSession } from 'lucia-sveltekit/client';
	import BooksDisplay from '../components/BooksDisplay.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { isOverlayOpen } from '../stores/OverlayStore';
	import type { Bookshelf, Client, Note } from '../types/book.type'

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
				img: 'http://books.google.com/books/content?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71m9nvyzo1NJxodp6cD1grRr1hk7wGgHSNBRhJkMVVz0-VmnqgHo5KemZGD3W7N5JHue3ZyfQ7q6TxUuzN9AIg8BVj9sibBrgsRF2TbgRojWCr7sxR0rWh2Cydv2lRG4Ppg12p_&source=gbs_api',
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
				img: 'http://books.google.com/books/content?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71m9nvyzo1NJxodp6cD1grRr1hk7wGgHSNBRhJkMVVz0-VmnqgHo5KemZGD3W7N5JHue3ZyfQ7q6TxUuzN9AIg8BVj9sibBrgsRF2TbgRojWCr7sxR0rWh2Cydv2lRG4Ppg12p_&source=gbs_api',
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
				img: 'http://books.google.com/books/content?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71m9nvyzo1NJxodp6cD1grRr1hk7wGgHSNBRhJkMVVz0-VmnqgHo5KemZGD3W7N5JHue3ZyfQ7q6TxUuzN9AIg8BVj9sibBrgsRF2TbgRojWCr7sxR0rWh2Cydv2lRG4Ppg12p_&source=gbs_api',
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
			imageURL: 'http://books.google.com/books/content?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71m9nvyzo1NJxodp6cD1grRr1hk7wGgHSNBRhJkMVVz0-VmnqgHo5KemZGD3W7N5JHue3ZyfQ7q6TxUuzN9AIg8BVj9sibBrgsRF2TbgRojWCr7sxR0rWh2Cydv2lRG4Ppg12p_&source=gbs_api',
		},
		{
			id: "1",
			title: "Hello",
			authors: ["Bob Marley"],
			pageCount: 150,
			genres: ["Sci-fi"],
			isbn: "9780439023481",
			datePublished: "23/2/2021",
			imageURL:'http://books.google.com/books/content?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71m9nvyzo1NJxodp6cD1grRr1hk7wGgHSNBRhJkMVVz0-VmnqgHo5KemZGD3W7N5JHue3ZyfQ7q6TxUuzN9AIg8BVj9sibBrgsRF2TbgRojWCr7sxR0rWh2Cydv2lRG4Ppg12p_&source=gbs_api'
		},
		{
			id: "1",
			title: "Hello This is a very long title",
			authors: ["Bob Marley"],
			pageCount: 150,
			genres: ["Sci-fi"],
			isbn: "9780439023481",
			datePublished: "23/2/2021",
			imageURL: 'http://books.google.com/books/content?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71m9nvyzo1NJxodp6cD1grRr1hk7wGgHSNBRhJkMVVz0-VmnqgHo5KemZGD3W7N5JHue3ZyfQ7q6TxUuzN9AIg8BVj9sibBrgsRF2TbgRojWCr7sxR0rWh2Cydv2lRG4Ppg12p_&source=gbs_api'
		}],
	};

	let notes

</script>

<div id="page">
	<div id="left">
		<div id="bookshelves">
			<div class="display">
				<BooksDisplay bookshelf={currentlyReading}/>
			</div>
			<div class="display">
				<BooksDisplay bookshelf={currentlyReading}/>
			</div>
		</div>
		<div id="notes">
			<h2 class="font-body text-heading2">Recent Notes</h2>
			<hr class=" border-1 border-primary-3 my-3" />
		</div>
	</div>
	<div id="right">
		Lemonade
	</div>
</div>

<style>
	#page {
		display: flex;
		justify-content: space-between;
		padding: 20px;
	}
	#left {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 70%;
	}

	.display {
		margin-bottom: 10px;
	}

	#bookshelves {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	#notes {
		width: 98%;
		height: 40%;
		align-self: center;
	}
</style>
