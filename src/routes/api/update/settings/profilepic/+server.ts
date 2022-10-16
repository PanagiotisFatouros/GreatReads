import { BlobServiceClient } from '@azure/storage-blob';
import type { BlockBlobUploadOptions, BlobHTTPHeaders } from '@azure/storage-blob';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { prismaClient } from '$lib/lucia';

// Create connection to blob storage
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(process.env.PROFILE_PHOTOS_CONTAINER_NAME);

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: RequestEvent) {
    let { id, mimeType, profilePic, length } = await request.json();
    let userResponse;

    try {
        // Put image in blob storage
        let blobClient = containerClient.getBlockBlobClient(id);
        console.log(`\nUploading to Azure storage as blob\n\tname: ${id}:\n\tURL: ${blobClient.url}`);
        

        // Azure requires us to switch to a binary encoding
        var matches = profilePic.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        var type = matches[1];
        var buffer = new Buffer(matches[2], 'base64');

        // Upload data with the mime type
        let options: BlockBlobUploadOptions = {
            blobHTTPHeaders: {
                blobContentType: mimeType
            }
        }
        blobClient.upload(buffer, length, options)
        .then(
            (response)=>{
                console.log(`\n Upload of image was successful: requestId: ${response.requestId}`);
            }
        ).catch(
            (err)=>{
                throw error(400, `Profile picture not submitted, error: ${err}`)
        })


        const prismaUser = await prismaClient.user.findUnique({
            where: { id: id }
        });
        console.log(prismaUser)
        if (prismaUser != null) {
            userResponse = await prismaClient.user.update({
                where: {
                    id: id
                },
                data: {
                    profilePic: true
                }
            })
            console.log(`${userResponse.id} profile picture extension was updated to ${userResponse.profilePic}`);
        }
        return new Response(JSON.stringify(userResponse))
    }
    catch (err) {
        throw error(400, `Profile picture not submitted, error: ${err}`)
    }

}    