<script>
	import HeaderSearchBar from './HeaderSearchBar.svelte';
</script>

<div id="navBar" class="bg-primary-3 w-full h-14 flex justify-between content-center m-0">
	<a id="logo" href="/" class="self-center p-4 font-logo text-primary-1 text-2xl">GreatReads</a>

	<div id="rightNav" class="bg-primary-3 flex justify-around content-center space-x-2">
		<ul class="flex justify-around">
			<li class="hover:bg-hover-primary-3 list-none flex justify-center items-center text-primary-1 font-heading text-lg"><a href="/" class=" w-full h-full px-3 flex justify-center items-center">Browse</a></li>
			<li class="hover:bg-hover-primary-3 list-none flex justify-center items-center text-primary-1 font-heading text-lg"><a href="/library/bookshelves" class=" w-full h-full px-3 flex justify-center items-center">Library</a></li>
		</ul>

		<HeaderSearchBar />

		<!-- dropdown meny -->
        <div class=" h-full inline-block float-right group">
			<button class=' h-full flex justify-center items-center group-hover:bg-hover-primary-3 px-2'>
				<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="0.8"
				stroke="currentColor"
				class="w-12 h-12 text-primary-1 self-center"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
			</button>
			

			<div class=" absolute right-0 hidden group-hover:block font-body bg-primary-3 shadow-lg text-white self-start" id="dropdown-content">
				<a href="/sign-out" class='block px-5 py-1 hover:bg-hover-primary-3'>Sign Out</a>
				<a href="/settings" class='block px-5 py-1 hover:bg-hover-primary-3'>Settings</a>	
			</div>
		</div>
		
	</div>
</div>

<style>
	#dropdown-content {
		z-index: 5;
	}
</style>