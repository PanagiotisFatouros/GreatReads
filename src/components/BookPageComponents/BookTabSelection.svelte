<script lang='ts'>
    import {Tabs} from '../../types/bookPageTabs.enum'
    
    export let selectedTab:Tabs;


</script>

<!-- TODO: if we have time, add animation when changing tabs so it doesn't just jump to the selected tab -->
<div class=" text-secondary flex justify-center space-x-5">
    {#each Object.values(Tabs) as tab}
        <div>
            <button on:click={() => selectedTab = tab}><h2 class=" text-heading2 font-heading">{tab}</h2></button>
            {#if tab === selectedTab}
                <hr class=" border rounded-md border-secondary" />
            {/if}
        </div>
    {/each}
</div>