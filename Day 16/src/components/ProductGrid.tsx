import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/context/CartContext';

// Sample products data - yahan actual products ki list hai
import headphonesImg from '@/assets/headphones.jpg';
import smartphoneImg from '@/assets/smartphone.jpg';
import laptopImg from '@/assets/laptop.jpg';
import smartwatchImg from '@/assets/smartwatch.jpg';

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 2999,
    image: headphonesImg,
    description: 'Premium quality wireless headphones with noise cancellation and 20hr battery life. Perfect for music lovers!'
  },
  {
    id: '2', 
    name: 'Smartphone Pro Max',
    price: 79999,
    image: smartphoneImg,
    description: 'Latest flagship smartphone with advanced camera, fast processor and all-day battery. Best phone in the market!'
  },
  {
    id: '3',
    name: 'Gaming Laptop',
    price: 65999,
    image: laptopImg,
    description: 'High-performance gaming laptop with RTX graphics and fast SSD. Gaming ka maza double!'
  },
  {
    id: '4',
    name: 'Fitness Smartwatch',
    price: 8999,
    image: smartwatchImg,
    description: 'Advanced smartwatch with health monitoring, GPS tracking and waterproof design. Fitness ke liye perfect!'
  },
  // Duplicate products for demo - real mein database se aayenge
  {
    id: '5',
    name: 'Wireless Earbuds Pro',
    price: 4999,
    image: headphonesImg,
    description: 'Compact wireless earbuds with crystal clear sound and active noise cancellation.'
  },
  {
    id: '6',
    name: 'Budget Smartphone',
    price: 12999,
    image: smartphoneImg,
    description: 'Affordable smartphone with great features and excellent value for money. Budget friendly option!'
  }
];

const ProductGrid: React.FC = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collection of premium electronics and gadgets. 
            Sabse best products, sabse achhe prices mein!
          </p>
        </div>

        {/* Products grid - responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;