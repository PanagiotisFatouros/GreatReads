<script lang='ts'>
    import type { Collection } from 'src/types/book.type';
    import { isOverlayOpen } from '../../../stores/OverlayStore.js';
    import { page } from '$app/stores';
	import { getSession } from 'lucia-sveltekit/client';
	import { onMount, createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

	const session = getSession();
	const user_id = $session?.user.user_id;

	const bookId = $page.params.bookId;
	const baseURL: string = $page.url.origin;

    export let collection: Collection | undefined;

    let collectionTitle = '';
	let isPublic = false;

    onMount(() => {
        if (collection != undefined) {
            collectionTitle = collection.title;
            isPublic = collection.isPublic;
        }
    })

    async function createNewCollection() {
		//TODO: check string is not empty and add to database
		// alert(`Title: ${collectionTitle}, isPublic: ${isPublic}`);

		//remove overlay
		isOverlayOpen.set(false);

		const response = await fetch(`${baseURL}/api/create/collection/${bookId}`, {
			method: 'POST',
			body: JSON.stringify({
				title: collectionTitle,
				userId: user_id,
				isPublic: isPublic
			})
		});

		//reset
		collectionTitle = '';
		isPublic = false;

        //bind to parent
		collection = await response.json();

		dispatch('newCollection');
	}

    function handleCancel() {
        isOverlayOpen.set(false)
        dispatch('cancel');
    }

    async function updateCollection() {
        if (collection != undefined) {
            //TODO: update in database

            await fetch(`${baseURL}/api/update/collection`, {
                method: 'PUT',
                body: JSON.stringify({
                    id: collection.id,
                    title: collectionTitle,
                    isPublic: isPublic
                })
            });

            collection.title = collectionTitle;
            collection.isPublic = isPublic;

            isOverlayOpen.set(false);
            dispatch('update');
        }
        
    }

</script>

<div
    class=" bg-white fixed z-10 top-1/2 left-1/2 w-96 flex flex-col p-3 rounded-2xl"
    id="collectionForm"
>
    <h2 class=" text-secondary">New Notes Collection</h2>

    <input
        bind:value={collectionTitle}
        type="text"
        placeholder="Title..."
        class=" standard_input my-2 bg-primary-1 rounded-full px-2 py-1"
    />

    <div class="flex justify-between text-body2 space-x-2 mt-1 w-full items-center">
        <!-- TODO: replace with Flowbite toggle - wasn't working -->
        <div class="flex items-center space-x-3 ml-1">
            <label for="publicCheckbox" class="text-body1 font-body">Make Public</label>
            <input
                type="checkbox"
                id="publicCheckbox"
                bind:checked={isPublic}
                class=" text-accent rounded-sm"
            />
        </div>

        <div class=" mt-1">
            
            <button
                on:click={handleCancel}
                class=" btn bg-primary-1 rounded-full px-3 py-0.5"><p>Cancel</p></button
            >
            {#if collection == undefined}
            <button on:click={createNewCollection} class="btn bg-accent text-white rounded-full px-3 py-0.5"
                ><p>Create</p></button
            >
            {:else}
            <button on:click={updateCollection} class="btn bg-accent text-white rounded-full px-3 py-0.5"
                ><p>Update</p></button
            >
            {/if}
        </div>
    </div>
</div>

<style>
	#collectionForm {
		transform: translate(-50%, -50%);
	}
</style>
