import { getSentiment } from "@/lib/utils/getSentiment";
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
        const { DOE, Title, Description, rating } = await body;

        const sentiment = await getSentiment(Description);
        console.log('sentiment:', sentiment.toString());

        const FeedbackCreate = await prisma.feedback.create({
            data: {
                DateofExperience: DOE,
                Header: Title,
                Review: Description,
                Rating: rating,
                sentiment: sentiment,
                CustomerID: user.id,
                CompanyID: id
            },
        });
        if (!FeedbackCreate) {
            return NextResponse.json({ error: "An error occurred while submitting feedback" }, { status: 500 });
        }
        return NextResponse.json({ message: "Feedback submitted successfully" }, { status: 200 });
    } catch (error) {
        console.error('error:', error);
        return NextResponse.json({ error: "An error occurred while submitting feedback" }, { status: 500 });
    }
}
