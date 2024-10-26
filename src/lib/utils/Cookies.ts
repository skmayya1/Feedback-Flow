"use server"

import { cookies } from "next/headers"



export async function setCookie(name: string, value: string) {
    console.log('Setting cookie', name, value);
    const cookieStore = await cookies()
    cookieStore.set(name, value);
}

export async function removeCookie(name: string) {
    const cookieStore = await cookies()
    cookieStore.delete(name);
}