import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";



export default async function getPlantedTrees() {
    const currentUser = await getCurrentUser()

    const treesPlanted = await prisma.trees.groupBy({
        by: ['userId'],
        where: {
            userId: {
                equals: currentUser?.id
            }
        },
        _sum: {
            tree: true
        }
    })

    const aggregateTrees = treesPlanted[0]._sum.tree
    return aggregateTrees
    
}