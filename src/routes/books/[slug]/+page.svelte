<script lang="ts">
    import StarRating from '../../../components/StarRating.svelte';
    import BookPageContent from '../../../components/BookPageComponents/BookPageContent.svelte';
    // TODO: make +page.js or +page.server.js to load book data from api and database when connected to backend

    import type {Book, Review, User, Collection, Note} from '../../../types/book.type'
    let user: User = {
        name: "James Smith",
        id: 123,
        profilePic: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw3MjAxN3wwfDF8c2VhcmNofDEwfHx1c2VyfGVufDB8fHx8MTY2MzYzMjU2NQ&ixlib=rb-1.2.1&q=80&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450",
    }

    let review1:Review = {
        id: 5413,
        title: "Terrible",
        comment: "Lorem Ipsum",
        rating: 3,
        date: new Date(),
        upvotes: 5,
        user: user
    }

    let review2:Review = {
        id: 32451,
        title: "60 Characters Max",
        date: new Date("04 Dec 2021 00:12:00 GMT"),
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lacinia lacus eget rutrum egestas. Maecenas vitae volutpat neque. Suspendisse sit amet velit lacinia, tempor ante nec, bibendum leo. Phasellus luctus, dolor et consectetur suscipit, velit leo accumsan ipsum, at fermentum purus purus at nibh. Sed ultricies purus ante, non blandit leo congue a. Aenean fringilla risus eget dui hendrerit, ac condimentum diam dapibus. Duis nisl massa, feugiat iaculis nulla a, cursus consectetur quam. Aenean in ligula eget mauris vehicula consectetur vitae et sem. Sed condimentum quam et elit aliquet, vel elementum elit placerat. Duis mauris nunc, pellentesque eu diam a, ultrices faucibus sapien. Quisque tristique metus ut ipsum gravida consectetur.",
        rating: 4.5,
        user: user,
        upvotes: -3
    }

    let note1: Note = {
        id: 9078,
        title: "Testing",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis imperdiet sodales risus et pulvinar. Vivamus vitae lectus varius, tempus turpis id, hendrerit elit. Donec gravida finibus aliquam. Integer enim diam, interdum non finibus nec, blandit vitae tortor. Donec vitae mattis quam, ac pellentesque neque. Integer sit amet tortor odio. Integer sit amet lobortis magna, eu egestas lectus. Nam in convallis nisi. Suspendisse facilisis mollis sapien, a viverra sem pellentesque eget. Quisque quis interdum enim, et commodo est.",
        creationDate: new Date(),
        pageNum: 124
    }

    let note2: Note = {
        id: 45078,
        title: "Testing 2",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis imperdiet sodales risus et pulvinar. Vivamus vitae lectus varius, tempus turpis id, hendrerit elit. Donec gravida finibus aliquam.",
        creationDate: new Date(),
        pageNum: 254
    }

    let collection1:Collection = {
        id: 2345,
        title: "Summary",
        creationDate: new Date(),
        isPublic: true,
        upvotes: 4,
        user: user,
        notes: [note1, note2]
    }

    let collection2:Collection = {
        id: 2343545,
        title: "Chapter Analysis",
        creationDate: new Date(),
        isPublic: true,
        upvotes: -3,
        user: user,
        notes: [note1, note2]
    }
    
    let book:Book = {
        id: 154769832,
        title: "The Hunger Games",
        authors: ["Suzanne Collins"],
        pageCount: 384,
        avgRating: 4.3,
        numRatings: 35,
        description: "The Hunger Games is a 2008 dystopian novel by the American writer Suzanne Collins. It is written in the perspective of 16-year-old Katniss Everdeen, who lives in the future, post-apocalyptic nation of Panem in North America.",
        reviews: [review1, review2],
        genres: ["Dystopian", "science fiction", "drama", "action"],
        isbn: "9780440335702",
        datePublished: "1st December 2011",
        imageURL: "https://goshenpl.lib.in.us/wp-content/uploads/2020/07/hunger-games.jpg",
        userNotes: [collection1, collection2],
        publicNotes: [collection1, collection2],
    }

    

    

    function saveBook() {
        //TODO: save book to user's bookshelf
        
    }

    function convertToString (val:any) {
        if (Array.isArray(val) && val.every(i => typeof i === "string")) {
            return val.join(', ')
        }
        return '';
    }
</script>

<div class=" grid grid-cols-10 text-body1 font-body text-primary-3 mt-1">
    <!-- left column - cover image and info -->
    <div class=" col-span-3 flex justify-center items-center flex-col self-start">
        <div class=" h-coverHeight w-coverWidth my-5">
            <img src={book.imageURL} alt="book cover" class=" w-full h-full object-contain">
        </div>

        <!-- TODO: show popup to select which bookshelf to save it in, and change text to "saved" after -->
        <button on:click={saveBook} class=" bg-secondary rounded-3xl text-white text-body1 font-body px-4 py-1 btn">+ Save Book</button>

        <ul class=" mt-5 space-y-1 font-body text-body1 ml-14 mr-9">
            <li><p><span class=" text-secondary">Published: </span>{book.datePublished}</p></li>
            <li><p><span class=" text-secondary">Genres: </span>{convertToString(book.genres)}</p></li>
            <li><p><span class=" text-secondary">Number of Pages: </span>{book.pageCount}</p></li>
            <li><p><span class=" text-secondary">ISBN: </span>{book.isbn}</p></li>
        </ul>
        
    </div>

    <!-- middle column - book overview and reviews/notes -->
    <div class=" col-span-5 mt-5 mr-3">
        <div class="flex justify-start items-center flex-wrap">
            <h1 class=" text-heading1 font-heading text-secondary mr-5">{book.title}</h1>
            <StarRating rating={book.avgRating} />
            <p class=" text-body2 ml-4">{book.numRatings} Reviews</p>
        </div>

        <h2 class=" text-heading2 font-heading">{convertToString(book.authors)}</h2>
        <p class="mt-3 mb-5">{book.description}</p>

        <BookPageContent book={book} />
        
    </div>

    <!-- right column - similar books -->
    <div class=" col-span-2 bg-primary-1 rounded-3xl m-4 py-2 px-3">
        <h2 class=" text-heading2 font-heading">Similar Books</h2>
        <hr class=" border-1 border-primary-3">
        <!-- TODO: add a loop showing all books -->
    </div>
</div>