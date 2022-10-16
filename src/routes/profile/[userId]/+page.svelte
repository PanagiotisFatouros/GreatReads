<script lang="ts">
	import type { Client } from '../../../types/book.type';
	import BooksDisplay from '../../../components/BooksDisplay.svelte';
	import ProfileStatistics from '../../../components/ProfileStatistics.svelte';
	import ReviewsDisplay from '../../../components/ReviewsDisplay.svelte';

	const profilePic = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8kiSH5ZSAcVoj3tAQQDoP_ux0sSricMyUg&usqp=CAU'

	/** @type {import('./$types').PageData} */
	export let data;

	let user:Client = data.user;
	// console.log(user)

</script>

<div id="page">
	<div id="left">
		<!-- TODO: change profile pic when working -->
		<img id="profilePic" src={profilePic} alt="Profile pic" />
		<p class="text-heading1 font-heading text-secondary">{user.name}</p>
		{#if user.bio != ''}
		<p id="bio" class="font-body">{user.bio}</p>
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
		justify-content: start;
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
	#profilePic {
		height: 30%;
		width: auto;
		border-radius: 50%;
	}

	#bio {
		overflow-y: auto;
		height: 20%;
	}
</style>
