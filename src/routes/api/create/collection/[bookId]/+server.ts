import { createNewEntity } from '../../../../../database/mysql';
 
/** @type {import('./$types').RequestHandler} */
export async function POST({ params, request }){
    const bookId = params.bookId
    const { title, userId } = await request.json()
    let createdCollectionId;
    
    try {
        // Create user profile, which has username as the user's name in database
        createdCollectionId = await createCollection(userId, bookId, title)
        console.log(createdCollectionId)
    }
    catch(err){
      console.log(err)
      return new Response("Collection not successfully created")
    }
    return new Response(`Collection successfully created! New collection has ID ${createdCollectionId}`)
}

async function createCollection(userId: String, bookId: String, title: String){
    const table = "collection"
    const collectionFields = "(Title, CreationDate, IsPublic, Upvotes, BookId, UserId)"
    const creationDate = new Date().toISOString().slice(0, 19).replace('T', ' ')
    const collectionValues = `('${title}', '${creationDate}', '0', '0', '${bookId}', '${userId}')`
    const idCreatedCollection = await createNewEntity(table, collectionFields, collectionValues)
    console.log(idCreatedCollection)
    return idCreatedCollection
  }