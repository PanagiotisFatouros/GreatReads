<script lang="ts">
    import type { Collection } from "../types/book.type"
	import MostPopular from "./MostPopular.svelte";
    export let collection: Collection;

    function getLength() {
        if ((collection.notes) === undefined) {
            return 0;
        } else {
            return (collection.notes).length
        }
    }
    let len = getLength();
</script>

<div id="main" class="bg-primary-1">
    <div id='left'>
        <img src={collection.book.imageURL} alt="Book Cover">
    </div>
    <div id=centred>
        <div id="right">
            <p class="text-secondary text-heading3 font-heading">{collection.title}</p>
            <p class="font-body text-body2">{len} Notes</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgb(255, 102, 99)" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>  
    </div>    
</div>

<style>
    #main {
        display: flex;
        justify-content: space-around;
        width: 30%;
        border-radius: 10px;
        padding: 5px;
        margin-left: 1%;
        margin-right: 1%;
    }
    #left {
       margin: 2% 5% 2% 2%;
       width: 30%;
       height: auto;
       display: flex;
       justify-content: center;
       align-items: center;
    }

    #centred {
        width: 70%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    #right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 80%;
        overflow-wrap: break-word;
    }
</style>