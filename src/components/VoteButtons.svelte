<script lang="ts">
	//TODO:  - changing vote from up to down or vice versa should change count by 2 otherwise its just resetting to what it was before
	//       - clicking same button again should undo vote
	//       - pass in rating from parent component and dispatch event when changed

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let colourUp: string = 'text-primary-3';
	let colourDown: string = 'text-primary-3';
	let hoverable: string = 'hover:text-accent';
	let clickedUp: boolean = false;
	let clickedDown: boolean = false;
	
	export let rating: number = 0;

	// User can vote at most once in either direction, and can change their vote
	function handleClickUp() {
		if (!clickedUp) {
			rating++;
			colourUp = 'text-accent';
			colourDown = 'text-primary-3';
			clickedUp = true;
			clickedDown = false;
		}
		hoverable = '';
	}
	function handleClickDown() {
		if (!clickedDown) {
			rating--;
			colourDown = 'text-accent';
			colourUp = 'text-primary-3';
			clickedDown = true;
			clickedUp = false;
		}
		hoverable = '';
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
			class="w-5 h-5 {colourUp} {hoverable}"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
			/>
		</svg>
	</div>

	<p class="text-primary-3 font-body text-center leading-tight">{rating}</p>

	<!-- svelte-ignore a11y-mouse-events-have-key-events -->
	<div class="w-5 h-5" style="cursor:pointer" on:click|stopPropagation={() => handleClickDown()}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="2.5"
			stroke="currentColor"
			class="w-5 h-5 {colourDown} {hoverable}"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
			/>
		</svg>
	</div>
</div>
