"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

const Logout = () => {
    const router = useRouter();
  return (
      <div>
          <button onClick={() => {
              document.cookie = `accesskey=; Max-Age=0; path=/;`;
                router.push('/');
          }}>Logout</button>
      </div>
  )
}

export default Logout