import { Feedback } from "@/lib/Interfaces";
import { BiUpvote, BiDownvote, BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import Image from "next/image";

const Review = ({ feedback }: { feedback: Feedback }) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const handleUpvote = () => {
    if (downvoted) setDownvoted(false); // Prevent simultaneous upvote and downvote
    setUpvoted(!upvoted);
  };

  const handleDownvote = () => {
    if (upvoted) setUpvoted(false); // Prevent simultaneous upvote and downvote
    setDownvoted(!downvoted);
  };

  return (
    <div className="min-h-[10vh] w-full flex flex-col gap-2 p-3 border border-zinc-700 rounded-xl shadow-sm shadow-zinc-500">
      {/* Review Poster */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center justify-center">
          <div className="h-10 w-10 bg-zinc-700 rounded-full overflow-hidden">
          {feedback.customer.picture && <Image src={feedback.customer.picture} alt="profile" width={60} height={60} /> }
          </div>
          <p className="font-semibold text-lg">{feedback.customer.given_name}</p>
          <p className="text-zinc-500 font-light text-sm">
            {feedback.DateofFeedback && (
              formatDistanceToNow(parseISO(feedback.DateofFeedback), { addSuffix: true })
            ) }          </p>
        </div>
        <p className="font-semibold text-zinc-500 text-sm">
          Date of Experience: {new Date(feedback.DateofExperience).toLocaleDateString()}
        </p>
      </div>
      <div className="ml-10 flex flex-col items-start gap-2">
        <span className="rating rating-sm">
          {[1, 2, 3, 4, 5].map((value) => (
            <input
              key={value}
              type="radio"
              name={`rating-${feedback.id}`}
              className="mask mask-star-2 bg-green-500"
              defaultChecked={value === feedback.Rating}
              value={value}
              readOnly
            />
          ))}
        </span>
        <h1 className="font-semibold">{feedback.Header}</h1>
        <p className="font-light text-zinc-300">{feedback.Review}</p>
      </div>
      {/* Review Rating & Interaction */}
      <div className="flex ml-10 gap-6 text-gray-400">
        <button
          className={`rounded-full p-1 hover:bg-zinc-700 ${upvoted ? "text-green-500" : ""}`}
          onClick={handleUpvote}
        >
          {upvoted ? <BiSolidUpvote size={24} /> : <BiUpvote size={24} />}
        </button>
        <button
          className={`rounded-full p-1 hover:bg-zinc-700 ${downvoted ? "text-red-500" : ""}`}
          onClick={handleDownvote}
        >
          {downvoted ? <BiSolidDownvote size={24} /> : <BiDownvote size={24} />}
        </button>
      </div>
    </div>
  );
};

export default Review;
