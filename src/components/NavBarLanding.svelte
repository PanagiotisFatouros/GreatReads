<script lang="ts">
	import { isOverlayOpen } from '../stores/OverlayStore';
	import { page } from '$app/stores';
	import HeaderSearchBar from './HeaderSearchBar.svelte';

	function openOverlay() {
		isOverlayOpen.set(true);
	}

	function ifLanding(path: String) {
		if (path.includes('authentication')) {
			return true;
		} else {
			return false;
		}
	}
	$: landing = ifLanding($page.url.toString());
</script>

<div
	id="navBar"
	class="{landing
		? 'bg-primary-1 bg-opacity-25'
		: 'bg-primary-3'} w-full h-14  flex justify-between content-center m-0"
>
	<a id="logo" href={'/authentication'} class="self-center p-4 font-logo text-primary-1 text-2xl"
		>GreatReads</a
	>
	{#if !landing}
		<HeaderSearchBar />
	{/if}
	<div id="rightNav" class="flex justify-around content-center">
		<a href="/authentication/login" on:click={openOverlay}
			><p class="list-none p-3 text-primary-1 font-heading text-lg font-300">Log In</p></a
		>
		<p class="list-none p-3 text-primary-1 font-heading text-lg font-300">|</p>
		<a href="/authentication/register"
			><p class="list-none p-3 text-primary-1 font-heading text-lg font-300">Register</p></a
		>
	</div>
</div>
