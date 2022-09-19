<script>
    let book = {
        img: "http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
        name: "Harry Potter and the Cursed Child",
        author: "J.K. Rowling",
        rating: 4.3,
        reviewNum: "",
        genres: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt quam ac diam scelerisque, in convallis odio pellentesque. Pellentesque ac justo nisi. Praesent aliquet consequat convallis. Sed quis enim non libero aliquam bibendum."
    }
    import StarRating from "./StarRating.svelte";
</script>

<div id="card">
    <div id="cover"><img src={book.img} alt=""></div>
    <div id="text">
        <h1 class="text-heading2 text-secondary font-body font-400">{book.name}</h1>
        <p id="rating" class="text-primary-2">{book.rating} <StarRating rating={1} showRating={false}/></p>
        <p class="text-primary-3 font-body">{book.author}</p>
    </div>
</div>

<style>
    #card {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 500px;
        height: 250px;
        /* delete later (border to see container more easily when using this component) */
        border: 1px solid black;
    }

    #cover {
        width: auto;
        height: 80%;
        margin-right: 10px;
    }

    #text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow-y: auto;
        width: 60%;
    }

    #rating {
        display: flex;
        justify-content: flex-start;
        font-size: larger;
        align-items: center;
    }

</style>