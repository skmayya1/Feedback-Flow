"use client"

import { useToken } from "@/hooks/useToken"
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";

interface Data{
  image: string;
  name: string;
  id: string;
  url: string;
  email: string;
  avg_rating: number;
}

const Navbar = () => {
  const [data, setdata] =useState<Data>()
  console.log(data);
    const token = useToken();
       useEffect(() => {
         const fetchData = async () => {
          if (!token) {
            return  redirect('/')
          }
          const response = await fetch('/api/organization/' + token, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          const Data = await response.json();
        console.log(Data);
        setdata(Data);       
        }
        fetchData();
    }, [token]); 
    
  return (
    <div className="h-14 w-full flex items-center justify-between border-b border-zinc-700 px-10 ">
      <div className="p-2 items-center justify-center hover:bg-zinc-700 rounded-full cursor-pointer">
        <CiLogout size={18}/> 
      </div>
      <div className="flex gap-4 items-center">
        <Link href={'/organization/'+data?.id} className="font-bold text-base text-zinc-300  hover:text-green-200">{data?.name}</Link>
        <div className="bg-transparent rounded-full bg-cover items-center justify-center cursor-pointer">
          {data?.image && (
            <Image
              className="h-8 w-8"
              height={100}
              width={100}
              src={data.image as string}
              alt="Logo"
            />
          )}

        </div>
      </div>
    </div>
  )
}

export default Navbar