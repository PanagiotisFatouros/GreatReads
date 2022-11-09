<script lang='ts'>
	import type {Client} from '../types/book.type'
	import StarRating from './StarRating.svelte'
	import { page } from '$app/stores';
	import { goto } from '$app/navigation'

	const baseURL = $page.url.origin;

	export let user:Client
</script>

<div id="card" class="bg-primary-1">
	<p class="font-body text-primary-3">
		Books Read: <span class="text-primary-2">{user.numBooksRead}</span>
	</p>
	<p class="font-body text-primary-3">
		Number of Reviews: <span class="text-primary-2">{user.reviews?.length}</span>
	</p>
	<p class="font-body text-primary-3 flex ">
		Average Rating: 
		<span class="text-primary-2 flex items-center ml-1 space-x-1">
			<p>{(Math.round((user.avgRating || 0) * 10) / 10).toFixed(1)}</p>
			<StarRating rating={1} isSmall={true} showRating={false}/>
		</span>
	</p>
	{#if user.favAuthor == '-'}
	<p class="font-body text-primary-3">
		Favourite Author: <span class="text-primary-2">-</span>
	</p>
	{:else}
	<p class="font-body text-primary-3">
		Favourite Author: <span on:click={() => goto(`${baseURL}/search?Authors=${user.favAuthor}`)} class="text-primary-2 cursor-pointer underline hover:text-accent">{user.favAuthor}</span>
	</p>
	{/if}

	{#if user.favGenre == '-'}
	<p class="font-body text-primary-3">
		Favourite Genre: <span class="text-primary-2">-</span>
	</p>
	{:else}
	<p class="font-body text-primary-3">
		Favourite Genre: <span on:click={() => goto(`${baseURL}/search?Genres=${user.favGenre}`)} class="text-primary-2 cursor-pointer underline hover:text-accent">{user.favGenre}</span>
	</p>
	{/if}
</div>

<style>
	#card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-radius: 15px;
		width: 100%;
		height: 150px;
		padding: 10px;
		overflow-x: auto;
		overflow-y: hidden;
		white-space: nowrap;
		/* margin-top: 3rem; */
	}
</style>
