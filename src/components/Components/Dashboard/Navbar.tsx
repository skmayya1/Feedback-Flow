"use client"

import { useToken } from "@/hooks/useToken"
import Image from "next/image";
import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";

interface Data{
  image: string;
  name: string;
}

const Navbar = () => {
  const [data, setdata] =useState<Data>()
  console.log(data);
  
    const token = useToken();
       useEffect(() => {
     const fetchData = async () => {
          const response = await fetch('/api/organization/' + token, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          const data = await response.json();
       console.log(data);
       setdata(data);
        }
        fetchData();
    }, [token]) 
    
  return (
    <div className="h-14 w-full flex items-center justify-between border-b border-zinc-700 px-10 ">
      <div className="p-2 items-center justify-center hover:bg-zinc-700 rounded-full cursor-pointer">
        <CiLogout size={18}/> 
      </div>
      <div className="flex gap-4 items-center">
        <h1 className="font-bold text-base text-zinc-300 ">{data?.name}</h1>
        <div className="bg-transparent rounded-full bg-cover items-center justify-center cursor-pointer">
          {data?.image && (
            <Image
              className="h-10 w-10"
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