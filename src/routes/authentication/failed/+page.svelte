<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { getSession } from 'lucia-sveltekit/client';
	import { isOverlayOpen } from '../../../stores/OverlayStore';
	import { RingLoader } from 'svelte-loading-spinners'

	const session = getSession();

	if (!$session) {
		if (browser) {
			setTimeout(function () {
				goto('/authentication/login');
			}, 2000);
		}
	}
	isOverlayOpen.set(true);
	
</script>

<div id="main">
	<p class="text-primary font-heading text-heading2">Invalid credentials, Please try again</p>
	<RingLoader color="rgb(255, 102, 99)" size="60" unit="px" duration="1.5s"/>
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
