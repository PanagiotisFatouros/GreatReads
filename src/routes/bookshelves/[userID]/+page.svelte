<script lang="ts">
    import SearchBarMini from "../../../components/SearchBarMini.svelte";
</script>

<div class="mt-6 mx-8">
    <div class="text-primary-3 text-heading2 font-heading flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 mr-1 cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>          
        Bookshelves
    </div>
    <hr class=" border-1 border-primary-3 my-3">
    <div class="text-primary-3 text-heading3 font-heading flex">
        <SearchBarMini/>
        <!-- add bookshelf button -->
        
    </div>
</div>