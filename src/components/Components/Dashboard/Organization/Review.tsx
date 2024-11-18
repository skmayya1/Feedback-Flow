import { Feedback } from "@/lib/Interfaces";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { formatDistanceToNow, parseISO } from "date-fns";
import Image from "next/image";
import { getRatingColor } from "@/lib/utils/Rating";
import { BsFlag } from "react-icons/bs";
import { useState } from "react";

const Review = ({ feedback }: { feedback: Feedback }) => {
  // Local state for upvote toggle
  const [upvoted, setupvoted] = useState(feedback.upVoted || false);
  const [voteCount, setVoteCount] = useState(feedback.upVotes.length);

  // Upvote handler
  const upVoteHandler = async (feedbackId: string) => {
    try {
      const res = await fetch("/api/feedback", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedbackId }),
      });

      if (!res.ok) {
        throw new Error("Failed to toggle upvote feedback");
      }

      const updatedFeedback: Partial<Feedback> = await res.json();
      console.log("updated feedback:", updatedFeedback);

      // Toggle local upvoted state and adjust vote count
      setupvoted((prev) => !prev);
      setVoteCount((prev) => (upvoted ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Error toggling upvote feedback:", error);
    }
  };

  return (
    <div className="min-h-[10vh] w-full flex flex-col gap-3 p-4 border border-zinc-800 rounded-lg shadow-md bg-zinc-900">
      {/* Reviewer Details */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 bg-zinc-700 rounded-full overflow-hidden">
            {feedback.customer.picture && (
              <Image src={feedback.customer.picture} alt="profile" width={48} height={48} />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium text-white text-base">{feedback.customer.given_name}</p>
              {feedback.customer && (
                <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                  Verified
                </span>
              )}
            </div>
            <p className="text-zinc-400 text-xs">
              {feedback.DateofFeedback &&
                formatDistanceToNow(parseISO(feedback.DateofFeedback), { addSuffix: true })}
            </p>
          </div>
        </div>
        <p className="text-sm text-zinc-400">
          Date of Experience:{" "}
          <span className="font-medium text-white">
            {new Date(feedback.DateofExperience).toLocaleDateString()}
          </span>
        </p>
      </div>

      {/* Review Content */}
      <div className="ml-12 flex flex-col gap-2">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              className={`text-xl ${value <= (feedback.Rating || 0) ? getRatingColor(feedback.Rating as number) : "text-zinc-700"
                }`}
            >
              ★
            </span>
          ))}
        </div>
        <h1 className="text-white font-semibold">{feedback.Header}</h1>
        <p className="text-sm text-zinc-400">{feedback.Review}</p>
      </div>

      {/* Interaction Buttons */}
      <div className="flex justify-between items-center mt-2 px-3">
        <div className="flex gap-2 items-center">
          <button
            className={`rounded-full px-3 py-1 text-xs flex items-center gap-1 ${upvoted ? "bg-green-600 text-white" : "bg-zinc-800 text-gray-400"
              } hover:bg-zinc-700`}
            onClick={() => upVoteHandler(feedback.id)}
          >
            {upvoted ? <FaThumbsUp size={14} /> : <FaRegThumbsUp size={14} />}
            Helpful
          </button>
          <p className="text-zinc-400 font-semibold text-sm">{voteCount}</p>
        </div>

        <button className="rounded-full px-3 py-1 text-xs flex items-center gap-1 bg-zinc-800 text-gray-400 hover:bg-zinc-700">
          <BsFlag />
          Report
        </button>
      </div>
    </div>
  );
};

export default Review;
