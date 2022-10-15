<script lang="ts">
	import type {Bookshelf} from '../types/book.type'
	import { goto } from '$app/navigation'

	export let bookshelf: Bookshelf;
</script>

<div id="display" class="bg-primary-3 shadow-xl">
	<div id="header" class="bg-accent">
		<div class="flex items-center ml-3 space-x-1">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-white">
				<path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
			</svg>
			<h2 id="header-left">{bookshelf.name}</h2>
		</div>
		
		<span id="header-right">
			<p>See all</p>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
			</svg>
		</span>
	</div>
	<div id="books-container" class="px-2">
		{#if bookshelf.books}
			{#each bookshelf.books as book}
				<div class=" w-20 cursor-pointer group" on:click={() => goto(`/books/${book.id}`)} >
					<img src={book.imageURL} alt="Book Cover" class="w-full"/>
					<p id="title" class="text-primary-1 font-body text-body2 group-hover:opacity-70">{book.title}</p>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	#display {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-radius: 10px;
		box-shadow: 5px 5px 5px gray;
	}

	#header {
		height: 15%;
		border-radius: 10px 10px 0 0;
		display: flex;
		justify-content: space-between;
		color: white;
		padding-top: 5px;
		padding-bottom: 5px;
	}

	#header-right {
		display: flex;
		justify-content: space-around;
		font-weight: 200;
		align-self: center;
	}

	#books-container {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		overflow: hidden;
		margin-top: 1%;
		margin-bottom: 1%;
	}

	#books-container > * {
		margin-right: 1%;
		margin-left: 1%;
	}


	#title {
		text-align: center;
		margin-top: 2px;
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;

	}
</style>
