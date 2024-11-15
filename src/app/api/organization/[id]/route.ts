import { prisma } from '@/lib/utils/Prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const sort = request.nextUrl.searchParams.get('sort'); // Retrieve sort query parameter
    console.log(`Sort: ${sort}, Method: ${request.method}`);

    if (!id) {
        return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
    }

    try {
        // Fetch organization data based on sort
        const organization = await prisma.organization.findUnique({
            where: { id },
            include: {
                category: {
                    select: {
                        name: true,
                    },
                },
                feedback: sort === '1'
                    ? {
                        select: {
                            id: true,
                            Rating: true,
                            DateofExperience: true,
                            upVotes: true,
                            Header: true,
                            Review: true,
                            sentiment: true,
                            DateofFeedback: true,
                            customer: {
                                select: {
                                    given_name: true,
                                    family_name: true,
                                    picture: true,
                                },
                            },
                        },
                        orderBy: {
                            DateofFeedback: 'desc',
                        },
                    }
                    : {
                        select: {
                            id: true,
                            Rating: true,
                            DateofExperience: true,
                            upVotes: true,
                            Header: true,
                            Review: true,
                            sentiment: true,
                            DateofFeedback: true,
                            customer: {
                                select: {
                                    given_name: true,
                                    family_name: true,
                                    picture: true,
                                },
                            },
                        },
                        orderBy: {
                            sentiment: 'desc',                        },
                    },
            },
        });

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
