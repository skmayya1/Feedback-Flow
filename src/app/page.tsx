
//import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";

import AreyouaBusiness from "@/Components/AreyouaBusiness"
import Intro from "@/Components/Intro"
import RecentReviews from "@/Components/RecentReviews"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

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
      <Intro/>
      <RecentReviews/>
      <AreyouaBusiness />
    </div>
  )
}

export default page       