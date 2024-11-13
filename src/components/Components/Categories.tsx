import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import Category from "./Category";
import { CategoryProps } from "@/lib/Interfaces";

const Categories = () => {
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsPerPage = 5;

    const handleNext = () => {
        if (currentIndex + cardsPerPage < categories.length) {
            setCurrentIndex(currentIndex + cardsPerPage);
        }
    };

    const handlePrev = () => {
        if (currentIndex - cardsPerPage >= 0) {
            setCurrentIndex(currentIndex - cardsPerPage);
        }
    };

    const currentCategories = categories.slice(currentIndex, currentIndex + cardsPerPage);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch('api/categories');
            const data = await res.json();

            console.log("Fetched data:", data); // Check structure of fetched data
            setCategories(data);
        };
       fetchCategories();
    }, []);

    useEffect(() => {
        console.log("Updated categories:", categories);
    }, [categories]);

    return (
        <div className="h-[30vw] rounded-3xl w-[50vw] flex flex-col items-center gap-14 text-white mb-8">
            <div className="flex justify-between w-full">
                <h1 className="text-3xl font-semibold">Explore by categories</h1>
                <div className="flex gap-2">
                    <button
                        onClick={handlePrev}
                        className="flex items-center justify-center hover:bg-zinc-700 rounded-full p-2"
                        disabled={currentIndex === 0}
                    >
                        <FaChevronLeft size={20} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="flex items-center justify-center hover:bg-zinc-700 rounded-full p-2"
                        disabled={currentIndex + cardsPerPage >= categories.length}
                    >
                        <FaChevronRight size={20} />
                    </button>
                </div>
            </div>
            <div className="grid grid-rows-1 auto-cols-fr grid-flow-col gap-4 h-full w-full overflow">
                {currentCategories.map((category, index) => (
                    <Category key={index} data={category} />
                ))}
            </div>
        </div>
    );
};

export default Categories;
