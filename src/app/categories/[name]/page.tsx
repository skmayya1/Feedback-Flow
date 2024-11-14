"use client"
import { useParams } from 'next/navigation';
import React from 'react'

const Page = () => {
    const params = useParams();
    console.log(params.name);
  return (
      <div>{params.name}</div>
  )
}

export default Page