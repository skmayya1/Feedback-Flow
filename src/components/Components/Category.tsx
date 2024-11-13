import { CategoryProps } from '@/lib/Interfaces';
import Link from 'next/link';
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Category = ({ data }: { data: CategoryProps }) => {
    return (
        <div className="flex flex-col items-center justify-center hover:bg-zinc-700 rounded-lg transition-all duration-300 ease-in-out">
            <Link
                className="flex text-zinc-300 flex-col items-center gap-2 justify-center w-fit"
                href={`/categories/${data.id}`}
            >
                <i className={data.icon}></i>
                <p className="category-name  font-normal text-base">{data.name}</p>
            </Link>
        </div>
    );
};

export default Category;
