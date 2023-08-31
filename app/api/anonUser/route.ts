import prisma from "@/app/libs/prismadb"
import { NextResponse } from 'next/server'

export async function createAnonUser(email: string, name: string, referralId: string) {
  const user = await prisma.user.create({
    data: {
      email,
      name,
      referralId,
      referrals: {
        create: {
          referrerId: referralId,
          name,
          email
        },
      },
    }
  })

  return user;
}

export async function POST(request: Request) {
  const body = await request.json()
  const {
    email,
    name,
    referralId
  } = body

  const user = await createAnonUser(email, name, referralId);

  return NextResponse.json(user);
}