<script>
</script>

<div id="library">
    <div id="card" class="bg-primary-3">
        <div id="Header" class="bg-secondary">
            <span>Tear Jerkers</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
        </div>
        <div id="Book1" class="bg-primary-3"> </div>
        <div id="Book2" class="bg-primary-3"> </div>
        <div id="Book3" class="bg-primary-3"> </div>
        <div id="Footer" class="bg-secondary"></div>
    </div>
</div>

<style>
    #library {
        width: 100%;
        height: 40vh;
    }
    #card {
        border-radius: 10px;
        height: 80%;
        width: 15%;
        margin: 5%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
    }
    #Header {
        width: 100%;
        height: 13%;
        border-radius: 10px 10px 0 0;
        display: flex;
        justify-content: space-between;
    }

    #Header > * {
        margin-left: 5%;
        margin-right: 5%;
        align-self: center;
    }

    #Book1, #Book2, #Book3 {
        position: absolute;
        box-shadow: 2px 2px 5px black;
        height: 50%;
        width: 40%;
    }

    #Book1 {
        top: 20%;
        left: 10%;
        z-index: 3;
    }
    #Book2 {
        top: 30%;
        left: 30%;
        z-index: 2;
    }
    #Book3 {
        top: 40%;
        left: 50%;
        z-index: 1;
    }

    #Header span {
        color: white;
        font-weight: 400;
    }

    #Footer {
        width: 100%;
        height: 5%;
        border-radius: 0 0 10px 10px;
    }
</style>