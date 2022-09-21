<script lang='ts'>
    //TODO: remove
	import StarRating from '../components/StarRating.svelte';
    import RatingInput from '../components/RatingInput.svelte';
   
   let rating:number = 0;

</script>

<StarRating rating={4.3} />
<StarRating rating={1.0} />
<StarRating rating={2.7} />
<StarRating rating={0.5} />
<StarRating rating={4.9} />
<StarRating rating={4.8} />
<StarRating rating={3.6} showRating={false} />
<br>

<RatingInput bind:rating={rating} />
<p>input rating: {rating}</p>


<a href="/books/zyTCAlFPjgYC">Book Link</a>



