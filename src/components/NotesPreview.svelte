<script lang="ts">
	import type { Collection } from "../types/book.type";
	import { goto } from '$app/navigation'
	import {getNoteText, getTimeAgo} from '../scripts'

	export let collection:Collection;
</script>

<button on:click={() => goto(`/books/${collection.bookId}`)} class="bg-primary-1 w-80 h-40 m-3 rounded-md flex items-center hover:opacity-70">
	<img src={collection.imgURL} alt="Book" class="p-3 w-28 max-h-40 float-left align-middle" />
	<div class="flex flex-col items-start text-primary-3">
		<p class="text-secondary font-body font-bold text-body1">{collection.title}</p>
		{#if collection.numNotes != undefined}
		<p class=" font-body text-body2">{collection.numNotes} Notes</p>
		{/if}

		{#if collection.lastUpdateDate}
		<p class="text-body2">Updated {getTimeAgo(collection.lastUpdateDate)}</p>
		{:else}
		<p class="text-body2">Created {getTimeAgo(collection.creationDate)}</p>
		{/if}
	</div>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="2"
		stroke="currentColor"
		class="w-6 h-6 text-accent ml-auto mr-1"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
	</svg>
</button>
