<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';


    /** @type {import('./$types').ActionData} */
    export let form;

    if (form) {
        if (browser) {
            goto('/')
        }
    }

</script>

<div id="panel">
    <form method="POST">
        <h1 id="title" class="text-heading1 font-heading text-secondary">Register an Account</h1>
        <div class="input-container bg-primary-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>                       
            <input class="bg-primary-1 font-heading" name="fullName" type="text" placeholder="Full Name" required>
        </div>
        <div class="input-container bg-primary-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
            </svg>              
            <input class="bg-primary-1 font-heading" name="email" type="email" placeholder="Email Address" required>
        </div>
        <div class="input-container bg-primary-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>                            
            <input class="bg-primary-1 font-heading" name="password" type="password" placeholder="Password" required>
        </div>
        <div class="input-container bg-primary-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <input class="bg-primary-1 font-heading" name="confirmPassword" type="password" placeholder="Confirm Password" required>
        </div>
        <button class="btn font-heading bg-accent text-white">Submit</button>
    </form>
</div>


<style>
    #title {
        transform: translateY(-200%);
    }
    #panel {
        display: flex;
        align-items: center;
        width: 40%;
        height: calc(100vh - 3.5rem);
        background-color: white;
    }
    form {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
    }

    svg {
        position: absolute;
        transform: translateY(20%);
        margin-left: 15px;
    }

    input {
        padding-left: 50px;
        padding-top: 1.5%;
        padding-bottom: 1.5%;
        border-radius: 20px;
        width: 100%;
    }
    .input-container {
        border-radius: 20px;
        width: 70%;
        margin-bottom: 20px;
    }

    button {
        margin-top: 10%;
        width: 40%;
        padding: 2px 20px 2px 20px;
        border-radius: 20px;
        box-shadow: 0px 3px 4px gray; ;
    }

</style>


