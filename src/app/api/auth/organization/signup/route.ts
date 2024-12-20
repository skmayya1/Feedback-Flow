import { prisma } from "@/lib/utils/Prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(req: NextRequest) {
    const { website, name, email, password, logo, category }: {
        website: string;
        name: string;
        email: string;
        password: string;
        logo: string;
        category: string;
    } = await req.json();


    if (!website || !name || !email || !password) {
        return NextResponse.json("All fields are required", { status: 400 });
    }

    try {
        const userExists = await prisma.user.findUnique({
            where: { email },
        });
        if (userExists) {
            return NextResponse.json("User already exists", { status: 400 });
        }

        const organizationExists = await prisma.organization.findUnique({
            where: { email },
        });
        if (organizationExists) {
            return NextResponse.json("Organization already exists", { status: 400 });
        }


        const websiteExists = await prisma.organization.findUnique({
            where: { url: website },
        });
        if (websiteExists) {
            return NextResponse.json("Website already exists", { status: 400 });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const organization = await prisma.organization.create({
            data: {
                image: logo,
                name,
                email,
                url: website,
                password: hashedPassword,
                categoryID: category
            },
            select: {
                id: true,
            },
        });
        if (!organization) {
            return NextResponse.json("Something went wrong", { status: 500 });
        }
        return NextResponse.json(organization.id, { status: 201 });
    } catch (error) {
        console.error("Error creating organization:", error); // Improved logging
        return NextResponse.json("Something went wrong", { status: 500 });
    }
}
