<script lang="ts">

    // TODO: make +page.js or +page.server.js to load book data from api and database when connected to backend

    //TODO: store in separate file and change to match format of api response
    type Book = {
        name: string,
        author: string,
        numPages: number,
        rating: number,
        description: string,
        //will be array of Review types not strings
        reviews: string[],
        genre: string,
        isbn: string,
        //could be Date
        datePublished: string,
        imageURL: string
    }

    let book:Book = {
        name: "The Hunger Games",
        author: "Suzanne Collins",
        numPages: 384,
        rating: 4.3,
        description: "The Hunger Games is a 2008 dystopian novel by the American writer Suzanne Collins. It is written in the perspective of 16-year-old Katniss Everdeen, who lives in the future, post-apocalyptic nation of Panem in North America.",
        reviews: ["great", "terrible"],
        genre: "Dystopian",
        isbn: "9780440335702",
        datePublished: "1st December 2011",
        imageURL: "http://books.google.com/books/content?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71m9nvyzo1NJxodp6cD1grRr1hk7wGgHSNBRhJkMVVz0-VmnqgHo5KemZGD3W7N5JHue3ZyfQ7q6TxUuzN9AIg8BVj9sibBrgsRF2TbgRojWCr7sxR0rWh2Cydv2lRG4Ppg12p_&source=gbs_api"
    }

    function saveBook() {
        //TODO: save book to user's bookshelf
        
    }
</script>

<div class=" grid grid-cols-9">
    <!-- left column - cover image and info -->
    <div class=" col-span-3 flex justify-center items-center flex-col bg-red-600">
        <div class=" h-coverHeight w-coverWidth my-5">
            <img src={book.imageURL} alt="book cover" class=" w-full h-full object-contain">
        </div>

        <button on:click={saveBook} class=" bg-secondary rounded-3xl text-white px-4 py-1">+ Save Book</button>

        <ul>
            
        </ul>
        
    </div>

    <!-- middle column - book overview and reviews/notes -->
    <div class=" col-span-4 bg-blue-500">
        <p>div2</p>
    </div>

    <!-- right column - similar books -->
    <div class=" col-span-2 bg-green-700">
        <p>div3</p>
    </div>
</div>