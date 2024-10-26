import { prisma } from "@/lib/utils/Prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    if (!email || !password) {
        return new Response("Email and password are required", { status: 401 });
    }
    try {
        const userExists = await prisma.organization.findUnique({
            where: {
                email,
            }
        })
        if (!userExists) {
            return new Response("User does not exist", { status: 402 });
        }
        const isPassword = await bcrypt.compare(password, userExists.password);
        if (!isPassword) {
            return new Response("Invalid password", { status: 403 });
        }
        const token = jwt.sign({ id: userExists.id }, process.env.JWT_SECRET as string);
        return  NextResponse.json(token, { status: 201 });
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong", { status: 500 });
    }
}