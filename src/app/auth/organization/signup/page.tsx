"use client";

import { toast } from "@/hooks/use-toast";
import { useToken } from "@/hooks/useToken";
import { setCookie } from "@/lib/utils/Cookies";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaCheck } from "react-icons/fa6";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [selectable, setselectable] = useState(false)
  const [formData, setFormData] = useState<{
    website: string;
    name: string;
    email: string;
    password: string;
    logo?: string;
  }>({
    website: "",
    name: "",
    email: "",
    password: "",
    logo: "",
  });
  const token = useToken();
  const router = useRouter()
  if (token) { 
    router.push('/dashboard')
  }
  

  const handleChange = async (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setFormData({
      ...formData,
      [name]: value,
    });    

    if (name === "website") {
      setFormData((prev) => ({
        ...prev,
        logo: "",
      }));
    }
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault()
    setLoading(true);
    setselectable(true)
    if (!formData.website || !formData.name || !formData.email || !formData.password) { 
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      })
      setLoading(false);
      setselectable(false)
      return
    }
    try {
      const response = await fetch('/api/auth/organization/signup', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      
      const data = await response.json();
      if (response.ok) {
        await setCookie("accesskey",data);  
        toast({
          title: "Success",
          description: "Organization created successfully",
          variant: "default",
        })
        setFormData({
          website: "",
          name: "",
          email: "",
          password: "",
          logo: "",
        })
        router.push('/dashboard')
      } else {
        toast({
          title: "Error",
          description: data,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
      setLoading(false);
      setselectable(true)
    }
    finally {
      setLoading(false);
      setselectable(false)
    }
  }

  const checkLogo = async () => {    
    if (!formData.website) return;
    
    const url = `https://logo.clearbit.com/${formData.website}`;
    console.log(url);
    setFormData((prev) => ({
      ...prev,
      logo: url,
    }));
  }
  return (
    <div className="h-fit w-full flex items-center justify-center">
      <form
        className="h-[60vh] w-[60vh] border border-zinc-700 rounded-xl flex flex-col items-center justify-center gap-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-zinc-400 text-2xl font-semibold">Create a free account</h1>
        <div className="flex gap-2 w-full items-center justify-center">
          {formData.logo  && (
            <Image
              className="rounded-lg"
              src={formData.logo}
              width={36}
              height={36}
              alt="Website Logo"
              quality={100}
            />
          )}

          <input
            type="text"
            placeholder="Website"
            name="website"
            onChange={handleChange}
            className="w-[68%] bg-transparent outline-none text-white p-2 my-2 border border-zinc-700 rounded-lg placeholder:text-zinc-500"
          />
          {!formData.logo && <button className="p-2.5 bg-white rounded-lg" onClick={checkLogo}><FaCheck  /></button>}
         
        </div>
        <input
          type="text"
          placeholder="Company name"
          name="name"
          onChange={handleChange}
          className="w-[75%] bg-transparent outline-none text-white p-2 my-2 border border-zinc-700 rounded-lg placeholder:text-zinc-500"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          className="w-[75%] bg-transparent outline-none text-white p-2 my-2 border border-zinc-700 rounded-lg placeholder:text-zinc-500"
        />
        <input
          type="password"
          placeholder="password "
          name="password"
          onChange={handleChange}
          className="w-[75%] bg-transparent outline-none text-white p-2 my-2 border border-zinc-700 rounded-lg placeholder:text-zinc-500"
        />
        <div className="flex w-[75%] items gap-2 px-5 text-zinc-400">
          <input type="checkbox" name="" id="checkbox" />
          <label htmlFor="checkbox">I agree to the terms and conditions</label>
        </div>
        <button disabled={selectable} className="w-[75%] bg-[#87BBA2] outline-none text-zinc-800  p-2 my-2 border border-zinc-700 rounded-lg" type="submit">
         {loading ? "Loading..." : "Create free account"}
        </button>
      </form>
    </div>
  );
};

export default Page;
