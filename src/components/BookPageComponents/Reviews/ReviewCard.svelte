<script lang="ts">
	import type { Review, User } from "src/types/book.type";
    import StarRating from "../../StarRating.svelte";
    import VoteButtons from "../../VoteButtons.svelte";

    const MINUTE = 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;
    const WEEK = DAY * 7;
    const MONTH = DAY * 30;
    const YEAR = DAY * 365;

    function getTimeAgo(date:Date) {
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
    
    export let review: Review;

    

    let diff = getTimeAgo(review.date);

</script>

<div class="bg-primary-1 rounded-lg my-3 px-3">
    <div class="flex justify-between items-center py-2"> 
        <div class="flex items-center space-x-3">
            <div class=" w-12 h-12 bg-gray-600 rounded-full overflow-hidden flex justify-center items-center">
                <img src={review.user.profilePic} alt="user profile pic">
            </div>
            
            <div class="flex flex-col justify-start">
                <div class="flex items-center text-secondary space-x-2">
                    <h2 id="title">{review.title}</h2>
                    <StarRating rating={review.rating} showRating={false}/>
                </div>
                <div class='flex items-center space-x-1'>
                    <p class=" text-primary-2">{review.user.name}</p>
                    <p class="text-primary-3 text-body2 font-body">- {diff}</p>
                </div>
            </div>
        </div>

        <VoteButtons />

    </div>
    <p class="text-primary-3 pb-3">{review.comment}</p>
</div>