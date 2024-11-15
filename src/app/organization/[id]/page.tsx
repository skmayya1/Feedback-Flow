"use client";

import Reviews from "@/components/Components/Dashboard/Components/Reviews";
import Activity from "@/components/Components/Dashboard/Organization/Activity";
import Relevant from "@/components/Components/Dashboard/Organization/Relevant";
import WriteReview from "@/components/Components/Dashboard/Organization/WriteReview";
import { OrganizationData } from "@/lib/Interfaces";
import { getRatingColor } from "@/lib/utils/Rating";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa";

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
    } catch (error) {
      console.error("Error fetching organization data:", error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [params.id]);

  return (
    <div className="w-full text-white p-2 flex items-center justify-evenly py-16 flex-col">
      {/* Organization Details */}
      <div className="flex gap-16 w-[80vw] border-b border-zinc-700 py-4">
        {/* Logo and Description */}
        <div className="w-full">
          <div className="flex items-center gap-3 justify-center w-full">
            {Data?.image ? (
              <Image
                src={Data.image}
                className="h-16 w-16 rounded-full"
                alt={`${Data.name} Logo`}
                width={100}
                height={100}
              />
            ) : (
              <div className="h-20 w-20 bg-zinc-700 rounded-full flex items-center justify-center">
                <span className="text-zinc-400">No Image</span>
              </div>
            )}
            <div className="flex flex-col items-start gap-0.5 self-start">
              <h1 className="font-semibold text-3xl">{Data?.name || "Unknown Name"}</h1>
              <p className="text-zinc-500 text-base">
                {Data?.category?.name || "No Category"}
              </p>
              <a href={Data?.url}
              className="text-zinc-500 hover:underline flex items-center justify-center gap-2 font-medium text-sm " target="_blank" rel="noreferrer noopener"
              ><FaLink /> {Data?.url} </a>
            </div>
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
      <div className="h-[60vh] w-full py-5 items-center flex justify-center">
        <div className="h-full w-[61.5%] border-r flex flex-col items-center justify-center border-zinc-700">
          <WriteReview id={Array.isArray(params.id) ? params.id[0] : params.id} />
          <Reviews />
        </div>  
        <div className="flex flex-col items-center justify-evenly w-[20%] h-full">
          <Activity />
          <Relevant />
        </div>
      </div>
    </div>
  );
};

export default Page;
  