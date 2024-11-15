import { prisma } from '@/lib/utils/Prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
    }
    try {
        const Organization = await prisma.organization.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                avg_rating: true,
                name: true,
                image: true,
                url: true,
                feedback: true,
                category: {
                    select: {
                        name: true
                    }
                }
            }
        })
        if (!Organization) {
            return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
        }
        return NextResponse.json(Organization, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });



    }

}
