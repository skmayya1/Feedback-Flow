"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useToken } from "@/hooks/useToken";
import Logout from "./Logout";

const Navbar = () => {
    const { isAuthenticated, user, isLoading } = useKindeBrowserClient();
    const [isScrolled, setIsScrolled] = useState(false);
    const token = useToken();

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", handleScroll);
            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }
    }, []);

    return (
        <div
            className={`h-[9vh] w-full text-gray-300 fixed z-10 flex items-center justify-center ${isScrolled ? "mt-4" : ""
                } backdrop-blur-md bg-zinc-900 bg-opacity-70 transition-all`}
        >
            <div
                className={`h-full flex items-center justify-between border-zinc-600 rounded-full px-[10vw] transition-all ${isScrolled
                        ? "border w-[80%] shadow-md shadow-zinc-900"
                        : "w-full"
                    }`}
            >
                <Link href="/" className="text-xl font-bold font-sans">
                    Feedback Flow
                </Link>
                <div className="flex items-center gap-5">
                    <NavLink href="/" label="Write a review" />
                    <NavLink href="/" label="Categories" />
                    <NavLink href="/" label="Pricing" />

                    {!isAuthenticated && !isLoading && !token && (
                        <div className="flex items-center gap-3">
                            <NavLink href="/auth/user/signin" label="Login" />
                            <Link
                                href="/auth/organization/signup"
                                className="text-black font-semibold text-xs px-4 py-2 bg-[#87BBA2] rounded-full hover:bg-[#96d6b7] transition-colors duration-300"
                            >
                                For Businesses
                            </Link>
                        </div>
                    )}

                    {isAuthenticated && user && !isLoading && (
                        <div className="flex items-center gap-3">
                            <Link
                                href="/"
                                className="hover:bg-zinc-700 rounded-full p-2 transition-colors duration-300 gap-2.5 bg-zinc-800 items-center px-3 flex"
                            >
                                <p className="font-bold">{user.given_name}</p>
                                {user.picture && (
                                    <Image
                                        src={user.picture}
                                        alt="profile"
                                        width={35}
                                        height={35}
                                        className="rounded-full"
                                    />
                                )}
                            </Link>
                        </div>
                    )}

                    {token && (
                        <div className="flex items-center gap-3">
                            <NavLink href="/organization/dashboard" label="Dashboard" />
                            <Logout />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link href={href} className="group transition duration-300 font-medium text-sm">
        {label}
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-gray-300"></span>
    </Link>
);

export default Navbar;
