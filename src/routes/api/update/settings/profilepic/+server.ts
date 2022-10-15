import { BlobServiceClient } from '@azure/storage-blob';
import type { BlockBlobUploadOptions, BlobHTTPHeaders } from '@azure/storage-blob';
import uploadFileToBlob from '@azure/storage-blob';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { prismaClient } from '$lib/lucia';
import { ImageExt } from '@prisma/client';

// Create connection to blob storage
let containerName = 'profile-photos';
let AZURE_STORAGE_CONNECTION_STRING: string = 'DefaultEndpointsProtocol=https;AccountName=greatreadsblobstorage;AccountKey=b8DpLC3HoaRgip+rjzn2RcjRXw4fed4vEqTC6jRSQcFeu+HApYy9OjCtg3GHyuV0Fva49FAtvtEi+AStndok2g==;EndpointSuffix=core.windows.net';
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(containerName);



/** @type {import('./$types').RequestHandler} */
export async function POST({ request }: RequestEvent) {
    let { id, fileType, profilePic } = await request.json();
    console.log(profilePic);
    console.log(id)
    console.log(fileType)
    let userResponse;
    // if (typeof profilePic != "string") {
    //     throw error(400, 'Profile picture not valid');
    // }

    try {
        // Put image in blob storage
        let blobClient = containerClient.getBlockBlobClient(id/*+ "." + fileType.substring(6, fileType.length)*/);
        console.log(`\nUploading to Azure storage as blob\n\tname: ${id}:\n\tURL: ${blobClient.url}`);
        let options: BlockBlobUploadOptions = {
            blobHTTPHeaders: {
                blobContentType: fileType,
                blobContentEncoding: "base64"
            }
        }
        let uploadResponse = await blobClient.upload(profilePic, profilePic.length, options);
        console.log(`\n Upload of image was successful: requestId: ${uploadResponse.requestId}`);


        // const prismaUser = await prismaClient.user.findUnique({
        //     where: { id: id }
        // });

        // if (prismaUser != null) {
        //     let ext = ImageExt.PNG;
        //     if (fileType == "image/jpeg") {
        //         //ext = ImageExt.JPEG;
        //     } else {
        //         ext = ImageExt.PNG;
        //     }
        //     console.log(ext)
        //     userResponse = await prismaClient.user.update({
        //         where: {
        //             id: id
        //         },
        //         data: {
        //             profilePicExt: ext
        //         }
        //     })
        //     console.log(`${userResponse.id} profile picture extension was updated to ${userResponse.profilePicExt}`);
        // }
        return new Response(JSON.stringify(userResponse))
    }
    catch (err) {
        throw error(400, `Profile picture not submitted, error: ${err}`)
    }

}    