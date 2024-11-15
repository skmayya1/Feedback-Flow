"use client"
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const Page = () => {
  const params = useParams()
  useEffect(() => {
    const FetchData = async () => { 
      const res = await fetch(`/api/organization/${params.id}`)
      const data = await res.json()
      console.log(data);
    }
   // FetchData()
  }, [params.id])
  
  return (
    <div className='w-full text-white p-2 flex items-center justify-center'>
           <div className="flex gap-16">
              <div className="flex items-center gap-3">
                <Image src="https://github.githubassets.com/assets/yolo-default-be0bbff04951.png" className='h-16 w-16 ' alt="logo" width={100} height={100} />
                <div className="flex flex-col items-start gap-1 self-start">
                  <h1 className='font-semibold text-4xl font-serif'>Github</h1>
                  <p className='text-zinc-500 text-base'>Coding & collobaration</p>
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className='text-xl font-mono font-semibold text-green-500'>4.5</h1>
                <p className='text-sm font-light text-zinc-400'>Average Rating</p>
              </div>
            </div>
          </div>
  )
}

export default Page