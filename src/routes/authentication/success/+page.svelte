<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { getSession } from 'lucia-sveltekit/client';

	import { BarLoader } from 'svelte-loading-spinners';
	import { isOverlayOpen } from '../../../stores/OverlayStore';

	const session = getSession();
	if ($session) {
		if (browser) {
			setTimeout(function () {
				goto('/');
			}, 2000);
		}
	}

	isOverlayOpen.set(true);

</script>

<div id="main">
	<p class="text-primary font-heading text-heading2">Login successful!</p>
	<BarLoader color="rgb(255, 102, 99)" size="145" unit="px" duration="1.5s"/>
</div>

<style>
	#main {
        position: absolute;
        top: 50%;
        left: 50%;
		width: 50%;
        transform: translate(-50%, -50%);
        padding: 20px 30px 50px 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: white;
        border-radius: 15px;
        z-index: 10;
		height: 275px;
    }
</style>

