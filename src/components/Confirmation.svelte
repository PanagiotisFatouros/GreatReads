<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let title:string;
    export let description:string;


	function handleConfirm() {
		dispatch('confirm');
	}

    function handleCancel() {
		dispatch('cancel');
	}

    
</script>

<div class=" fixed bg-white z-10 flex flex-col items-center rounded-2xl py-4 px-4 self-center">
    <h2 class=" text-accent self-center mb-2">{title}</h2>
    <p class=" whitespace-pre-line text-center">{@html description}</p>
   

    <div class=" mt-3 self-end space-x-2">
        <button on:click={handleCancel} class="btn bg-primary-1 rounded-full px-2"><p>Cancel</p></button>
        <button on:click={handleConfirm} class="btn bg-accent text-white rounded-full px-2"><p>Confirm</p></button>
    </div>
</div>