<script lang="ts">
    import type { Client } from '../types/book.type';
	import { goto } from '$app/navigation';

    //temporary profile pic
    //TODO: fix when profile pic is working
    const profilePic = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8kiSH5ZSAcVoj3tAQQDoP_ux0sSricMyUg&usqp=CAU'
    export let user: Client = {
        id: '123',
        profilePic:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8kiSH5ZSAcVoj3tAQQDoP_ux0sSricMyUg&usqp=CAU',
		name: 'Dean Coleman'
    };
</script>

<div on:click={() => goto(`/profile/${user.id}`)} class="w-40 h-52 m-4 flex flex-col justify-center items-center cursor-pointer bg-primary-1 rounded-2xl shadow-lg">
	
	<img src={profilePic} alt="Profile" class="p-3 w-32 h-32 rounded-full" />
	<p class="text-secondary font-heading text-body1 font-bold truncate">{user.name}</p>
	
</div>