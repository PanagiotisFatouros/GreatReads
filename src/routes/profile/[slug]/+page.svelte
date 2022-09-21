<script lang="ts">
	// import type { User } from '../../../types/book.type';
    import BooksDisplay from '../../../components/BooksDisplay.svelte';
    import ProfileStatistics from '../../../components/ProfileStatistics.svelte';
    import ReviewsDisplay from '../../../components/ReviewsDisplay.svelte';

    let user = {
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8kiSH5ZSAcVoj3tAQQDoP_ux0sSricMyUg&usqp=CAU",
        bio: "My name is Bob; I'm a avid reader, and lover of non-fiction. My favourite genres of book include literature and sci-fi. When I'm not reading, you will find me in the forest enjoying nature, or kayaking in the moutains.",
        name: "Dean",
        lastName: "Coleman",
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
    <div id="left">
        <img id="profilePic" src={user.photo} alt="Profile Picture">
        <p class="text-heading1 text-secondary">{user.name} {user.lastName}</p>
        <p id="bio" class="font-body">{user.bio}</p>
        <ProfileStatistics/>
    </div>
    <div id="right">
        <BooksDisplay/>
        <!-- "ignore error: will fix itself when using type 'review' instead of placeholder values" -->
        <ReviewsDisplay name={user.name} reviews={user.reviews}/>
    </div>
</div>

<style>
    #page {
        display: flex;
        justify-content: space-around;
        padding: 20px;

    }
    
    #left {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 25%;

    }

    #right {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 70%;
    }

    #profilePic {
        height: 30%;
        width: auto;
        border-radius: 50%;
    }

    #bio {
        overflow-y: auto;
        height: 20%;

    }
</style>