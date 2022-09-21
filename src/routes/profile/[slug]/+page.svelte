<script lang="ts">
	// import type { User } from '../../../types/book.type';
    import BooksDisplay from '../../../components/BooksDisplay.svelte';
    import ProfileStatistics from '../../../components/ProfileStatistics.svelte';
    import ReviewsDisplay from '../../../components/ReviewsDisplay.svelte';

    let user = {
        name: "Dean",
        reviews: [{
            title: "Worst Book Ever",
            comment: "This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks This sucks",
            date: new Date(),
            img: "http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            rating: 3,
            upvotes: 10
        },
        {
            title: "Worst Book Ever",
            comment: "This sucks",
            date: new Date(),
            img: "http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            rating: 3,
            upvotes: 10
        },
        {
            title: "Worst Book Ever",
            comment: "This sucks",
            date: new Date(),
            img: "http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            rating: 3,
            upvotes: 10
        },
        {
            title: "Worst Book Ever",
            comment: "This sucks",
            date: new Date(),
            img: "http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            rating: 3,
            upvotes: 10
        }]
    }
</script>

<div id="page">
    <ProfileStatistics/>
    <div id="right">
        <BooksDisplay/>
        <ReviewsDisplay name={user.name} reviews={user.reviews}/>
    </div>
</div>

<style>
    #page {
        display: flex;
        justify-content: space-around;
    }

    #right {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

</style>