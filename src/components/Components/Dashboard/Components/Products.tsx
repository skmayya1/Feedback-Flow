import React from 'react'

const Products = () => {
  return (
    <div className="flex flex-col gap-1 items-center px-32">
      <div className="flex w-full h-16 justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-200">Products</h1>
        <button className="px-3 py-1.5 bg-[#87BBA2] font-medium text-zinc-800 rounded-lg hover:bg-[#98c4ae]">
          Add Product
        </button>
      </div>
      <div className="w-full px-5">
        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr className="text-gray-400 font-light text-sm border-b border-zinc-700">
              <th className="py-2 w-[16.66%]">Id</th>
              <th className="py-2 w-[16.66%]">Name</th>
              <th className="py-2 w-[16.66%]">Category</th>
              <th className="py-2 w-[16.66%]">Total Reviews</th>
              <th className="py-2 w-[16.66%]">Average Rating</th>
              <th className="py-2 w-[16.66%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-gray-400 font-light text-sm border-b border-zinc-700">
              <td className="py-2">1</td>
              <td className="py-2">Product 1</td>
              <td className="py-2">Category 1</td>
              <td className="py-2">10</td>
              <td className="py-2">4.5</td>
              <td className="py-2">
                {/* Add action buttons or links here */}
                <button className="text-blue-500 hover:underline">Edit</button>
                <button className="text-red-500 hover:underline ml-2">Delete</button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Products
