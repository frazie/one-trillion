import prisma from "@/app/libs/prismadb";

export async function getUserTrees() {
    const usersWithTrees = await prisma.user.findMany({
      include: {
        treesPlanted: {
          select: {
            tree: true
          }
        }
      },
    });
  
    // Map data to retrieve user name and count of trees planted
    const userTrees = usersWithTrees.map((user) => ({
      name: user.name,
      numTrees: user.treesPlanted.length > 0 ? user.treesPlanted[0].tree : 0,
    }));
  
    return userTrees;
  }