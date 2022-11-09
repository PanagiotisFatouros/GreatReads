import lucia from 'lucia-sveltekit';
import prisma from '@lucia-sveltekit/adapter-prisma';
import { PrismaClient } from '@prisma/client';

export const prismaClient = new PrismaClient();

export const auth = lucia({
	adapter: prisma(prismaClient),
	secret: process.env.LUCIA_SECRET,
	env: "DEV"
	//env: dev ? "DEV" : "PROD"
});
