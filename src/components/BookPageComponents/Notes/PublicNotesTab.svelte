<script lang="ts">
    import { getTimeAgo } from '../../../scripts'
	import type { Collection } from 'src/types/book.type';
    import SearchBar from '../../SearchBar.svelte';
    import VoteButtons from '../../VoteButtons.svelte';
    import PublicCollection from './PublicCollection.svelte';

    export let collections:Collection[];

    let filteredCollections:Collection[] = collections;
    let searchText:string = '';

    // runs every time searchText changes
    $: filteredCollections = collections.filter(collection => {
        let titleCheck:boolean = collection.title.toLocaleLowerCase().startsWith(searchText.toLocaleLowerCase());
        let authorCheck:boolean = collection.user.name.toLocaleLowerCase().startsWith(searchText.toLocaleLowerCase());

        return titleCheck || authorCheck;
    });

    let selectedCollection: Collection | null = null;

</script>

<div class="flex flex-col w-full mt-4">
    

    {#if selectedCollection != null}
        <PublicCollection bind:collection={selectedCollection} />
    {:else}
        <!-- header -->
        <div class="flex justify-between">
            <h2 class=" text-accent mr-3">Collections</h2>

            <!-- don't need to handle on:click since search happens automatically -->
            <SearchBar bind:searchText={searchText} placeholder="Search  by title or author..."/>

            <!-- TODO: add filter options -->
            <button class=" ml-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-accent">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
                </svg>
                
            </button>
            
        </div>


        <div>
            {#each filteredCollections as collection}
                <div on:click={() => selectedCollection = collection} class=" bg-primary-1 my-4 rounded-3xl pl-2 pr-1 py-2 flex items-center cursor-pointer hover:bg-opacity-70">
                    
                    <VoteButtons />

                    <div class="flex ml-3 space-x-3 items-center">
                        <div class="profile_pic_small">
                            <img src={collection.user.profilePic} alt="profile pic">
                        </div>
                        <div>
                            <p class="text-secondary">{collection.title}</p>

                            <div class="text-body2 flex">
                                <p class=" text-primary-2 mr-1">{collection.user.name}</p>
                                <!-- TODO: maybe change to last edited -->
                                <p >- Created {getTimeAgo(collection.creationDate)}</p>
                            </div>
                            
                        </div>
                    </div>
                    
                    
                    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-secondary ml-auto">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            {/each}
        </div>
    {/if}
</div>