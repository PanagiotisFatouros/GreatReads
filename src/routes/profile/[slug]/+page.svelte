<script lang="ts">
	import type { Bookshelf, Client } from '../../../types/book.type';
	import BooksDisplay from '../../../components/BooksDisplay.svelte';
	import ProfileStatistics from '../../../components/ProfileStatistics.svelte';
	import ReviewsDisplay from '../../../components/ReviewsDisplay.svelte';
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
			imageURL: "https://books.google.com/books/content?id=buc0AAAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
		},
		{
			id: "1",
			title: "Hello",
			authors: ["Bob Marley"],
			pageCount: 150,
			genres: ["Sci-fi"],
			isbn: "9780439023481",
			datePublished: "23/2/2021",
			imageURL: "https://books.google.com/books/content?id=buc0AAAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
		},
		{
			id: "1",
			title: "Hello",
			authors: ["Bob Marley"],
			pageCount: 150,
			genres: ["Sci-fi"],
			isbn: "9780439023481",
			datePublished: "23/2/2021",
			imageURL: "https://books.google.com/books/content?id=buc0AAAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
		}],
	}
</script>

<div id="page">
	<div id="left">
		<img id="profilePic" src={user1.profilePic} alt="Profile pic" />
		<p class="text-heading1 text-secondary">{user1.name}</p>
		<p id="bio" class="font-body">{user1.bio}</p>
		<ProfileStatistics />
	</div>
	<div id="right">
		<BooksDisplay bookshelf={currentlyReading}/>
		<!-- "ignore error: will fix itself when using type 'review' instead of placeholder values" -->
		{#if user1.reviews}
			<ReviewsDisplay name={user1.name} reviews={user1.reviews} clientID={user1.id}/>
		{/if}
	</div>
</div>

<style>
	#page {
		display: flex;
		justify-content: space-around;
		padding: 20px;
	}
	#left {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		width: 25%;
	}
	#right {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		width: 70%;
	}
	#profilePic {
		height: 40%;
		width: auto;
		border-radius: 50%;
		border: 2px solid #424C55;
	}

	#bio {
		overflow-y: auto;
		height: 20%;
	}
</style>
