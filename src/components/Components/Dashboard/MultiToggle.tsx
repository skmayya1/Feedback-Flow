"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Toggle from './Toggle'

const MultiToggle = () => {
  const [toggle, setToggle] = useState<string>('')
  const searchParams = useSearchParams()
  const router = useRouter()

  const updateParams = (newToggle: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('toggle', newToggle)
    router.push(`?${params.toString()}`)
    setToggle(newToggle)
  }

  useEffect(() => {
    // Get the initial toggle value from search params when the component mounts
    const initialToggle = searchParams.get('toggle') || 'overview'
    setToggle(initialToggle)
  }, []) // Run this effect only once on component mount

  return (
    <div className='h-10 text-zinc-400 w-full px-28 flex items-center gap-16 border-b border-zinc-700'>
      <Toggle toggle={toggle} setToggle={updateParams} toggleName='Overview' />
      <Toggle toggle={toggle} setToggle={updateParams} toggleName='Reviews' />
      <Toggle toggle={toggle} setToggle={updateParams} toggleName='Settings' />
    </div>
  )
}

export default MultiToggle
