import React, { useState, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';
import { ProductContext } from '../context/ProductContext';
import { LanguageContext } from '../context/LanguageContext';

const Shop = () => {
  const { products, fetchProducts, loading } = useContext(ProductContext);
  const { language } = useContext(LanguageContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const categories = ['All', 'Electronics', 'Furniture', 'Dorm Essentials', 'Books', 'Clothes', 'Others'];

  const initialCategory = (() => {
    const categoryFromUrl = searchParams.get('category');
    return categories.includes(categoryFromUrl) ? categoryFromUrl : 'All';
  })();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(initialCategory);

  useEffect(() => {
    setFilter(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    fetchProducts(search, filter);
  }, [search, filter, fetchProducts]);

  const handleFilterChange = (nextFilter) => {
    setFilter(nextFilter);
    if (nextFilter === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: nextFilter });
    }
  };

  return (
    <div className="animate-fade-in section">
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>
          {language === 'TH' ? 'สินค้าทั้งหมด' : 'Shop Collection'}
        </h1>

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

        <div className="flex gap-4" style={{ marginBottom: '3rem', overflowX: 'auto', paddingBottom: '1rem' }}>
          {categories.map(category => (
            <button
              key={category}
              className={`btn ${filter === category ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handleFilterChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <p>{language === 'TH' ? 'กำลังโหลดสินค้า...' : 'Loading products...'}</p>
        ) : products.length === 0 ? (
          <p>{language === 'TH' ? 'ไม่พบสินค้า' : 'No products found.'}</p>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
