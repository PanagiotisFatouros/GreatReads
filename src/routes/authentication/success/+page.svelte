<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { getSession } from 'lucia-sveltekit/client';
	import { isOverlayOpen } from '../../../stores/OverlayStore';

	import { BarLoader } from 'svelte-loading-spinners'

	const session = getSession();
	if ($session) {
		if (browser) {
			setTimeout(function () {
				goto('/');
			}, 2000);
		}
	}

	isOverlayOpen.set(false);
</script>


<BarLoader color="#1AA260" size="60" unit="px" duration="1.5s"/>

<h1>Authentication Success! Redirecting to homepage...</h1>

