import lucia from "lucia-sveltekit";
import prisma from "@lucia-sveltekit/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()

export const auth = lucia({
    adapter: prisma(client),
    secret: ")J@NcRfUjXn2r5u7x!A%D*G-KaPdSgVk",
    // env: dev ? "DEV" : "PROD",
    env: "DEV"
});