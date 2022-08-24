<script>
    import SearchBar from "./SearchBar.svelte";
</script>

<div id="navBar" class="bg-primary-3 w-full h-14 flex justify-between content-center m-0">
    <a id="logo" href="null" class="self-center p-4 font-logo text-primary-1 text-2xl">GreatReads</a>
    
    <div id="rightNav" class="bg-primary-3 flex justify-around content-center">
        <ul class="flex justify-around">
            <a href="null"><li class="list-none p-3 text-primary-1 font-heading text-lg">Browse</li></a>
            <a href="null"><li class="list-none p-3 text-primary-1 font-heading text-lg">My Library</li></a>
        </ul>

        <SearchBar/>

        <img id="userIcon" src={"./images/user.svg"} alt="User Icon" class=" mr-2 h-10 self-center"/>
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