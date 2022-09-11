<script lang="ts">
    let colourUp:string = "text-primary-3"
    let colourDown:string = "text-primary-3"
    let voteCount:number = 0

    function handleMouseOver(colour:string) {
		colour = 'text-accent';
	}
    function handleMouseOut(colour:string) {
		colour = 'text-primary-3';
	}
    function handleClick(colour:string) {
        if (colour = "text-primary-3") {
            voteCount++;
            colour = "text-accent";
        }
        
    }
</script>

<div class="w-4">
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    <div class="w-4" style="cursor:pointer" on:mouseover={() => handleMouseOver(colourUp)} on:mouseout={() => handleMouseOut(colourUp)} on:click={() => handleClick(colourUp)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 {colourUp}" >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"/>
        </svg>  
    </div>

    <p class="text-primary-3 font-body text-center w-6">{voteCount}</p>

    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    <div class="w-4" style="cursor:pointer" on:mouseover={() => handleMouseOver(colourDown)} on:mouseout={() => handleMouseOut(colourDown)} on:click={() => handleClick(colourDown)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 {colourDown}" >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"/>
        </svg>  
    </div>
</div>