import { prisma } from "@/lib/utils/Prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const allFeedback = await prisma.feedback.findMany();
        return NextResponse.json(allFeedback);
    } catch (error) {
        console.log(error);
        return NextResponse.json(error, { status: 500 });
        
    }
}