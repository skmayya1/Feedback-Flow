"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`h-[9vh] w-full text-gray-300 fixed z-10 flex items-center justify-center ${isScrolled ? 'mt-4' : ''} backdrop-blur-md bg-zinc-800 bg-opacity-70 transition-all`}>
      <div className={`h-full flex items-center justify-between border-zinc-600 rounded-full px-[10vw] transition-all ${isScrolled ? 'border w-[80%]  shadow-md shadow-zinc-900' : 'w-full'}`}>
        <Link href="/" className="text-xl font-bold font-sans">Feedback Flow</Link>
        <div className="flex items-center gap-5 ">
          <Link href='/' className="group transition duration-300 font-medium text-sm ">
            Write a review
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-gray-300 "></span>
          </Link>
          <Link href='/' className="group transition duration-300 font-medium text-sm">
            Categories
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-gray-300 "></span>
          </Link>
          <Link href='/' className="group transition duration-300 font-medium text-sm">
            Pricing
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-gray-300 "></span>
          </Link>
          {(!isAuthenticated && !isLoading) && (
            <div className="flex items-center gap-3">
              <Link href="/" className="group transition duration-300 font-medium text-sm">
                Login
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-gray-300"></span>
              </Link>
              <Link
                href="/"
                className="text-black font-semibold text-xs px-4 py-2 bg-[#87BBA2] rounded-full hover:bg-[#96d6b7] transition-colors duration-300"
              >
                For Businesses
              </Link>
            </div>
          )}
          {(isAuthenticated && !isLoading) && (
            <div className="flex items-center gap-3">
              <Link href="/" className="hover:bg-zinc-700 rounded-full p-2 transition-colors duration-300">
                <FaUser size={18} color="87BBA2" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar;
