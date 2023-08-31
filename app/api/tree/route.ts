import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    const body = await request.json();
    const { email, trees, treeName  } = body;

    let user = await prisma.user.findUnique({
        where: {email: email}
    })

    if (!user) {
        user = await prisma.user.create({
          data: {
            email: email,
            name: treeName, 
          },
        });
      }

    const existingTrees = await prisma.trees.findFirst({where: {userId: user.id}})

    if (!existingTrees){
        const treePlanted = await prisma.trees.create({
            data: {
                userId: user.id,
                email,
                tree: trees
            },
        })

        return NextResponse.json(treePlanted)
    }else{
        const treePlanted = await prisma.trees.update({
            where: { id: existingTrees.id },
            data: {
                tree: existingTrees.tree + trees,
            }
        })
        return NextResponse.json(treePlanted)
    }

    
}