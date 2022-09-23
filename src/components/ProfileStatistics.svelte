<script>
	let person = {
		booksRead: 45,
		numReviews: 53,
		averageRating: 3.9,
		favAuthor: 'Suzanne Collins',
		favGenre: 'Crime'
	};
</script>

<div id="card" class="bg-primary-1">
	<p class="font-body text-primary-3">
		Books Read: <span class="text-primary-2">{person.booksRead}</span>
	</p>
	<p class="font-body text-primary-3">
		Number of Reviews: <span class="text-primary-2">{person.numReviews}</span>
	</p>
	<p class="font-body text-primary-3">
		Average Rating: <span class="text-primary-2">{person.averageRating}</span>
	</p>
	<p class="font-body text-primary-3">
		Favourite Author: <span class="text-primary-2">{person.favAuthor}</span>
	</p>
	<p class="font-body text-primary-3">
		Favourite Genre: <span class="text-primary-2">{person.favGenre}</span>
	</p>
</div>

<style>
	#card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-radius: 15px;
		width: 100%;
		height: 150px;
		padding: 10px;
		overflow-x: auto;
		white-space: nowrap;
	}
</style>
