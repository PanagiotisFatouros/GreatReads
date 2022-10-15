<script lang="ts">
    import type {Book} from '../types/book.type'
	import AbbreviatedBookCard from './AbbreviatedBookCard.svelte';
    
    let book1: Book = {
		id: '7H5dEAAAQBAJ',
        avgRating: 0,
		title: 'Confidence Man',
		authors: ['Maggie Haberman'],
		pageCount: 608,
		genres: ['Political Science', 'American Government', 'Executive Branch', 'National, Political Science', 'American Government', 'General'],
		isbn: '9780593297353',
		datePublished: '4 October 2022',
		imageURL:
        'http://books.google.com/books/publisher/content?id=7H5dEAAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE7307UYYLLUP5eVnvOT_X3sUchlk_InpNwA3ssRWWLGrzTahKIXBjhxzCWjXq7hvNkyZFkSb5XV3nHqt4yPDLXx4iVERdUCHQeCzF_QBk1UDoopHy5JmcK1GgqxE3t_phVvRTUVz&source=gbs_api'
	};

    let book2: Book = {
		id: 'wmnuDwAAQBAJ',
        avgRating: 0,
		title: 'It Ends with Us',
		authors: ['Colleen Hoover'],
		pageCount: 448,
		genres: ['Fiction', 'Romance', 'Contemporary, Fiction', 'Women, Fiction', 'Romance', 'General'],
		isbn: '9781982143657',
		datePublished: '28 July 2020',
		imageURL:
        'http://books.google.com/books/publisher/content?id=wmnuDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71qcLbbdOrAsHeskeQ7Lduu96YacM19O8Tz2rqKO7PganHPuM5HV8EMc7mNX91Vlx7_1Bjgi8NKsmo0DH34M0Zjo3yuzIfXiv07bSG-JiTyA05p4-wsnC0HryFmSWkonfIFrwtO&source=gbs_api'
	};

    let book3: Book = {
		id: 'ISxGEAAAQBAJ',
        avgRating: 0,
		title: 'Verity',
		authors: ['Colleen Hoover'],
		pageCount: 336,
		genres: ['Fiction', 'Thrillers', 'Psychological, Fiction', 'Thrillers', 'Suspense, Fiction', 'Romance', 'Contemporary'],
		isbn: '9781982143657',
		datePublished: '5 October 2021',
		imageURL:
        'http://books.google.com/books/publisher/content?id=ISxGEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72VOZaaCMJ_zgPODRwc7eEB28YWK8y3eGw9n4mD4kzJBVEzMPTjaXU4NvNItvptMg7_UNxwg5QsllnRSD8kjXKkxDvoYKPXSgLeJLRx8zm4woOxsf9NVcKJvzvQTLc0p11qdjGD&source=gbs_api'
	};

    let book4: Book = {
        id: 'X6FSEAAAQBAJ',
        avgRating: 0,
		title: 'Lighter',
		authors: ['Yung Pueblo'],
		pageCount: 288,
		genres: ["Body, Mind & Spirit", "Healing" , "General, Body, Mind & Spirit" , "Inspiration & Personal Growth, Self-Help" , "Personal Growth" , "General, Health & Fitness" , "Alternative Therapies, Body, Mind & Spirit" , "General"],
		isbn: '9781473595910',
		datePublished: '6 October 2022',
		imageURL:
        'http://books.google.com/books/publisher/content?id=X6FSEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE70aZVbGyIkHKaM5XIeAWtlni7QYkWCFFngW9impucRjduK_zx7APuy6f3qTD9vPDbYiPfIJjCyR27DxZo5y1T35LdIlC6NGskwQNDNl_laN9aD9qc7uPC-9zd0p_R6F-oVrRnpp&source=gbs_api'
    }

    let book5: Book = {
        id: "3wZaEAAAQBAJ",
        avgRating: 0,
        title: 'Fairy Tale',
        authors: ['Stephen King'],
        pageCount: 592,
        genres: ["Fiction" , "Fantasy" , "General, Fiction" , "Fantasy" , "Action & Adventure, Fiction" , "Fantasy" , "Contemporary, Fiction" , "General"],
        isbn: '9781399705431',
        datePublished: '6 September 2022',
        imageURL: "http://books.google.com/books/publisher/content?id=3wZaEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71mUibPKr6WF4lP8aE2NVC8koGFSd3eBgiagb0uavIvBQMiFg4R5MBUeasB1QHQ4wI69ILxL9wwvIJWg5f_g-7n2Fo9CEKIm6_ShemhI8M7CZY8Tlrkq16tOZ4H27NGMLTxTQdZ&source=gbs_api"
    }

    let mostPopular = [book1, book2, book3, book4, book5]
</script>

<div>
    <div id="head" class="font-body text-body">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgb(255, 102, 99)" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>                  
        <p>What's Popular</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgb(21, 176, 151)" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
    </div>
    <hr class=" border-1 border-primary-3 my-3" />
    <div id="book-container">
        {#each mostPopular as book, i}
            <div id="book">
                <p id="rank" class="text-heading1 font-heading text-secondary">{i + 1}</p>
                <AbbreviatedBookCard book={book}/>
            </div>
        {/each}
    </div>
</div>

<style>
    #head {
        display: flex;
        justify-content: flex-start;
    }
    #head > * {
        margin-right: 5%;
    }
    #book {
        display: flex;
        align-items: center;
    }
    #book-container {
        display: flex;
        flex-direction: column;
        width: 80%;
    }
    #book-container > * {
        margin-bottom: 5%;
    }
    #rank {
        margin-right: 5%;
    }
</style>

