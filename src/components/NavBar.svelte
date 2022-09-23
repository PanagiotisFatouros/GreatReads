<script>
    import HeaderSearchBar from "./HeaderSearchBar.svelte";
</script>

<div id="navBar" class="bg-primary-3 w-full h-14 flex justify-between content-center m-0">
    <a id="logo" href="null" class="self-center p-4 font-logo text-primary-1 text-2xl">GreatReads</a>
    
    <div id="rightNav" class="bg-primary-3 flex justify-around content-center">
        <ul class="flex justify-around">
            <a href="null"><li class="list-none p-3 text-primary-1 font-heading text-lg">Browse</li></a>
            <a href="null"><li class="list-none p-3 text-primary-1 font-heading text-lg">My Library</li></a>
        </ul>

        <HeaderSearchBar/>

        <!-- user icon -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.8" stroke="currentColor" class="w-12 h-12 text-primary-1 self-center mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
          
    </div>

</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Crete+Round&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap');

    /* #navBar {
        background-color: #424C55;
        width: 100%;
        height: 55px;
        display: flex;
        justify-content: space-between;
        align-content: center;
        margin: 0;
    } */
    /* #logo {
        align-self: center;
        padding: 1em;
        font-family: 'Crete Round', serif;
        color: white;
        font-size: x-large;
    } */
    /* #userIcon {
        margin-right: 10px;
        height: 40px;
        width: auto;
    } */
    /* li {
        list-style: none;
        padding: 1em;
        color: white;
        font-family: 'Quicksand', sans-serif;
        font-size: larger;
        white-space: nowrap;
    } */
    /* ul {
        display: flex;
        justify-content: space-around;
    } */
    /* a {
        text-decoration: none;
    } */
    /* a:hover {
        text-decoration: none;
    } */

    /* #rightNav {
        display: flex;
        justify-content: space-around;
        align-items: center;
    } */
</style>