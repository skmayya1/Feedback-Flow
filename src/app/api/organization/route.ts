import { prisma } from "@/lib/utils/Prisma";
import { NextResponse } from "next/server";

 export async function GET() {
    try {
        const companies = await prisma.organization.findMany({
            orderBy: {
                avg_rating: 'desc'
            },
            take: 6,
            select: {
                name: true,
                avg_rating: true,
                url: true,
                id: true,
                image: true,
                category:true
            }
        })
        console.log(companies);
        return NextResponse.json({ companies }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}