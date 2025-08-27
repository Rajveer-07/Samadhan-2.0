import React from 'react';

// props ko destructure kiya hai, short me ho jaata hai
function ProductCard({ name, price, imageUrl }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 overflow-hidden w-64">
      <img src={imageUrl} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col justify-between">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {name}
        </h3>
        <p className="text-2xl font-bold text-blue-600">
          ₹{price}
        </p>
        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;