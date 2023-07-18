import { User } from "@prisma/client";

export type safeUser = Omit<
    User,
    "createdAt" | "emailVerified"
> & {
    createdAt: string;
    emailVerified: string | null;
}