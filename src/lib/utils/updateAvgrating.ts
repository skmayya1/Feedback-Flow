import { prisma } from "./Prisma";

export async function calculateAndUpdateAvgRating(organizationId: string) {
    const averageRating = await prisma.feedback.aggregate({
        _avg: {
            Rating: true, 
        },
        where: {
            CompanyID: organizationId, 
        },
    });

    const avgRatingValue = averageRating._avg.Rating ?? 0; 
    await prisma.organization.update({
        where: {
            id: organizationId,
        },
        data: {
            avg_rating: avgRatingValue,
        },
    });

    console.log(`Updated average rating for organization ${organizationId}: ${avgRatingValue}`);
}