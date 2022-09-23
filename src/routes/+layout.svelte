<script>
	import { isOverlayOpen } from '../stores/OverlayStore';
	import '../app.css';
	import NavBar from '../components/NavBar.svelte';
	import Overlay from '../components/Overlay.svelte';
	import { handleSilentRefresh } from 'lucia-sveltekit/client';

	handleSilentRefresh();
</script>

{#if $isOverlayOpen}
	<Overlay />
{/if}

<NavBar />

<slot />
