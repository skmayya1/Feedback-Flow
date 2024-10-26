const Card = ({ name, review }: { name: string; review: string }) => {
    return (
        <div className="h-[14vw] w-[23vw] border border-zinc-700 p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-600 mt-2">{review}</p>
        </div>
    );
};

export default Card;
