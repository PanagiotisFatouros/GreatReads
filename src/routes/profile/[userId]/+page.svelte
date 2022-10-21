<script lang="ts">
	import type { Client } from '../../../types/book.type';
	import BooksDisplay from '../../../components/BooksDisplay.svelte';
	import ProfileStatistics from '../../../components/ProfileStatistics.svelte';
	import ReviewsDisplay from '../../../components/ReviewsDisplay.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let user:Client = data.user;
	// console.log(user)

</script>

<div id="page">
	<div id="left">
		<!-- profile pic -->
		<div
			class=" w-64 h-64 mx-24 mb-5 bg-white rounded-full overflow-hidden flex justify-center items-center"
		>
			{#if user.profilePic != "default"}
				<img src={user.profilePic} class=" w-full h-full object-cover" alt="profile" />
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-full h-full text-primary-3"
				>
					<path
						fill-rule="evenodd"
						d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
						clip-rule="evenodd"
					/>
				</svg>
			{/if}
		</div>
		<p class="text-heading1 font-heading text-secondary mt-2">{user.name}</p>
		{#if user.bio != ''}
		<p id="bio" class="font-body mt-3 mb-5">{user.bio}</p>
		{/if}
		<ProfileStatistics user={user}/>
	</div>
	<div id="right">
		{#if user.favsBookshelf}
		<BooksDisplay bookshelf={user.favsBookshelf}/>
		{/if}
		
		{#if user.reviews}
			<ReviewsDisplay name={user.name} reviews={user.reviews} clientID={user.id}/>
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
		justify-content: flex-start;
		align-items: center;
		width: 25%;
	}
	#right {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 65%;
		
	}

	#bio {
		overflow-y: auto;
		/* height: 20%; */
	}
</style>
