<script lang='ts'>
    import RatingInput from './../../RatingInput.svelte'

    let rating:number = 0;
    let title:string = '';
    let comment:string = '';

    function postReview() {
        
        if (rating != 0 && title != '' && comment != '') {
            //TODO: save to db
            alert(`rating: ${rating} \ntitle: ${title} \ncomment: ${comment}`)

            //TODO: decide if allowing multiple reviews from 1 user
            //reset input
            rating = 0;
            title = '';
            comment = '';
        }
        else {
            alert(`missing required value`)
        }
    }
</script>

<div class=" flex flex-col space-y-2 text-body1 font-body">
    <RatingInput bind:rating />
    <input type="text" bind:value={title} class=" std_input" placeholder="Title...">
    <textarea cols="30" rows="5" bind:value={comment} class=" std_text_area" placeholder="Write a review..."></textarea>

    <button on:click={postReview} class=" std_button self-end">Post</button>
</div>