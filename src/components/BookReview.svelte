<script>
    import StarRating from "./StarRating.svelte";
    
    let review = {
        title: "Terrible",
        date: "27/03/2022",
        img: "http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lacinia lacus eget rutrum egestas. Maecenas vitae volutpat neque. Suspendisse sit amet velit lacinia, tempor ante nec, bibendum leo. Phasellus luctus, dolor et consectetur suscipit, velit leo accumsan ipsum, at fermentum purus purus at nibh. Sed ultricies purus ante, non blandit leo congue a. Aenean fringilla risus eget dui hendrerit, ac condimentum diam dapibus. Duis nisl massa, feugiat iaculis nulla a, cursus consectetur quam. Aenean in ligula eget mauris vehicula consectetur vitae et sem. Sed condimentum quam et elit aliquet, vel elementum elit placerat. Duis mauris nunc, pellentesque eu diam a, ultrices faucibus sapien. Quisque tristique metus ut ipsum gravida consectetur.",
        rating: 4.5
    }
</script>


<div id="review" class="bg-primary-1">
    <div id="cover"><img src={review.img} alt=""></div>
    <div id="text"> 
        <h1 class="font-heading">{review.title} <StarRating rating={review.rating} showRating={false}/></h1>
        <p>{review.text}</p>
      
    </div>
</div>

<style>
    #review {
        display: flex;
        width: 800px;
        height: 150px;
        border-radius: 10px;
        margin: 10px;
        padding: 10px;
        overflow: auto;
    }

    #text {
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 90%;
    }
    h1 {
        color: #15B097;
        display: inline
    }

    #cover {
        height: 95%;
        align-self: center;
        margin-right: 10px;
    }

    img {
        height: 100%;
        width: auto;
    }
</style>