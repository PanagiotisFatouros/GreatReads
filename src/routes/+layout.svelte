<script>
	import { isOverlayOpen } from '../stores/OverlayStore';
	import '../app.css';
	import NavBar from '../components/NavBar.svelte';
	import Overlay from '../components/Overlay.svelte';

	
</script>

{#if $isOverlayOpen}
	<Overlay/>
{/if}

<NavBar />

<slot />
