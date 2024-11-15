import { useEffect, useState } from 'react';
import Review from './Review';
import { OrganizationData, Feedback } from '@/lib/Interfaces';

const Reviews = ({ id }: { id: string | undefined }) => {
  const [Data, setData] = useState<OrganizationData | null>(null); // Set a type for organization data
  const [SORT, setSORT] = useState(0); // 0 for recent, 1 for relevant

  const fetchData = async (sort: number) => {
    try {
      const res = await fetch(`/api/organization/${id}?sort=${sort}`);
      if (!res.ok) {
        throw new Error('Failed to fetch organization data');
      }
      const data: OrganizationData = await res.json(); // Assuming your backend returns OrganizationData type
      setData(data);
    } catch (error) {
      console.error('Error fetching organization data:', error);
    }
  };

  useEffect(() => {
    fetchData(SORT);
  }, [id]);

  const sortHandler = () => {
    const newSort = SORT === 0 ? 1 : 0;
    setSORT(newSort);
    fetchData(newSort);
  };

  return (
    <div className="h-full w-full flex flex-col items-start py-5 justify-center px-24 gap-5">
      <div className="w-full flex items-center justify-between text-zinc-400">
        <h1 className="text-xl font-semibold">
          Reviews ({Data?.feedback?.length || 0})
        </h1>
        <div className="flex gap-2 items-center font-semibold">
          Sort:
          <label className="swap bg-zinc-700 py-1 px-2 rounded-lg text-center hover:bg-zinc-900">
            <input onClick={sortHandler} value={SORT} type="checkbox" />
            <div className="swap-on">Recent</div>
            <div className="swap-off">Relevant</div>
          </label>
        </div>
      </div>
      <div className="h-full w-full flex flex-col gap-5">
        {Data?.feedback?.map((feedback: Feedback) => (
          <Review key={feedback.id} feedback={feedback} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
