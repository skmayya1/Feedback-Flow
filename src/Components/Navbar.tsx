"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const { isAuthenticated  } = useKindeBrowserClient();
  return (
    <div className="h-[9vh] w-full text-gray-300 bg-zinc-800 fixed z-10 flex items-center justify-between px-[10vw]">
      <Link href="/"  className="text-xl font-bold font-sans">Feedback Flow</Link>
      <div className="flex items-center gap-5 ">
        <Link href='/' className="group transition duration-300 font-medium text-xs ">
          Write a review
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-gray-300 "></span>
        </Link>
        <Link href='/' className="group  transition duration-300 font-medium text-xs">
          Categories
          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-gray-300 "></span>
        </Link>
        {!isAuthenticated &&
          <div className="flex items-center gap-3">
            <Link href='/' className="group  transition duration-300 font-medium text-xs">
              Login
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-gray-300 "></span>
            </Link>
            <Link href='/' className="text-black font-semibold text-xs px-4 py-2 bg-[#87BBA2] rounded-full hover:bg-[#96d6b7] ">For Businesses</Link>
          </div>
        }
        {isAuthenticated &&
          <div className="flex items-center gap-3">  
            <Link href='/' className="hover:bg-gray-700 rounded-full p-2"><FaUser/></Link>
          </div>
        }
      </div>
     </div>
  )
}

export default Navbar