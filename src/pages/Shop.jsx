import React, { useState, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';
import { ProductContext } from '../context/ProductContext';
import { LanguageContext } from '../context/LanguageContext';

const Shop = () => {
  const { products } = useContext(ProductContext);
  const { language } = useContext(LanguageContext);
  
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Electronics', 'Furniture', 'Dorm', 'Books', 'Clothes', 'Others'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filter === 'All' || p.category === filter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-fade-in section">
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>
          {language === 'TH' ? 'สินค้าทั้งหมด' : 'Shop Collection'}
        </h1>
        
        {/* Search */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', background: 'white', borderRadius: '4px', border: '1px solid #ccc', maxWidth: '400px', padding: '0 0.5rem' }}>
          <Search size={20} color="#666" />
          <input 
            type="text" 
            placeholder={language === 'TH' ? 'ค้นหาสินค้า...' : 'Search products...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', border: 'none', outline: 'none' }}
          />
        </div>

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
        {filteredProducts.length === 0 ? (
          <p>{language === 'TH' ? 'ไม่พบสินค้า' : 'No products found.'}</p>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
