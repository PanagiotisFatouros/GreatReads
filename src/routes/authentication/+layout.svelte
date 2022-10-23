<script lang="ts">
	import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
	import { getSession } from "lucia-sveltekit/client";
    
    let background = "../../../../images/login.jpeg";

    let session = getSession();
    $: {
        if ($session) {
            if (browser) {
                goto('/')
            }
        }
    }

</script>

<!-- svelte-ignore a11y-img-redundant-alt -->
<img src={background} alt="background image"/>

<style>
    img {
        position: absolute;
        top: 0;
        z-index: -1;
        height: 100vh;
        width: 100vw;
    }
</style>

<slot><!-- optional fallback --></slot>


