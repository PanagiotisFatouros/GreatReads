<script>
    import SearchBar from "../../components/SearchBar.svelte";
    import { isOverlayOpen } from "../../stores/OverlayStore";
    import LoginForm from "../../components/LoginForm.svelte";

    import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
    import {getSession} from "lucia-sveltekit/client"
    import { authenticated } from "../../stores/OverlayStore.js"

    const session = getSession()
    if ($session) {
        if (browser){
            goto('/authentication/success')
            authenticated.set(true)
        } 
    }
</script>

{#if $isOverlayOpen}
    <LoginForm/>
{/if}

<h1 class="text-heading1 font-heading text-primary-1">Welcome to GreatReads</h1>
<div id="container">
    <SearchBar placeholder="Find a book"/>
</div>


<style>
    h1 {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -40%);
        font-weight: 100;
        white-space: nowrap;
    }
    #container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 500px;
    }

</style>
