
//import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";

import AreyouaBusiness from "@/Components/AreyouaBusiness"
import Intro from "@/Components/Intro"
import RecentReviews from "@/Components/RecentReviews"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import Link from "next/link"

const page = async () => {

  return (
    <div className="h-[200vh] w-full bg-zinc-800 flex flex-col items-center gap-12 ">
      <div className="h-[80%] flex flex-col  items-center justify-center gap-10">
        <div className="flex">
          <h1 className="text-6xl tracking-wider text-white font-bold">Your Voice,</h1>
          <TextGenerateEffect words="Their Improvement!"/>
        </div>
        <input
          placeholder="Search company or product"
          className="w-[25vw] py-3 px-6 bg-[#F0F7EE] outline-none rounded-full"
          type="text" />
      </div>
      <div className="w-full h-16 flex items-center justify-center text-white">
        <span className="h-[0.1vh]  w-[30%] bg-zinc-700 "></span>
        <h2 className="px-4 py-2  border border-zinc-700 rounded-full">Bought something recently? <Link className="text-yellow-200 underline" href='/'>Write a review</Link></h2>
        <span className="h-[0.1vh]  w-[30%] bg-zinc-700 "></span>
      </div>
      <Intro/>
      <RecentReviews/>
      <AreyouaBusiness />
    </div>
  )
}

export default page        