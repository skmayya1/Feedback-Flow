"use client";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import Card from "./Card";

const RecentReviews = () => {
    const reviews = [
        { name: 'John Doe', review: 'Great product! Really loved the quality.' },
        { name: 'Jane Smith', review: 'The product was decent, could be better.' },
        { name: 'Alice Johnson', review: 'Absolutely fantastic! Highly recommend it.' },
        { name: 'Mark Brown', review: 'Not bad, but I expected more from it.' },
        { name: 'Sophia White', review: 'Excellent build quality and performance.' },
        { name: 'Daniel Green', review: 'Good product, arrived on time, works well.' }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsPerPage = 4; // Number of cards to display at a time

    const handleNext = () => {
        if (currentIndex + cardsPerPage < reviews.length) {
            setCurrentIndex(currentIndex + 2); // Move two cards at a time
        }
    };

    const handlePrev = () => {
        if (currentIndex - 2 >= 0) {
            setCurrentIndex(currentIndex - 2); // Move two cards at a time
        }
    };

    // Slicing the reviews array to show the current set of cards
    const currentReviews = reviews.slice(currentIndex, currentIndex + cardsPerPage);

    return (
        <div className="h-[30vw] rounded-3xl w-[50vw] flex flex-col items-center gap-5 text-white mb-14">
            <div className="flex justify-between w-full">
                <h1 className="text-3xl font-semibold">Recent reviews</h1>
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
                        disabled={currentIndex + cardsPerPage >= reviews.length}
                    >
                        <FaChevronRight size={20} />
                    </button>
                </div>
            </div>
            <div className="grid grid-rows-2 auto-cols-fr grid-flow-col gap-4 h-full w-full overflow">
                {currentReviews.map((item, index) => (
                    <Card key={index} name={item.name} review={item.review} />
                ))}
            </div>
        </div>
    );
};

export default RecentReviews;
