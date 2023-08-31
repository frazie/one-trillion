import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";


export default async function getReferrals(){
    const currentUser = await getCurrentUser()

    const userRefferals = await prisma.referral.findMany({
        where: {
            referrerId: currentUser?.id || ''
        }
    })
    

    const totalReferrals = userRefferals.length

    return totalReferrals
}