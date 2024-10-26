import { Link } from "lucide-react"
import { IoIosArrowRoundForward } from "react-icons/io"


const Intro = () => {
  return (
          <div className="h-[25vw] rounded-3xl w-[50vw] bg-[#87BBA2] flex items-center justify-between text-white px-10">
              <div className="flex flex-col gap-2">
              <h1 className="font-bold text-3xl">Help millions make the right choice</h1>
              <p className="font-light text-sm">Your feedback counts! Review your experience on Feedback Flow.</p>
                  <Link className="flex gap-3 font-semibold items-center border rounded-full w-fit px-2 py-1 hover:scale-105 transition-all ease-in-out" href='/'>Get Started <IoIosArrowRoundForward /></Link>
              </div>
              <div className="flex flex-col items-center">
                  <h1 className="text-6xl font-bold">1K+</h1>
                  <p className="text-lg font-normal">Companies</p>
              </div>
          </div>
          )
}

export default Intro