import { useEffect, useState } from 'react';
import Review from './Review';
import { Feedback } from '@/lib/Interfaces';

const Reviews = ({ id }: { id: string | undefined }) => {
  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]); // Default to an empty array
  const [sortOrder, setSortOrder] = useState(0); // 0 for recent, 1 for relevant

  const fetchData = async (sort: number) => {
    try {
      const res = await fetch(`/api/feedback/${id}/?sort=${sort}`);
      if (!res.ok) {
        throw new Error('Failed to fetch feedback data');
      }
      const data: Feedback[] = await res.json();
      console.log('feedback data:', data);
      
      setFeedbackData(data);
    } catch (error) {
      console.error('Error fetching feedback data:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(sortOrder);
    }
  }, [id, sortOrder]);

  const sortHandler = () => {
    setSortOrder((prevSort) => (prevSort === 0 ? 1 : 0)); // Toggle sort order
  };

  return (
    <div className="h-full w-full flex flex-col items-start py-5 justify-center px-24 gap-5">
      <div className="w-full flex items-center justify-between text-zinc-400">
        <h1 className="text-xl font-semibold">
          Reviews ({feedbackData.length})
        </h1>
        <div className="flex gap-2 items-center font-semibold">
          Sort:
          <label className="swap bg-zinc-700 py-1 px-2 rounded-lg text-center hover:bg-zinc-900">
            <input
              type="checkbox"
              checked={sortOrder === 1}
              onChange={sortHandler}
            />
            <div className="swap-on">Relevent</div>
            <div className="swap-off">Recent</div>
          </label>
        </div>
      </div>
      <div  className="h-full w-full flex flex-col gap-5">
        {feedbackData.map((feedback) => (
          <Review key={feedback.id} feedback={feedback} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
