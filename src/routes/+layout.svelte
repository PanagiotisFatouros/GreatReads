<script>
	import '../app.css';
	import NavBar from '../components/NavBar.svelte';
	import { handleSilentRefresh } from "lucia-sveltekit/client";
	handleSilentRefresh();

</script>

<NavBar />

<slot />
