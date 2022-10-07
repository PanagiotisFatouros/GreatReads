<script lang='ts'>
    import SearchBar from "../../components/SearchBar.svelte";
    import { goto } from '$app/navigation'

    let searchText:string = '';
</script>

<h1 class="text-heading1 font-heading text-primary-1">Welcome to GreatReads</h1>
<div id="container">
    <SearchBar bind:searchText on:click={() => goto(`/search?Books=${searchText}`)} placeholder="Find a book"/>
</div>


<style>
    h1 {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -40%);
        font-weight: 100;
        white-space: nowrap;
    }
    #container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 500px;
    }

</style>
