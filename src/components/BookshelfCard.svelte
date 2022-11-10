<script lang="ts">
	import type { Bookshelf } from '../types/book.type';
	import { goto } from '$app/navigation';

	// let bookshelf = {
	// 	name: '20 Characters Max',
	// 	books: [
	// 		{
	// 			img: 'http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api'
	// 		}
	// 	]
	// };
	export let bookshelf: Bookshelf;
</script>

<div
	id="card"
	on:click={() => goto(`/library/bookshelves/${bookshelf.id}`)}
	class="bg-primary-3 cursor-pointer hover:opacity-70"
>
	<div id="Header" class={bookshelf.isDeletable ? 'bg-secondary' : 'bg-accent'}>
		<div class="flex items-center space-x-1">
			{#if !bookshelf.isDeletable}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-5 h-5 text-white"
				>
					<path
						fill-rule="evenodd"
						d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
						clip-rule="evenodd"
					/>
				</svg>
			{/if}
			<p class="text-white">{bookshelf.name}</p>
		</div>

		<svg
			id="more"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="white"
			class="w-6 h-6"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
		</svg>
	</div>
	<div id="Book1" class="bg-primary-3">
		{#if bookshelf.books != undefined && bookshelf.books.length >= 1}
			<img src={bookshelf.books[0].imageURL} alt="" />
		{/if}
	</div>
	<div id="Book2" class="bg-primary-3">
		{#if bookshelf.books != undefined && bookshelf.books.length >= 2}
			<img src={bookshelf.books[1].imageURL} alt="" />
		{/if}
	</div>
	<div id="Book3" class="bg-primary-3">
		{#if bookshelf.books != undefined && bookshelf.books.length >= 3}
			<img src={bookshelf.books[2].imageURL} alt="" />
		{/if}
	</div>
	<div id="Footer" class={bookshelf.isDeletable ? 'bg-secondary' : 'bg-accent'} />
</div>

<style>
	#card {
		border-radius: 10px;
		height: 270px;
		width: 200px;
		margin-right: 2%;
		margin-bottom: 1.5%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
	}
	#Header {
		width: 100%;
		height: 13%;
		border-radius: 10px 10px 0 0;
		display: flex;
		white-space: nowrap;
	}
	#Header > * {
		margin-left: 5%;
		margin-right: 5%;
		align-self: center;
	}
	#more {
		position: absolute;
		left: 82%;
	}
	#Book1,
	#Book2,
	#Book3 {
		position: absolute;
		box-shadow: 2px 2px 5px black;
		height: 128px;
		width: 80px;
	}
	img {
		width: 100%;
		height: 100%;
	}
	#Book1 {
		top: 20%;
		left: 10%;
		z-index: 3;
	}
	#Book2 {
		top: 30%;
		left: 30%;
		z-index: 2;
	}
	#Book3 {
		top: 40%;
		left: 50%;
		z-index: 1;
	}

	#Footer {
		width: 100%;
		height: 5%;
		border-radius: 0 0 10px 10px;
	}
</style>
