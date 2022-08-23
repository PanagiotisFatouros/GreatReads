<script>

</script>

<div id="navBar">
    <h1 id="logo">GreatReads</h1>
    
    <ol>
        <li>Browse</li>
        <li>My Library</li>
    </ol>

    <img id="userIcon" src={"./images/user.svg"} alt="User Icon"/>

</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Crete+Round&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap');

    #navBar {
        background-color: #424C55;
        width: 100%;
        height: 55px;
        display: flex;
        justify-content: space-between;
        align-content: center;
        margin: 0;
    }
    #logo {
        align-self: center;
        padding: 1em;
        font-family: 'Crete Round', serif;
        color: white;
    }
    #userIcon {
        margin-right: 10px;
        height: 40px;
        width: auto;
        align-self: center;
    }
    li {
        list-style: none;
        padding: 1em;
        color: white;
        font-family: 'Quicksand', sans-serif;
        font-size: larger;
    }
    ol {
        display: flex;
        justify-content: space-around;
        align-self: center;
    }
</style>