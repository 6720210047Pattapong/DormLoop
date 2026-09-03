import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Shop = () => {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', ...new Set(products.map(p => p.category))];
  
  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="animate-fade-in section">
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>Shop Collection</h1>
        
        {/* Filters */}
        <div className="flex gap-4" style={{ marginBottom: '3rem', overflowX: 'auto', paddingBottom: '1rem' }}>
          {categories.map(category => (
            <button 
              key={category}
              className={`btn ${filter === category ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
