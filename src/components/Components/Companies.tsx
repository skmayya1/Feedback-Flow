import { Data } from '@/lib/Interfaces'
import React, { useEffect, useState } from 'react'
import Company from './Company'
import Link from 'next/link';

const Companies = () => {
    const [data, setData] = useState<Data[]>([
        {
            avg_rating: 4.5,
            email: "",
            name: "Google",
            image: "https://cdn.worldvectorlogo.com/logos/google-icon.svg",
            url: "https://www.google.com",
            id: 'ds'
        }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/organization');
                const fetchedData = await res.json();
                setData(fetchedData.companies || []);
            } catch (error) {
                console.error("Failed to fetch data:", error);
                setData([]);
            }
        };
      fetchData();
    }, []);

    return (
        <div className="h-[30vw] rounded-3xl w-[50vw] flex flex-col items-center gap-5 text-white mb-12">
            <div className='self-start font-semibold text-3xl flex items-center justify-between w-full'>
                <h1>Top Companies</h1>
                <Link href='/organization' className='px-3 py-1.5 text-sm font-normal border text-zinc-300 text-center rounded-full border-zinc-500 hover:border-zinc-200'>See more</Link>
            </div> 
            <div className="flex h-full w-full items-center justify-start gap-5">
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((company) => (
                            <Company key={company.id} data={company} />
                    ))
                ) : (
                    <p>No companies available</p>
                )}
            </div>
        </div>
    );
};

export default Companies;
