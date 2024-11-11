import React from 'react'
import Products from './Components/Products'
import Reviews from './Components/Reviews'

const ContentPart = () => {
  return (
    <div className='flex'>
      <Products />
      <Reviews/>
    </div>
  )
}

export default ContentPart