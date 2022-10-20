<script lang="ts">
	//TODO: pass in voteCount from parent component and dispatch event when changed

	let colourUp: string = 'text-primary-3';
	let colourDown: string = 'text-primary-3';
	let hoverUp: string = 'hover:text-accent';
	let hoverDown: string = 'hover:text-accent';
	let clickedUp: boolean = false;
	let clickedDown: boolean = false;
	let voteCount: number = 0; // get from database

	// User can vote at most once in either direction, and can change their vote
	function handleClickUp() {
		if (!clickedUp && !clickedDown) { // on first click
			voteCount++;
			colourUp = 'text-accent';
			clickedUp = true;
			clickedDown = false;
			hoverUp = '';
			hoverDown = 'hover:text-accent';
		} else if (clickedUp && !clickedDown) { // already upvoted; undo upvote
			voteCount--;
			colourUp = 'text-primary-3';
			clickedUp = false;
			hoverUp = 'hover:text-accent';
		} else if (!clickedUp && clickedDown) { // was downvoted, now upvoted
			voteCount += 2;
			colourUp = 'text-accent';
			colourDown = 'text-primary-3';
			clickedUp = true;
			clickedDown = false;
			hoverUp = '';
			hoverDown = 'hover:text-accent';
		}
	}
	function handleClickDown() {
		if (!clickedDown && !clickedUp) { // on first click
			voteCount--;
			colourDown = 'text-accent';
			clickedUp = false;
			clickedDown = true;
			hoverUp = 'hover:text-accent';
			hoverDown = '';
		} else if (!clickedUp && clickedDown) { // already downvoted; undo downvote
			voteCount++;
			colourDown = 'text-primary-3';
			clickedDown = false;
			hoverDown = 'hover:text-accent';
		} else if (clickedUp && !clickedDown) { // was upvoted, now downvoted
			voteCount -= 2;
			colourUp = 'text-primary-3';
			colourDown = 'text-accent';
			clickedUp = false;
			clickedDown = true;
			hoverUp = 'hover:text-accent';
			hoverDown = '';
		}
	}
</script>

<div class="flex flex-col justify-center items-center">
	<!-- svelte-ignore a11y-mouse-events-have-key-events -->
	<div class="w-5 h-5" style="cursor:pointer" on:click|stopPropagation={() => handleClickUp()}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="2.5"
			stroke="currentColor"
			class="w-5 h-5 {colourUp} {hoverUp}"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
			/>
		</svg>
	</div>

	<p class="text-primary-3 font-body text-center leading-tight">{voteCount}</p>

	<!-- svelte-ignore a11y-mouse-events-have-key-events -->
	<div class="w-5 h-5" style="cursor:pointer" on:click|stopPropagation={() => handleClickDown()}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="2.5"
			stroke="currentColor"
			class="w-5 h-5 {colourDown} {hoverDown}"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
			/>
		</svg>
	</div>
</div>
