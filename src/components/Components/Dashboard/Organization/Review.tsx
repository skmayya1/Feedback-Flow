import { Feedback } from "@/lib/Interfaces";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import { BiSolidUpvote } from "react-icons/bi";


const Review = ({feedback}:{feedback:Feedback}) => {
   console.log(feedback);
   
  return (
    <div className='min-h-[10vh] w-full flex flex-col gap-2 p-3 border  border-zinc-700 rounded-xl shadow-sm shadow-zinc-500'>
      {/* Review Poster */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center justify-center">
          <div className="h-10 w-10 bg-zinc-700 rounded-full overflow-hidden">
            {/* Poster Image */}
          </div>
          <p className='font-semibold text-lg'>Skanda</p>
          <p className="text-zinc-600 font-light text-sm">a day ago</p>
        </div>
        <p className='font-semibold text-zinc-500 text-sm '>Date Of Experience : 25/10/2024</p>
      </div>
      <div className="ml-10 flex flex-col items-start gap-2">
        <span className='rating rating-sm'>
          {[1, 2, 3, 4, 5].map((value) => (
            <input
              key={value}
              type="radio"
              name="rating-4"
              className="mask mask-star-2 bg-green-500"
              defaultChecked={value === 4}
              value={value}
            />
          ))}
        </span>
        <h1 className="font-semibold">Product was Amazing!!</h1>
        <p className="font-light text-zinc-300">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur mollitia odio illum dolorum similique maxime soluta recusandae repellendus eligendi molestiae fugiat labore dolore ea eius, laudantium quisquam est necessitatibus quo.</p>
      </div>
      {/* Review Rating & interaction */}
      <div className="flex ml-10 gap-6 text-gray-400">
        <button className="rounded-full p-1 hover:bg-zinc-700">
          <BiUpvote size={24}/>
        </button>
        <button className="rounded-full p-1 hover:bg-zinc-700">
          <BiDownvote size={24} />
        </button>
      </div>
    </div>
  )
}

export default Review