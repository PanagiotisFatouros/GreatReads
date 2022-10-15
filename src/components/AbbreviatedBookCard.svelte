<script lang='ts'>
	import type {Book} from '../types/book.type';
	export let book: Book;
	
	let book1 = {
		img: 'http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
		name: 'Harry Potter and the Cursed Child',
		author: 'J.K. Rowling',
		rating: 4.3,
		reviewNum: '',
		genres:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt quam ac diam scelerisque, in convallis odio pellentesque. Pellentesque ac justo nisi. Praesent aliquet consequat convallis. Sed quis enim non libero aliquam bibendum.'
	};
	import StarRating from './StarRating.svelte';
</script>

<div id="card">
	<div id="cover"><img src={book.imageURL} alt="" /></div>
	<div id="text">
		<p class="text-body1 text-secondary ">{book.title}</p>
		<p id="rating" class="text-primary-2 text-body2">
			{book.avgRating}
			<StarRating rating={1} showRating={false} isSmall={true} />
		</p>
		<p class="text-primary-3 text-body2">{book.authors}</p>
	</div>
</div>

<style>
	#card {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: auto;
	}

	#cover {
		width: 30%;
		height: auto;
		margin-right: 10px;
	}

	#text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow-y: auto;
		width: 60%;
	}

	#rating {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
</style>
