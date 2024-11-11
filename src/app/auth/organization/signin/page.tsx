"use client";

import { toast } from "@/hooks/use-toast";
import { useToken } from "@/hooks/useToken";
import {  setCookie } from "@/lib/utils/Cookies";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from "react";

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const [selectable, setSelectable] = useState(false);
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const token = useToken();
  const router = useRouter();
  
  useEffect(() => {
    if (token) {
      router.push('/organization/dashboard');
    }
  }, [token, router]);
  const handleChange = async (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSelectable(true);
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Email and password are required",
        variant: "destructive",
      });
      setLoading(false);
      setSelectable(false);
      return;
    }
    try {
      const response = await fetch('/api/auth/organization/signin', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      const data = await response.json();
      console.log('dsd', data);
      
      if (response.ok) {
        await setCookie("accesskey", data);
        toast({
          title: "Success",
          description: "Signed in successfully",
          variant: "default",
        });
        setFormData({
          email: "",
          password: "",
        });
        router.push('/organization/dashboard');
      } else {
        toast({
          title: "Error",
          description: data,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      setLoading(false);
      setSelectable(true);
    }
    finally {
      setLoading(false);
      setSelectable(false);
    }
  };

  return (
    <div className="h-fit w-full flex items-center justify-center">
      <form
        className="h-[50vh] w-[50vh] border border-zinc-700 rounded-xl flex flex-col items-center justify-center gap-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-zinc-400 text-2xl font-semibold">Sign in to your account</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          className="w-[75%] bg-transparent outline-none text-white p-2 my-2 border border-zinc-700 rounded-lg placeholder:text-zinc-500"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          className="w-[75%] bg-transparent outline-none text-white p-2 my-2 border border-zinc-700 rounded-lg placeholder:text-zinc-500"
        />
        <button disabled={selectable} className="w-[75%] bg-[#87BBA2] outline-none text-zinc-800 p-2 my-2 border border-zinc-700 rounded-lg" type="submit">
          {loading ? "Loading..." : "Sign in"}
        </button>
        <p className="text-zinc-300">Dont have an account? <Link className="text-green-300 underline" href='/auth/organization/signup'>Register</Link></p>
      </form>
    </div>
  );
};

export default SignInPage;
