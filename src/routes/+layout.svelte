<script>
	import { isOverlayOpen } from '../stores/OverlayStore';
	import { authenticated } from '../stores/AuthenticatedStore';
	import '../app.css';
	import NavBar from '../components/NavBar.svelte';
	import Overlay from '../components/Overlay.svelte';
	import { handleSilentRefresh } from 'lucia-sveltekit/client';

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

<slot />
