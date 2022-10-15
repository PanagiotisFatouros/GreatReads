<script>
	import { isOverlayOpen } from '../stores/OverlayStore';
	import { authenticated } from '../stores/AuthenticatedStore';
	import '../app.css';
	import NavBar from '../components/NavBar.svelte';
	import Overlay from '../components/Overlay.svelte';
	import { handleSilentRefresh } from 'lucia-sveltekit/client';
	import { navigating } from '$app/stores';

	import { Circle2, RingLoader } from 'svelte-loading-spinners';

	import {getSession} from "lucia-sveltekit/client"

	const session = getSession()
	
	if ($session) {
		authenticated.set(true);
	}

	handleSilentRefresh();
</script>

{#if $isOverlayOpen}
	<Overlay />
{/if}

<NavBar loggedIn={$authenticated}/>


{#if $navigating}
<div class='w-full flex justify-center mt-10'>
	<!-- <Circle2 colorInner={'#424C55'} colorCenter={'#15B097'} colorOuter={'#FF6663'}/> -->
	<RingLoader color={'#FF6663'} />
</div>
{:else}
<slot />
{/if}
