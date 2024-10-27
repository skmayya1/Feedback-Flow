import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import jwt from 'jsonwebtoken'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export async function jwtUnsign(token: string) 
{
  const id = jwt.verify(token,process.env.JWT_SECRET as string);
  console.log(id);
  return id;
}

