<script lang="ts">
	import type { Book, Review } from '../types/book.type';

	export let show: boolean = false;
	export let sortReviews: boolean = false;
	export let books: Book[] = [];
	export let booksShown: Book[] = [];
	export let reviews: Review[] = [];
	export let reviewsShown: Review[] = [];

	export let sortOption = 0; // 0 = none, 1 = alphabetically, 2 = by rating, 3 = by date

	function handleClick() {
		if (!sortReviews) {
			if (sortOption == 1) {
				booksShown.sort(function (a, b) {
					return a.title > b.title ? 1 : -1;
				});
			} else if (sortOption == 2) {
				booksShown.sort(function (a, b) {
					return (a.avgRating ? a.avgRating : -1) < (b.avgRating ? b.avgRating : -1) ? 1 : -1;
				});
			} else if (sortOption == 3) {
				booksShown.sort(function (a, b) {
					return a.datePublished > b.datePublished ? 1 : -1;
				});
			}

			if (sortOption == 0) {
				let defaultBooks: Book[] = [];
				for (let book of books) {
					if (booksShown.includes(book)) {
						defaultBooks.push(book);
					}
				}
				booksShown = defaultBooks;
			} else {
				booksShown = booksShown;
			}
		} else {
			if (sortOption == 1) {
				reviewsShown.sort(function (a, b) {
					return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
				});
			} else if (sortOption == 2) {
				reviewsShown.sort(function (a, b) {
					return a.rating < b.rating ? 1 : -1;
				});
			} else if (sortOption == 3) {
				reviewsShown.sort(function (a, b) {
					return a.date > b.date ? 1 : -1;
				});
			}
			reviewsShown = sortOption == 0 ? reviews : reviewsShown;
		}

		show = false;
	}
</script>

<div
	class="bg-white w-96 pb-3 rounded-2xl border-solid border-2 border-primary-3 p-1 text-primary-3 font-body text-body2"
>
	<div class="flex w-full items-center justify-center">
		<div class="flex ml-auto">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
				stroke="currentColor"
				class="w-6 h-6 mt-1 mx-1 "
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
				/>
			</svg>

			<p class="text-heading2 font-heading ml-1">Sort</p>
		</div>

		<svg
			on:click={() => (show = false)}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="3"
			stroke="currentColor"
			class=" ml-auto w-5 h-5 mt-1 mr-1 cursor-pointer hover:opacity-70"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
		</svg>
	</div>

	{#each reviews as rv}
		{rv.title}
	{/each}
	{#each reviewsShown as rv}
		{rv.title}
	{/each}

	<div class="mx-2">
		<input
			type="radio"
			name="sortOptions"
			id="default"
			bind:group={sortOption}
			value={0}
			class="appearance-none w-3 h-3 mt-1 mr-1 rounded-full bg-white border-2 ring-primary-3 ring-2 checked:bg-secondary"
		/>
		<label for="default" class="mx-1">Default</label><br />
		<input
			type="radio"
			name="sortOptions"
			id="byName"
			bind:group={sortOption}
			value={1}
			class="appearance-none w-3 h-3 mt-1 mr-1 rounded-full bg-white border-2 ring-primary-3 ring-2 checked:bg-secondary"
		/>
		<label for="byName" class="mx-1">Alphabetically</label><br />
		<input
			type="radio"
			name="sortOptions"
			id="byRating"
			bind:group={sortOption}
			value={2}
			class="appearance-none w-3 h-3 mt-1 mr-1 rounded-full bg-white border-2 ring-primary-3 ring-2 checked:bg-secondary"
		/>
		<label for="byRating" class="mx-1">By Rating</label><br />
		<input
			type="radio"
			name="sortOptions"
			id="byDate"
			bind:group={sortOption}
			value={3}
			class="appearance-none w-3 h-3 mt-1 mr-1 rounded-full bg-white border-2 ring-primary-3 ring-2 checked:bg-secondary"
		/>
		<label for="byDate" class="mx-1">By Publication Date</label><br />
	</div>

	<div class="flex justify-center">
		<button
			on:click={() => handleClick()}
			class="std_button bg-secondary w-28 h-7 rounded-full mt-2 text-white">Sort</button
		>
	</div>
</div>
