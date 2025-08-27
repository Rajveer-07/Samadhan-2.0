import React from 'react';
import ProductCard from './ProductCard';
import './index.css'; // Tailwind CSS ki main file yahan import hoti hai

// dummy data bana li, jaise backend se aayega
const products = [
  { id: 1, name: "Keyboard", price: 799, imageUrl: "https://via.placeholder.com/150" },
  { id: 2, name: "Mouse", price: 499, imageUrl: "https://via.placeholder.com/150" },
  { id: 3, name: "Headphones", price: 1299, imageUrl: "https://via.placeholder.com/150" },
];

function App() {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        My Gadgets Store
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {/* yahan map se products render kar rahe hain */}
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default App;