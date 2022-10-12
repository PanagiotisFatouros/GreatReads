<script lang="ts">
	import type { Bookshelf } from "../types/book.type"
	
	export let bookshelf:Bookshelf;

</script>

<div id="display" class="bg-primary-3">
	<div id="header" class="bg-secondary">
		<p id="header-left">{bookshelf.name}</p>
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
	<div id="books-container">
		{#each bookshelf.books as book}
			<div class="book">
				<img src={book.imageURL} alt="Book Cover"/>
				<p id="title" class="text-primary-1 text-xs font-light">{book.title}</p>
			</div>
		{/each}
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

	#header-left {
		margin-left: 10px;
		font-weight: 300;
		align-self: center;
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
		padding: 5px 10px 5px 10px;
	}

	.book {
		width: 8.5%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-content: center;
		margin-left: 2%;
		margin-right: 2%;
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
