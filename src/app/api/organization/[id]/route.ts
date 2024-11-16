import { prisma } from '@/lib/utils/Prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
    }

    try {
        // Fetch organization data based on sort
        const organization = await prisma.organization.findUnique({
            where: {
                id: id,
            },
            select: {
                avg_rating: true,
                category: {
                    select: {
                        name: true,
                    },
                },
                feedback: true,
                id: true,
                image: true,
                name: true,
                url: true,
            }
        })
        if (!organization) {
            return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
        }

        // Exclude sensitive fields if necessary
        const sanitizedOrganization = {
            ...organization,
            password: undefined, // Ensure no password field is returned
        };

        return NextResponse.json(sanitizedOrganization, { status: 200 });
    } catch (error) {
        console.error('Error fetching organization:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
