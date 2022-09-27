<script>
    let background = "src/routes/authentication/login.jpeg";
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


