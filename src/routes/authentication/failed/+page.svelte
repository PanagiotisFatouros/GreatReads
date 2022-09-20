<script lang=ts>
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
    import {getSession} from "lucia-sveltekit/client"
    const session = getSession()
    
    if (!$session){
        if (browser){
            setTimeout(function(){ goto('/authentication') } , 2000);
        }
    }
</script>

<h1>Login/Register Failed! Redirecting back to login/registration page...</h1>