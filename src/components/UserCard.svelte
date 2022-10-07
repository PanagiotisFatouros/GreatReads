<script lang="ts">
    import type { Client } from '../types/book.type';

    export let user1: Client = {
        id: '123',
        profilePic:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8kiSH5ZSAcVoj3tAQQDoP_ux0sSricMyUg&usqp=CAU',
		name: 'Dean Coleman'
    };
</script>

<div class="w-40 h-52 m-4 p-2 pr-4 flex flex-col justify-items-center">
	<a href="null">
		<img src={user1.profilePic} alt="Book" class="p-3 pr-4 w-32 h-32 rounded-full" />
		<p class="text-secondary font-heading text-body1 font-bold truncate">{user1.name}</p>
	</a>
</div>