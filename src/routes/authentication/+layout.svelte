<script lang="ts">
    import { getSession } from 'lucia-sveltekit/client';
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';

    const session = getSession()
    let background = "../../../../images/login.jpeg";
    
    if (browser){
        if ($session) {
            goto('/')
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


