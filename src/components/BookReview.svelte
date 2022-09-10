<script lang="ts">
    import StarRating from "./StarRating.svelte";

    const MINUTE = 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;
    const WEEK = DAY * 7;
    const MONTH = DAY * 30;
    const YEAR = DAY * 365;

    function getTimeAgo(date: any) {
        const secondsAgo = Math.round((Date.now() - Number(date)) / 1000);

        if (secondsAgo < MINUTE) {
            return secondsAgo + ` second${secondsAgo !== 1 ? "s" : ""} ago`;
        }

        let divisor;
        let unit = "";

        if (secondsAgo < HOUR) {
            [divisor, unit] = [MINUTE, "minute"];
        } else if (secondsAgo < DAY) {
            [divisor, unit] = [HOUR, "hour"];
        } else if (secondsAgo < WEEK) {
            [divisor, unit] = [DAY, "day"];
        } else if (secondsAgo < MONTH) {
            [divisor, unit] = [WEEK, "week"];
        } else if (secondsAgo < YEAR) {
            [divisor, unit] = [MONTH, "month"];
        } else {
            [divisor, unit] = [YEAR, "year"];
        }

        const count = Math.floor(secondsAgo / divisor);
        return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
    }
    
    let review = {
        title: "60 Characters Max",
        date: Date.parse("04 Dec 2021 00:12:00 GMT"),
        img: "http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lacinia lacus eget rutrum egestas. Maecenas vitae volutpat neque. Suspendisse sit amet velit lacinia, tempor ante nec, bibendum leo. Phasellus luctus, dolor et consectetur suscipit, velit leo accumsan ipsum, at fermentum purus purus at nibh. Sed ultricies purus ante, non blandit leo congue a. Aenean fringilla risus eget dui hendrerit, ac condimentum diam dapibus. Duis nisl massa, feugiat iaculis nulla a, cursus consectetur quam. Aenean in ligula eget mauris vehicula consectetur vitae et sem. Sed condimentum quam et elit aliquet, vel elementum elit placerat. Duis mauris nunc, pellentesque eu diam a, ultrices faucibus sapien. Quisque tristique metus ut ipsum gravida consectetur.",
        rating: 4.5
    }

    let diff = getTimeAgo(review.date);

</script>


<div id="review" class="bg-primary-1">
    <div id="cover"><img src={review.img} alt=""></div>
    <div id="text"> 
        <h1 class="font-heading text-body1">
            <p id="title">{review.title}</p>
            <StarRating rating={review.rating} showRating={false}/>
        </h1>
        <p class="text-primary-3 text-body2 font-body">{diff}</p>
        <p class="text-primary-3">{review.text}</p>
      
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
        overflow-y: auto;
        overflow-x: hidden;
    }
    #title {
        margin-right: 10px;
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
        display: flex;
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