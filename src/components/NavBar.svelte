<script lang="ts">
	import HeaderSearchBar from './HeaderSearchBar.svelte';
    import { isOverlayOpen } from '../stores/OverlayStore';

    export let loggedIn: Boolean;

    function openOverlay() {
        isOverlayOpen.set(true)
    }

</script>

<div id="navBar" class="{loggedIn === true ? 'bg-primary-3' : 'bg-primary-1 bg-opacity-25'} w-full h-14 flex justify-between content-center m-0">
	<a id="logo" href="/authentication" class="self-center p-4 font-logo text-primary-1 text-2xl">GreatReads</a>

    {#if loggedIn}
        <div id="rightNav" class="flex justify-around content-center">
            <ul class="flex justify-around">
                <a href="null">
                    <li class="list-none p-3 text-primary-1 font-heading text-lg">My Library</li>
                </a>
            </ul>
            <HeaderSearchBar />

            <!-- user icon -->
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="0.8"
                stroke="currentColor"
                class="w-12 h-12 text-primary-1 self-center mr-2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        </div>
    {:else}
        <div id="rightNav" class="flex justify-around content-center">
            <button on:click={openOverlay}><p class="list-none p-3 text-primary-1 font-heading text-lg font-300">Log In</p></button>
            <p class="list-none p-3 text-primary-1 font-heading text-lg font-300">|</p>
            <a href="/authentication/register"><p class="list-none p-3 text-primary-1 font-heading text-lg font-300">Register</p></a>
        </div>
    {/if}
</div>
	

<style>

</style>
