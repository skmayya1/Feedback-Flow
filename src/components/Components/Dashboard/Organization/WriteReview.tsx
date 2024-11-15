import { redirect } from 'next/navigation';
import React, { useState } from 'react'

const WriteReview = ({id}:{id:string | undefined}) => {
  const [ReviewData, setReviewData] = useState<{rating:number}>({
    rating:3
  })
  const handleRatingChange = (value: number) => {
    setReviewData((prevData) => ({ ...prevData, rating: value })); // Update rating in reviewData
    redirect(`/review/${id}?rating=${value}`); // Redirect to review page with rating query
  };

  return (
    <div className='border border-zinc-700 w-[45%] rounded-lg p-4 self-center gap-4 flex items-center justify-center'>
          <h1 className='text-lg font-semibold'>Rate your experience</h1>
          <div className="rating rating-md">
              {[1, 2, 3, 4, 5].map((value) => (
                  <input
                      key={value}
                      type="radio"
                      name="rating-4"
                      className="mask mask-star-2 bg-green-500"
                      onChange={() => handleRatingChange(value)}
                      checked={ReviewData.rating === value}
                  />
              ))}
          </div>
    </div>
  )
}

export default WriteReview