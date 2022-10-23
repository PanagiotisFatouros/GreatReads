<script>
    import LoginForm from "../../../components/LoginForm.svelte";
    import { isOverlayOpen } from "../../../stores/OverlayStore";

    import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
    import {getSession} from "lucia-sveltekit/client"


    const session = getSession()
    if ($session) {
        if (browser){
            goto('/authentication/success')
        } 
    }
    isOverlayOpen.set(true)

</script>

{#if $isOverlayOpen}
    <LoginForm/>
{/if}

<style>
</style>
