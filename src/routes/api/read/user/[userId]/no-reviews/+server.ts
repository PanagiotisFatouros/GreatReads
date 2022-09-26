import type { RequestEvent } from '@sveltejs/kit';
import { prismaClient } from '../../../../../../lib/lucia';
import type { Client, Review } from '../../../../../../types/book.type'

export async function GET({ params }: RequestEvent) {

	const userId = params.userId || null
	let client: Client

	if (userId == null){
		return new Response("No User specified")
	}
	else {
		const prismaUser = await prismaClient.user.findUnique({
			where: {id: userId},
		})
		client = {
			name: prismaUser?.name || "",
			id: prismaUser?.id || "",
			profilePic: prismaUser?.profilePic || "",
			bio: prismaUser?.bio || "",
		}
		return new Response(JSON.stringify(client))
	}
}