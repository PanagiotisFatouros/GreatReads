<script>
	import { isOverlayOpen } from '../stores/OverlayStore';
	import { authenticated } from '../stores/AuthenticatedStore';
	import '../app.css';
	import NavBar from '../components/NavBar.svelte';
	import Overlay from '../components/Overlay.svelte';
	import { handleSilentRefresh } from 'lucia-sveltekit/client';
	import { navigating } from '$app/stores';

	import { RingLoader } from 'svelte-loading-spinners';

	import {getSession} from "lucia-sveltekit/client"
	import { browser } from '$app/environment';

	const session = getSession()
	
	if ($session) {
		authenticated.set(true);
	}

	handleSilentRefresh();

	function disableScroll() {
		const scrollY = window.scrollY;
		document.body.style.position = 'fixed';
		document.body.style.top = `-${scrollY}px`;
		document.body.style.overflow = 'hidden';
	}

	function enableScroll() {
		document.body.style.position = '';
		document.body.style.top = '';
		document.body.style.overflow = '';
		window.scrollTo(0, scrollY);
	}

	$: {
		if (browser) {
			if ($isOverlayOpen == true) {
				disableScroll();
			}
			else {
				enableScroll()
			}
		}
		
	}
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


