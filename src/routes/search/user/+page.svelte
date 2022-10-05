<script lang="ts">
	import type { Client } from '../../../types/book.type';
    import UserCard from '../../../components/UserCard.svelte';

	let searchTerm: string = '';
	let user1: Client = {
        id: '123',
        profilePic:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8kiSH5ZSAcVoj3tAQQDoP_ux0sSricMyUg&usqp=CAU',
		name: 'Dean Coleman'
    };
    let users = [user1, user1, user1, user1, user1, user1, user1];
</script>

<div class="mt-6 mx-8">
	<div class="text-primary-3 text-heading2 font-heading">Search Results for "{searchTerm}"</div>
	<hr class=" border-1 border-primary-3 my-3" />
</div>

<div class="mx-6 flex flex-row flex-wrap grow justify-items-center items-center">
	{#each users as user}
		<UserCard />
	{/each}
</div>
