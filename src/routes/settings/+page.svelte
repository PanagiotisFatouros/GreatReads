<script lang='ts'>
	import type { Client } from "src/types/book.type";

    /** @type {import('./$types').PageData} */
    export let data;

    let user: Client = data.client;

    let uploadedPic: string = '';
    let fileInput;

    function handleFileSelected(event) {
        let image = event.target.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
            let result = e.target?.result;

            if (result) {
                uploadedPic = result.toString();

                //TODO: save to database
            }
        }
    }
</script>

<div class="mx-5 mt-4">
    <div class="flex justify-between items-center w-full">
        <h1 class=" text-secondary">Account Settings</h1>

        <button class="btn bg-secondary w-32 h-8 text-body2 text-white rounded-full">View Profile</button>
    </div>

    <div>
        <!-- left side - profile pic -->
        <div>
            
            <!-- profile pic wrapper -->
            <div class=" w-64 h-64 bg-white rounded-full overflow-hidden flex justify-center items-center">
                {#if uploadedPic != ''}
                    <img src={uploadedPic} alt="profile">
                {:else}
                    <img src='../../../images/defaultUser.svg' alt="default user">
                {/if}
            </div>

        </div>

        <!-- right side - account info/profile details -->
        <div>

        </div>
    </div>
</div>