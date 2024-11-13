"use client"
import Overview from '@/components/Components/Dashboard/Components/Overview'
import Reviews from '@/components/Components/Dashboard/Components/Reviews'
import Settings from '@/components/Components/Dashboard/Components/Settings'
import MultiToggle from '@/components/Components/Dashboard/MultiToggle'
import Navbar from '@/components/Components/Dashboard/Navbar'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [toggle, settoggle] = useState('')
  const params = useSearchParams()
  useEffect(() => {
    const Toggle = params.get('toggle')
    settoggle(Toggle as string)
  }, [params])
  
  return (
    <div className='text-white'> {/*bg-[#010508]*/}
      <Navbar />
      <MultiToggle />
      {
        toggle === 'overview' ? (
        <Overview/>
        ) : toggle === 'reviews' ? (
        <Reviews/>
         ) : toggle === 'settings' && (
        <Settings/>
        )
      }
    </div>
  )
}

export default Page