import { prisma } from "@/lib/utils/Prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

const url = process.env.url;

export async function GET() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        return NextResponse.redirect(`${url}/auth/signin`);
    }
    try {
        const userExists = await prisma.user.findUnique({
            where: {
                email: user.email as string
            }
        });
        if (!userExists) {
            const newUser = await prisma.user.create({
                data: {
                    email: user.email as string,
                    kindeID: user.id as string,
                    family_name: user.family_name as string,
                    given_name: user.given_name as string,
                    picture: user.picture as string,
                    
                }
            });
            if (!newUser) {
                return NextResponse.redirect(`${url}/auth/signin`);
            }
        }
        return NextResponse.redirect(`${url}/`);
    } catch (error) {
        console.log(error);
        return NextResponse.redirect(`${url}/auth/signin`);
    }
}
