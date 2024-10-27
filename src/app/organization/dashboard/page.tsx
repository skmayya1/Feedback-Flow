"use client"
import Overview from '@/components/Components/Dashboard/Components/Overview'
import Products from '@/components/Components/Dashboard/Components/Products'
import Reviews from '@/components/Components/Dashboard/Components/Reviews'
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
    <div className='text-white h-'> {/*bg-[#010508]*/}
      <Navbar />
      <MultiToggle />
      {
        toggle === 'overview' ? (
        <Overview/>
        ) : toggle === 'products' ? (
        <Products/>
          ) : toggle === 'reviews' ? (
        <Reviews/>
        ) : toggle === 'settings'&&(

            <h1 className='text-4xl'>Products</h1>
        )
      }
    </div>
  )
}

export default Page