import { ReleventData } from '@/lib/Interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Relevant = ({ data }: { data: ReleventData[] }) => {
  return (
    <div className="w-full px-4 py-3 border border-zinc-800 rounded-lg bg-zinc-900 shadow-md">
      <h2 className="text-lg font-bold mb-3 text-white">Similar</h2>
      <div className="flex flex-col gap-3">
        {data.map((item, index) => (
          <Link href={`/organization/${item.id}`}
            key={index}
            className="flex items-center gap-3 p-2 bg-zinc-900 rounded-md hover:bg-zinc-800 transition-colors"
          >
            <Image
              src={item.image || '/placeholder.png'}
              alt={item.name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-sm font-semibold text-white">{item.name}</h1>
              <p className="text-xs text-zinc-400">
                Rating: <span className="font-medium text-green-500">{item.avg_rating.toFixed(1) || 'N/A'}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Relevant;
