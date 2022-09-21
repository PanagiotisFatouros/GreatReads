<script lang="ts">
    import StarRating from '../components/StarRating.svelte'

    // import genres from API
    let genres = ["Select Genre...", "Non-fiction", "Fantasy", "Science Fiction"]
    let selected = genres[0];
</script>

<div class="bg-white w-96 h-64 m-4 rounded border-solid border-2 border-primary-3 p-1">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-primary-3 mt-1 mx-1 float-left">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
    </svg>
    <p class="text-primary-3 text-heading2 font-heading ml-1 mr-3">Filter</p>

    <div class=" bg-white rounded-full border-solid border-2 border-primary-3 flex mx-2 my-1 text-primary-3 text-body2 font-body">
        <select bind:value={selected} class="bg-transparent w-full pl-2 cursor-pointer focus:outline-none">
            {#each genres as genre}
                <option value={genre}>
                    {genre}
                </option>
            {/each}
        </select>
    </div>
    <div class="mx-2">
        <input type="radio" name="ratingFilter" id="allRatings" value="allRatings" class="appearance-none w-3 h-3 rounded-full bg-white border-2 ring-primary-3 ring-2 checked:bg-secondary align-middle">
        <label for="allRatings" class="text-primary-3 font-body text-body2 align-middle mx-1">All ratings</label><br>
        <div class="flex mt-1">
            <input type="radio" name="ratingFilter" id="fourUp" value="fourUp" class="appearance-none w-3 h-3 mt-1 mr-1 rounded-full bg-white border-2 ring-primary-3 ring-2 checked:bg-secondary">
            
            {#each Array(4) as _}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-primary-2">
                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                </svg>
            {/each}
            <label for="fourUp" class="text-primary-3 font-body text-body2 align-middle mx-1">& up</label><br>
        </div>
        <div class="flex">
            <input type="radio" name="ratingFilter" id="threeUp" value="threeUp" class="appearance-none w-3 h-3 mt-1 mr-1 rounded-full bg-white border-2 ring-primary-3 ring-2 checked:bg-secondary">
            
            {#each Array(3) as _}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5  text-primary-2">
                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                </svg>
            {/each}
            <label for="threeUp" class="text-primary-3 font-body text-body2 align-middle mx-1">& up</label><br>
        </div>
    </div>
</div>