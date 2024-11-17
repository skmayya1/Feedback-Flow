"use client";

import Reviews from "@/components/Components/Dashboard/Organization/Reviews";
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
    fetchData();
  }, [params.id]);

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white flex flex-col items-center py-10 px-4 lg:px-16">
      {/* Organization Details */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 w-full max-w-7xl border-b border-zinc-800 pb-8">
        {/* Logo and Description */}
        <div className="flex items-start gap-5 w-full lg:w-1/2">
          {Data?.image ? (
            <Image
              src={Data.image}
              className="h-20 w-20 rounded-full object-cover"
              alt={`${Data.name} Logo`}
              width={80}
              height={80}
            />
          ) : (
            <div className="h-20 w-20 bg-zinc-900 rounded-full flex items-center justify-center">
              <span className="text-zinc-500 text-sm">No Image</span>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{Data?.name || "Unknown Name"}</h1>
            <p className="text-zinc-500">{Data?.category?.name || "No Category"}</p>
            <a
              href={Data?.url}
              className="text-green-500 hover:underline flex items-center gap-2 text-sm"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaLink /> {Data?.url}
            </a>
          </div>
        </div>

        {/* Ratings and Reviews Summary */}
        <div className="flex gap-10 lg:gap-20 items-center justify-center w-full lg:w-1/2">
          <div className="flex flex-col items-center">
            <h1
              className="text-3xl font-mono font-bold"
              style={{ color: getRatingColor(Data?.avg_rating as number) }}
            >
              {Data?.avg_rating?.toFixed(1) || "-"}
            </h1>
            <p className="text-sm font-semibold text-zinc-400">Average Rating</p>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-mono font-bold">{Data?.feedback?.length || 0}</h1>
            <p className="text-sm font-semibold text-zinc-400">Reviews</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-10 pt-10">
        {/* Main Reviews Section */}
        <div className="w-full lg:w-3/4 flex flex-col gap-6 border-r border-zinc-800 pr-4">
          <WriteReview id={Array.isArray(params.id) ? params.id[0] : params.id} />
          <Reviews id={Array.isArray(params.id) ? params.id[0] : params.id} />
        </div>

        {/* Sidebar Section */}
        <div className="w-full lg:w-1/4 flex flex-col gap-6">
          <Activity />
          <Relevant />
        </div>
      </div>
    </div>
  );
};

export default Page;
