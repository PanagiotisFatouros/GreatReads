import { auth } from "$lib/lucia";
import { error } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit'
import { prismaClient } from '$lib/lucia'
import type { User } from '@prisma/client'
 
/** @type {import('./$types').RequestHandler} */
export async function DELETE ({ params }:RequestEvent){
    const userId: string = params.userId || ""
    let user: User | null
    if (userId == ""){
        throw error(400, `userId not specified/invalid, delete user failed!`)
    }
    try {
        user = await prismaClient.user.findUnique({
            where:{
                id: userId
            }
        })
        if (user != null){
            await auth.deleteUser(userId)
        }
        else {
            throw error(400, `userId not specified/invalid, delete user failed!`)
        }
        
    }
    catch(err){
        throw error(400, `User not deleted, unknown error: ${err}`)
    }
    return new Response(`User successfully deleted! Deleted review: ${JSON.stringify(user)}`)
}
