<script lang="ts">
	import type { Review } from "src/types/book.type";
    import StarRating from "./StarRating.svelte";

    export let review: Review;

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

    let diff = getTimeAgo(review.date);

</script>


<div id="review" class="bg-primary-1">
    <div id="cover"><img src={review.img} alt=""></div>
    <div id="text"> 
        <div class="flex items-center text-secondary">
            <h2 id="title">{review.title}</h2>
            <StarRating rating={review.rating} showRating={false}/>
        </div>
        <p class="text-primary-3 text-body2 font-body">{diff}</p>
        <p id="comment" class="text-primary-3">{review.comment}</p>
    </div>
</div>

<style>
    /* TODO: add button to expand review when clicked */
    #review {
        display: flex;

        width: 98%;
        height: 150px;

        border-radius: 10px;
        margin-bottom: 10px;
        padding: 8px;
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

    #comment {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    #cover {
        height: 100%;
        align-self: center;
    }

    img {
        height: 100%;
        width: auto;
    }
</style>