import { useEffect, useState } from "react";
import Review from "./Review";
import { Feedback } from "@/lib/Interfaces";

const Reviews = ({ id }: { id: string | undefined }) => {
  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]); // Default to an empty array
  const [sortOrder, setSortOrder] = useState(0); // 0 for recent, 1 for relevant

  const fetchData = async (sort: number) => {
    try {
      const res = await fetch(`/api/feedback/${id}/?sort=${sort}`);
      if (!res.ok) {
        throw new Error("Failed to fetch feedback data");
      }
      const data: Feedback[] = await res.json();
      console.log("feedback data:", data);

      setFeedbackData(data);
    } catch (error) {
      console.error("Error fetching feedback data:", error);
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
    <div className="h-full w-full flex flex-col items-start py-6 px-8 lg:px-24 gap-6 bg-zinc-900">
      {/* Header Section */}
      <div className="w-full flex items-center justify-between text-zinc-400 border-b border-zinc-800 pb-4">
        <div className="flex gap-8">
          <button className="text-lg font-semibold text-green-500 hover:text-green-400 transition">
            Reviews ({feedbackData.length})
          </button>
          <button className="text-lg font-semibold text-zinc-300 hover:text-white transition">
            Q&A (0)
          </button>
        </div>
        <div className="flex gap-3 items-center">
          <span className="text-sm font-medium">Sort by:</span>
          <label className="swap bg-zinc-800 py-1 px-3 rounded-lg text-center hover:bg-zinc-700 transition">
            <input
              type="checkbox"
              checked={sortOrder === 1}
              onChange={sortHandler}
            />
            <div className="swap-on text-green-400">Relevant</div>
            <div className="swap-off text-green-400">Recent</div>
          </label>
        </div>
      </div>

      {/* Reviews List */}
      <div className="flex flex-col gap-6 w-full">
        {feedbackData.length > 0 ? (
          feedbackData.map((feedback) => (
            <Review key={feedback.id} feedback={feedback} />
          ))
        ) : (
          <div className="text-center text-zinc-400 py-10">
            <p>No reviews available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
