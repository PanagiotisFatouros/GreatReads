import type { ServerLoadEvent } from '@sveltejs/kit';
import { auth } from '$lib/lucia';
import { redirect } from '@sveltejs/kit';
import { prismaClient } from '../../lib/lucia';
import type { Client } from '../../types/book.type';
import { BlobServiceClient } from '@azure/storage-blob';

// Create connection to blob storage
let containerName = 'profile-photos';
let AZURE_STORAGE_CONNECTION_STRING: string = 'DefaultEndpointsProtocol=https;AccountName=greatreadsblobstorage;AccountKey=b8DpLC3HoaRgip+rjzn2RcjRXw4fed4vEqTC6jRSQcFeu+HApYy9OjCtg3GHyuV0Fva49FAtvtEi+AStndok2g==;EndpointSuffix=core.windows.net';
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(containerName);


/** @type {import('./$types').PageServerLoad} */
export async function load({ request }: ServerLoadEvent) {
    try {
        const session = await auth.validateRequestByCookie(request);
        if (session) {

            const userID = session.user.user_id;

            const prismaUser = await prismaClient.user.findUnique({
                where: { id: userID }
            })

            if (prismaUser != undefined) {
                const client: Client = {
                    name: prismaUser.name || '',
                    id: prismaUser.id || '',
                    profilePic: prismaUser.profilePic || '',
                    bio: prismaUser.bio || '',
                    favAuthor: prismaUser.favAuthor || '',
                    favGenre: prismaUser.favGenre || ''
                    //TODO: add email
                }

                return {
                    client: client
                };
            }


        } else {
            //not authenticated
            throw redirect(307, '/authentication');
        }
    } catch (err) {
        console.log(err);
        //not authenticated
        throw redirect(307, '/authentication');
    }
}

async function uploadFileToStorage(file: string, fileExt: String, user: Client) {
    let blobClient = containerClient.getBlockBlobClient(user.id + fileExt);
    console.log(`\nUploading to Azure storage as blob\n\tname: ${user.id}:\n\tURL: ${blobClient.url}`);
    let uploadResponse = await blobClient.upload(file, file.length);
    console.log('\n Upload of image was successful: requestId: ${uploadResponse.requestId}');
}