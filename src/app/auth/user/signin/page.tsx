"use client"
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";


const Page =  () => {
    const { isAuthenticated } = useKindeBrowserClient();
    console.log(isAuthenticated);

  return (
      <div className="h-fit w-full flex flex-col items-center justify-center gap-20 text-black py-5">
          <div className="flex flex-col items-center justify-center gap-1">
              <div className="relative">
                  <h1 className="z-50 text-3xl font-mono font-bold text-[#4b695b]">Feedback Flow</h1>
                  <div className="absolute -z-10 bottom-0.5 h-2.5 w-60 bg-[#87ffc579]"></div>
              </div>
              <p className="text-xs  font-light text-gray-600 font-sans">&quot;Empowering customers to voice their experiences&quot;</p>
          </div>
          <div className="group text-black transition-all duration-500 ease-in-out">
              <h1 className="text-4xl font-bold bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">Read reviews. Write reviews. Find companies.</h1>
          </div>
          <div className="flex flex-col h-[10vw] w-[30vw] rounded-lg  shadow-md border border-zinc-400 shadow-black  items-center justify-center gap-5">
              <h2 className="text-black text-lg font-semibold">Log in or sign up below</h2>
              <LoginLink authUrlParams={
                  {
                      connection_id: "conn_0192bec1b73960013fcf0f420dcdf941"
                  }
              }
                  className="px-5 rounded-lg py-2 flex items-center justify-center gap-5 text-base font-sans font-normal hover:border-zinc-600 border-zinc-400 border w-[60%] hover:bg-[#e5f0e2] transition-all ease-in-out duration-500">
                  <FcGoogle size={23}/> Sign in with Google
              </LoginLink>
          </div>
          <div className="flex flex-col items-center gap-5">
              <h3 className="text-3xl font-bold">Are you a business?</h3>
              <div className="flex items-center justify-center gap-5 ">
                  <Link href='/' className="py-2 px-4 rounded-3xl bg-[#87BBA2]">Login</Link>
                  <Link href='/' className="py-2 px-4 rounded-3xl border border-[#87BBA2]">Signup</Link>
              </div>
          </div>
      </div>
  )
}

export default Page