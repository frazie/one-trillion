import { PrismaClient } from "@prisma/client";

declare global {
    var prisma : PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client

//this prevents errors from coming up as a result of hot releoad in next 13
//by initializing prisma client only once
//this file can then be imported to different processes acrsoss the application