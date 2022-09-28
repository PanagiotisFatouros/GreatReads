<script>
	let bookshelf = {
		name: '20 Characters Max',
		books: [
			{
				img: 'http://books.google.com/books/content?id=wDVV6y-8YHEC&printsec=frontcover&img=1&zoom=1&source=gbs_api'
			}
		]
	};
</script>

<div id="card" class="bg-primary-3">
	<div id="Header" class="bg-secondary">
		<span>{bookshelf.name}</span>
		<svg
			id="more"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="white"
			class="w-6 h-6"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
		</svg>
	</div>
	<div id="Book1" class="bg-primary-3"><img src={bookshelf.books[0].img} alt="" /></div>
	<div id="Book2" class="bg-primary-3"><img src={bookshelf.books[0].img} alt="" /></div>
	<div id="Book3" class="bg-primary-3" />
	<div id="Footer" class="bg-secondary" />
</div>

<style>
	#card {
		border-radius: 10px;
		height: 270px;
		width: 200px;
		margin-right: 2.9%;
		margin-bottom: 1.5%;
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
		white-space: nowrap;
	}
	#Header > * {
		margin-left: 5%;
		margin-right: 5%;
		align-self: center;
	}
	#more {
		position: absolute;
		left: 80%;
	}
	#Book1,
	#Book2,
	#Book3 {
		position: absolute;
		box-shadow: 2px 2px 5px black;
		height: 128px;
		width: 80px;
	}
	img {
		width: 100%;
		height: 100%;
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
