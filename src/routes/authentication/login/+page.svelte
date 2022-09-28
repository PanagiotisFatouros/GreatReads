<script>
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
    import {getSession} from "lucia-sveltekit/client"
    import { authenticated } from "../../../stores/OverlayStore.js"

    const session = getSession()
    if ($session) {
        if (browser){
            goto('/authentication/success')
            authenticated.set(true)
        } 
    }
</script>


<form method="POST" action="?/login">
    <input name="username" type="username">
    <input name="password" type="password">
    <button>Login</button>
    <!-- <button formaction="?/register">Register</button> -->
</form>



<style>
    form {
        background-color: blue;
    }

</style>