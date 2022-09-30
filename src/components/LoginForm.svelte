<script>
    import { isOverlayOpen } from "../stores/OverlayStore";

    function closeOverlay () {
        isOverlayOpen.set(false)
    }

</script>

<form method="POST" action="?/login">
    <p id="heading" class="text-secondary font-heading text-heading1">Log In</p>
    <div id="body">
        <div class="input bg-primary-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
            </svg>          
            <input class="bg-primary-1 font-heading" name="username" type="username" placeholder="Email"> 
        </div>
        <div class="input bg-primary-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>  
            <input class="bg-primary-1 font-heading" name="password" type="password" placeholder="Password">
        </div>
        <div id="buttons">
            <button on:click={closeOverlay} class="bg-primary-3 text-primary-1">Cancel</button>
            <button class="bg-accent text-primary-1">Submit</button>
        </div>
    </div>
    <!-- <button formaction="?/register">Register</button> -->
</form>

<style>
    #heading {
        margin-bottom: 10px;
    }

    input {
        padding-left: 40px;
        width: 100%;
        border-radius: 20px;
        padding-top: 5px;
        padding-bottom: 5px;

    }

    #body {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    #buttons {
        width: 60%;
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
    }

    button {
        border-radius: 20px;
        box-shadow: 0px 3px 4px gray;
        width: 30%;
        margin-left: 10px;
        padding: 2px 4px 2px 4px;
    }

    .input {
        border-radius: 20px;
        white-space: nowrap;
        width: 60%;
        margin-top: 15px;
    }
     
    svg {
        position: absolute;
        transform: translateY(20%);
        margin-left: 10px;
    }

    ::placeholder {
        color: black;
    }

    form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 30px 30px 50px 30px;
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        background-color: white;
        border-radius: 15px;
        z-index: 10;
    }
</style>
