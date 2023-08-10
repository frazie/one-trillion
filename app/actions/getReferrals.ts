import prisma from "@/app/libs/prismadb";

interface ReferralProps {
    userid: string
}

export default async function getReferrals({userid}: ReferralProps){
    const userRefferals = await prisma.referral.findMany({
        where: {
            referrerId: userid
        }
    })
    

    const totalReferrals = userRefferals.length

    return totalReferrals
}