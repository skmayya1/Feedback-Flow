"use client";

import { useEffect, useState } from 'react';
import { Data } from '@/lib/Interfaces';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';
import { useParams,useRouter ,useSearchParams } from 'next/navigation';
const Page = () => {
  const navigate = useRouter();
  const query = useSearchParams();
  const ratings = query.get('rating');
  const { id } = useParams();
  const [reviewData, setReviewData] = useState({
    DOE: '',
    Title: '',
    Description: '',
    rating:  4,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [companyDetails, setCompanyDetails] = useState<Data | null>(null);
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  const handleRatingChange = (value: number) => {
    setReviewData((prevData) => ({ ...prevData, rating: value }));
  };
  
  useEffect(() => {
   if(ratings){
     setReviewData((prevData) => ({ ...prevData, rating: Number(ratings) }));
   }
  }, [ratings])
  

  // Authentication check
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
     navigate.push('/auth/user/signin')
    }
  }, [isAuthenticated, isLoading]);

  // Fetching company details
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/organization/${id}`);
      const data = await res.json();
      setCompanyDetails(data);
    };
    if (id) fetchData();
  }, [id]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  // Handle form submission

  const handleSubmit = async () => {
    if (!reviewData.DOE || !reviewData.Title || !reviewData.Description) {
      setError('All fields are required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/feedback/${id}`, {
        method: 'POST',
        body: JSON.stringify(reviewData),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        throw new Error('Failed to submit review');
      }
      navigate.push(`/organization/${id}`); // Perform client-side navigation
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-[40vw] w-full flex flex-col items-center justify-center gap-10">
      {companyDetails ? (
        <div className="h-[10vh] w-[30vw] border border-zinc-700 rounded-lg flex items-center px-4 gap-3">
          <div className="h-14 w-14 bg-red-200 rounded-full overflow-hidden">
            {companyDetails.url && <Image src={companyDetails.image} height={60} width={60} alt="LOGO" />}
          </div>
          <div>
            <h1 className="text-zinc-100 font-semibold text-lg">{companyDetails.name}</h1>
            <a href={companyDetails.url} className="text-zinc-400 text-sm cursor-pointer">
              {companyDetails.url}
            </a>
          </div>
        </div>
      ) : (
        <div className="h-[10vh] w-[30vw] border border-zinc-700 rounded-lg flex px-4 gap-3 items-center justify-center">
          <span className="loading loading-spinner loading-md text-white"></span>
        </div>
      )}

      <div className="min-h-[55vh] w-[30vw] border border-zinc-700 rounded-lg text-zinc-300 px-10 py-6 flex flex-col justify-center gap-3.5">
        <h1 className="text-lg font-semibold">Rate your experience</h1>
        <div className="rating rating-md">
          {[1, 2, 3, 4, 5].map((value) => (
            <input
              key={value}
              type="radio"
              name="rating-4"
              className="mask mask-star-2 bg-green-500"
              onChange={() => handleRatingChange(value)}
              checked={reviewData.rating === value}
            />
          ))}
        </div>

        <h1 className="text-lg font-medium">Date of Experience</h1>
        <input
          type="date"
          name="DOE"
          onChange={handleChange}
          value={reviewData.DOE}
          className="px-3 py-1.5 bg-zinc-700 outline-none border text-white border-zinc-700 rounded-lg font-medium"
        />

        <h1 className="text-lg font-medium">Give your review a title</h1>
        <input
          className="px-3 py-1.5 bg-zinc-700 outline-none border text-white border-zinc-700 rounded-lg placeholder:text-sm font-medium text-lg placeholder:text-zinc-300 placeholder:font-light"
          name="Title"
          onChange={handleChange}
          value={reviewData.Title}
          placeholder="Title"
          type="text"
        />

        <h1 className="text-lg font-medium">Tell us more about your experience</h1>
        <div className="w-full">
          <textarea
            className="px-3 w-full py-1.5 bg-zinc-700 outline-none border border-zinc-700 rounded-lg placeholder:text-sm resize-none"
            placeholder="Description"
            rows={4}
            name="Description"
            value={reviewData.Description}
            onChange={handleChange}
            maxLength={500}
          />
          <p className="font-semibold text-xs text-zinc-500">*Maximum 500 characters.</p>
        </div>

        <button
          disabled={loading}
          onClick={handleSubmit}
          className={`py-2 ${loading ? 'bg-green-800' : 'bg-green-500'} text-zinc-800 font-semibold rounded-lg text-base text-center flex items-center justify-center gap-2`}
        >
          {loading && <span className="loading loading-spinner loading-xs"></span>} Submit your review
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default Page;
