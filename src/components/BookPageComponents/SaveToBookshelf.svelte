<script lang='ts'>
	import type { Bookshelf } from "../../types/book.type";
    import { isOverlayOpen } from '../../stores/OverlayStore'

    import { page } from '$app/stores';
    const baseURL = $page.url.origin;

    export let bookshelves: Bookshelf[]
    export let bookId: string
    export let isShowing;

    let selectedIDs: number[] = []
    

    function handleCancel() {
        isOverlayOpen.set(false)
        isShowing = false;
    }

    async function handleConfirm() {
        console.log(selectedIDs)

        if (selectedIDs.length > 0) {
            const response = await fetch(`${baseURL}/api/update/bookshelf/add-books`, {
                method: 'PUT',
                body: JSON.stringify({
                    bookId: bookId,
                    bookshelfIds: selectedIDs,
                    bookshelfId: selectedIDs[0]
                })
            })
            console.log(await response.json())

            isOverlayOpen.set(false);
            isShowing = false;

            selectedIDs = []
        }
        else {
            alert("No bookshelves selected")
        }
    }

</script>

<div class="fixed bg-white z-10 top-1/2 left-1/2 flex flex-col items-center rounded-2xl py-6 px-8 self-center w-114" id="save">
    <h1 class=" text-accent">Save to Bookshelf</h1>

    <div class=" flex flex-col w-full space-y-3 mt-3">
        {#each bookshelves as bookshelf}
            <label class=" bg-primary-1 rounded-full w-full px-3 py-1"><input bind:group={selectedIDs} type="checkbox" value={bookshelf.id}> {bookshelf.name}</label>
        {/each}
    </div>

    <div class=" mt-3 self-end space-x-2">
		<button on:click={handleCancel} class="btn bg-primary-1 rounded-full px-4 py-1"><p>Cancel</p></button
		>
		<button on:click={handleConfirm} class="btn bg-accent text-white rounded-full px-4 py-1"
			><p>Confirm</p></button
		>
	</div>
    

</div>

<style>
	#save {
		transform: translate(-50%, -50%);
	}
</style>