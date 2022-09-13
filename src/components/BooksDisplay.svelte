<script>
    let display = {
        name: "Currently Reading (Shows maximum 8)",
        books:
        [{
            name: "A tale of two cities and two cities and two cities",
            img: "http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        },
        {
            name: "A tale of two cities",
            img: "http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        },
        {
            name: "A tale of two cities",
            img: "http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        },
        {
            name: "A tale of two cities",
            img: "http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        },
        {
            name: "A tale of two cities",
            img: "http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        },
        {
            name: "A tale of two cities",
            img: "http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        }]
    }
</script>

<div id="display" class="bg-primary-3">
    <div id="header" class="bg-secondary">
        <p id="header-left">{display.name}</p>
        <span id="header-right">
            <p>See all</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>  
        </span>
    </div>
    <div id="books-container">
        {#each display.books as book}
            <div id=book>
                <img src={book.img} alt="Book Cover">
                <p id="title" class="text-primary-1 text-xs font-light">{book.name}</p>
            </div>
        {/each}
    </div>
</div>

<style>
    #display {
        width: 850px;
        height: 195px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 10px;
    }

    #header {
        height: 15%;
        border-radius: 10px 10px 0 0;
        display: flex;
        justify-content: space-between;
        color: white;
        padding-top: 5px;
        padding-bottom: 5px;
    }

    #header-left {
        margin-left: 10px;
        font-weight: 300;
        align-self: center;
    }


    #header-right {
        display: flex;
        justify-content: space-around;
        font-weight: 200;
        align-self: center;
    }

    #books-container {
        display: flex;
        justify-content: flex-start;
        padding: 10px;
    }

    #book {
        width: 8.5%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-content: center;
        margin-left: 2%;
        margin-right: 2%;
    }

    #title {
        text-align: center;
        margin-top: 5px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>