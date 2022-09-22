<script lang='ts'>
    import ReviewInput from "./ReviewInput.svelte";
    import ReviewCard from './ReviewCard.svelte'
    import type { Review} from '../../../types/book.type'

    export let reviews:Review[];

</script>

<div class=" mt-3 w-full">
    <ReviewInput />

    <hr class=" border-1 border-primary-3 my-3">

    <div>
        {#each reviews as review}
            <ReviewCard review={review}/>
            
        {/each}
    </div>
</div>
