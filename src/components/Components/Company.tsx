import { Data } from '@/lib/Interfaces'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { IoIosStar } from "react-icons/io";

const Company = ({ data }: { data: Data }) => {
  console.log(data);
  
  return (
      <div className='h-[14vh] w-[14vh] flex flex-col items-center justify-center gap-4 '>
      <div className="h-12 w-12">
        <Image
          alt='logo'
          src={data.image}
          height={60}
          width={60}
        />
      </div>
      <div className="flex items-center justify-center flex-col">
        <Link href={'/organization/'+data.id} className="text-zinc-200 font-semibold text-lg ">{data.name}</Link>
        <p className='text-green-500  font-semibold flex items-center gap-1'>{data.avg_rating} <IoIosStar/></p>
      </div>
      </div>
  )
}

export default Company