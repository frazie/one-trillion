import prisma from "@/app/libs/prismadb";

interface TreeProps {
    userid: string  
}

export default async function getPlantedTrees({userid}: TreeProps) {
    const treesPlanted = await prisma.trees.aggregate({
        _sum: {
            tree: true
        },
        where: {
            userId: userid
        }
    })

    return treesPlanted._sum.tree 
}