"use client"
import { Data } from '@/lib/Interfaces'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import { useParams, redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

const Page = () => {
  const [reviewData, setReviewData] = useState({
    DOE: '',
    Title: '',
    Description: ''
  });

  const [companyDetails, setCompanyDetails] = useState<Data | null>(null);
  const params = useParams();
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) redirect('auth/user/signin');
  }, [isAuthenticated, isLoading]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/organization/${params.id}`);
      const data = await res.json();
      setCompanyDetails(data);
    };
    fetchData();
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch(`/api/feedback/${params.id}`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    if (data.error) {
      alert(`Error: ${data.error}`);
    } else {
      alert('Review Submitted');
    }
  };

  return (
    <div className='h-[40vw] w-full flex flex-col items-center justify-center gap-10'>
      {companyDetails ?
        <div className="h-[10vh] w-[30vw] border border-zinc-700 rounded-lg flex items-center px-4 gap-3">
          <div className="h-14 w-14 bg-red-200 rounded-full overflow-hidden">
            {companyDetails.url && <Image src={companyDetails.image} height={60} width={60} alt='LOGO' />}
          </div>
          <div>
            <h1 className='text-zinc-100 font-semibold text-lg'>{companyDetails.name}</h1>
            <a href={companyDetails.url} className='text-zinc-400 text-sm cursor-pointer'>{companyDetails.url}</a>
          </div>
        </div>
        :
        <div className="h-[10vh] w-[30vw] border border-zinc-700 rounded-lg flex px-4 gap-3 items-center justify-center">
          <span className="loading loading-spinner loading-md text-white"></span>
        </div>
      }

      <div className="min-h-[55vh] w-[30vw] border border-zinc-700 rounded-lg text-zinc-300 px-10 flex flex-col justify-center gap-3.5">
        <h1 className='text-lg font-semibold'>Rate your experience</h1>
        <div className="rating rating-md">
          <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
          <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
          <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
          <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" defaultChecked />
          <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
        </div>

        <h1 className='text-lg font-medium'>Date of Experience</h1>
        <input
          type="date"
          name='DOE'
          onChange={handleChange}
          value={reviewData.DOE}
          className="px-3 py-1.5 outline-none border text-white border-zinc-700 rounded-lg font-medium"
        />

        <h1 className='text-lg font-medium'>Give your review a title</h1>
        <input
          className='px-3 py-1.5 outline-none border text-white border-zinc-700 rounded-lg placeholder:text-sm font-medium text-lg'
          name='Title'
          onChange={handleChange}
          value={reviewData.Title}
          placeholder='Title'
          type="text"
        />

        <h1 className='text-lg font-medium'>Tell us more about your experience</h1>
        <div className="w-full">
          <textarea
            className="px-3 w-full py-1.5 outline-none border border-zinc-700 rounded-lg placeholder:text-sm resize-none"
            placeholder="Description"
            rows={4}
            name='Description'
            value={reviewData.Description}
            onChange={handleChange}
            maxLength={500}
          />
          <p className='font-semibold text-xs text-zinc-500'>*Maximum 500 characters.</p>
        </div>
        <button onClick={handleSubmit} className='py-2 bg-green-500 text-zinc-800 font-semibold rounded-lg text-base'>
          Submit your review
        </button>
      </div>
    </div>
  )
}

export default Page;
