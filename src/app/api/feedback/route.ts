import { prisma } from "@/lib/utils/Prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const allFeedback = await prisma.feedback.findMany();
        return NextResponse.json(allFeedback);
    } catch (error) {
        console.log(error);
        return NextResponse.json(error, { status: 500 });
    }
}


export async function PUT(req: NextRequest) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    try {
        const { feedbackId } = await req.json();
        const feedback = await prisma.feedback.findUnique({
            where: { id: feedbackId },
            select: { upVotes: true },
        });

        if (!feedback) {
            console.error('Feedback not found for ID:', feedbackId);
            return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
        }

        const updatedUpVotes = feedback.upVotes.includes(user.id)
            ? feedback.upVotes.filter((id: string) => id !== user.id) // Remove if exists
            : [...feedback.upVotes, user.id]; // Add if doesn't exist

        const updatedFeedback = await prisma.feedback.update({
            where: { id: feedbackId },
            data: { upVotes: updatedUpVotes },
        });

        return NextResponse.json({
            id: updatedFeedback.id,
            upVotes: updatedFeedback.upVotes,
        }, { status: 200 });

    } catch (error) {
        console.error('Error updating upvotes:', error);
        return NextResponse.json({ error: 'An error occurred while toggling upvote' }, { status: 500 });
    }
}
