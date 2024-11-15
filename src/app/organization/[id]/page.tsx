"use client";

import { OrganizationData } from "@/lib/Interfaces";
import { getRatingColor } from "@/lib/utils/Rating";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const params = useParams();
  const [Data, setData] = useState<OrganizationData | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/organization/${params.id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch organization data");
      }
      const data = await res.json();
      setData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching organization data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.id]);

  return (
    <div className="w-full text-white p-2 flex items-center justify-evenly py-16 flex-col">
      {/* Organization Details */}
      <div className="flex gap-16 w-full">
        {/* Logo and Description */}
        <div className="flex items-center gap-3 justify-center w-full">
          {Data?.image ? (
            <Image
              src={Data.image}
              className="h-20 w-20 rounded-full"
              alt={`${Data.name} Logo`}
              width={100}
              height={100}
            />
          ) : (
            <div className="h-20 w-20 bg-zinc-700 rounded-full flex items-center justify-center">
              <span className="text-zinc-400">No Image</span>
            </div>
          )}
          <div className="flex flex-col items-start gap-1 self-start">
            <h1 className="font-semibold text-4xl">{Data?.name || "Unknown Name"}</h1>
            <p className="text-zinc-500 text-base">
              {Data?.category?.name || "No Category"}
            </p>
          </div>
        </div>

        {/* Ratings and Reviews Summary */}
        <div className="flex gap-10 items-center justify-center w-full">
          <div className="flex flex-col items-center justify-center">
            <h1
              className="text-2xl font-mono font-semibold"
              style={{ color: getRatingColor(Data?.avg_rating as number) }}
            >
              {Data?.avg_rating.toFixed(1)}
            </h1>

            <p className="text-sm font-semibold text-zinc-400">Average Rating</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-mono font-semibold text-white">
              {Data?.feedback?.length || 0}
            </h1>
            <p className="text-sm font-semibold text-zinc-400">Reviews</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="h-[60vh] w-full mt-8">
        {Data?.feedback && Data.feedback.length > 0 ? (
          <ul className="space-y-4">
            {Data.feedback.map((review) => (
            <div key={review.id} className=""></div>
            ))}
          </ul>
        ) : (
          <p className="text-center text-zinc-500">No reviews available yet.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
  