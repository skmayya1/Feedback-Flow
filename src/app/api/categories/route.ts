import { prisma } from "@/lib/utils/Prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const categories = await prisma.category.findMany(
            {
                select: {
                    id: true,
                    name: true,
                    icon: true
            }
        }
        );
        return NextResponse.json(categories);
    } catch (error) {
        console.log(error);
        return NextResponse.json("Something went wrong", { status: 500 });
    }
} 