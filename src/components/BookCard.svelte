<script lang="ts">
    import StarRating from "../components/StarRating.svelte";

    export let bookcard = {
        img: "http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
        name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        author: "Author",
        rating: 4.0,
        reviewNum: "",
        genres: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tincidunt quam ac diam scelerisque, in convallis odio pellentesque. Pellentesque ac justo nisi. Praesent aliquet consequat convallis. Sed quis enim non libero aliquam bibendum."
    }
</script>

<div id="bookCard" class="bg-primary-1 w-114 h-52 m-4 p-2 pr-4 rounded-lg">
    <a href="null">
        <img src={bookcard.img} alt="Book" class="p-3 pr-4 w-34 max-h-48 float-left align-middle">
        <p class="text-secondary pt-3 font-heading text-xl font-bold truncate">{bookcard.name}</p>
        <p class="text-primary-3 font-body text-sm">{bookcard.author}</p>
        <div class="flex">
            <StarRating rating={bookcard.rating}/>
            <!-- TODO: add number of reviews here -->
            <p class="text-primary-3 p-1 font-body text-sm">{bookcard.reviewNum} Reviews</p>
        </div>
        
        <p class="text-black font-body text-sm line-clamp-2 overflow-hidden"><span class="text-secondary">Genres: </span>{bookcard.genres}</p>
    </a>
    <button href="null" class="bg-secondary w-32 h-7 rounded-full mt-3 text-white font-body">+ Save Book</button>
</div>