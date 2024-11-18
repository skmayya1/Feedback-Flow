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
                categoryID: true,
            },
        });

        if (!organization) {
            return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
        }

        const sanitizedOrganization = {
            ...organization,
            password: undefined, 
        };

        let relevantOrganizations = await prisma.organization.findMany({
            where: {
                categoryID: organization.categoryID,
                id: {
                    not: organization.id,
                },
            },
            orderBy: {
                avg_rating: 'desc',
            },
            select: {
                avg_rating: true,
                id: true,
                image: true,
                name: true  
            },
            take: 3,
        });

        if (relevantOrganizations.length === 0) {
            relevantOrganizations = await prisma.organization.findMany({
                orderBy: {
                    avg_rating: 'desc', 
                },
                select: {
                    avg_rating: true,
                    id: true,
                    image: true,
                    name: true                },
                take: 3, 
            });
        }

        return NextResponse.json({
            organization: sanitizedOrganization,
            relevantOrganizations,
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching organization:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
