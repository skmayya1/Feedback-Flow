import { prisma } from "@/lib/utils/Prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    console.log('user:', user);

    const { id } = await params;
    console.log('feedback for id:', id);

    try {
        const body = await req.json();
        const { DOE, Title, Description } = await body;

        
        return NextResponse.json({ message: "Feedback submitted successfully" });
    } catch (error) {
        console.error('error:', error);
        return NextResponse.json({ error: "An error occurred while submitting feedback" }, { status: 500 });
    }
}
