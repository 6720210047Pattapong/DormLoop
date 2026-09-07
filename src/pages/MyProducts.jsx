import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { ProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const { products, deleteProduct } = useContext(ProductContext);
  
  // Since we don't have real sellerId in mock data yet, we just show all or mock it.
  // In a real app we filter by `sellerId === user.id`. For now, let's just assume they own products 1-4 if user, all if admin.
  // Or better, let's just show all for demo purposes, or a slice.
  const myProducts = user?.role === 'admin' 
    ? products 
    : products.filter(p => p.id % 2 === 0); // Fake filter just to show some products

  const handleDelete = (id) => {
    if (!window.confirm(language === 'TH' ? 'คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?' : 'Are you sure you want to delete this product?')) return;
    deleteProduct(id);
  };

  return (
    <div className="container" style={{ padding: '2rem 0', minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>{language === 'TH' ? 'สินค้าของฉัน' : 'My Products'}</h2>
        <Link to="/product/create" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--primary-color)' }}>
          <Plus size={20} /> {language === 'TH' ? 'ลงขายสินค้า' : 'Create Listing'}
        </Link>
      </div>

      {myProducts.length === 0 ? (
        <p>{language === 'TH' ? 'คุณยังไม่มีสินค้าที่ลงขาย' : "You haven't listed any products yet."}</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {myProducts.map(product => (
            <div key={product.id} className="product-card" style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <img src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'} alt={product.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{product.title}</h3>
                <p style={{ color: 'var(--primary-color)', fontWeight: 600, fontSize: '1.25rem', marginBottom: '1rem' }}>฿{product.price}</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link to={`/product/edit/${product.id}`} className="btn" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f0f0f0', border: '1px solid #ddd' }}>
                    <Edit size={16} /> {language === 'TH' ? 'แก้ไข' : 'Edit'}
                  </Link>
                  <button onClick={() => handleDelete(product.id)} className="btn" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5' }}>
                    <Trash2 size={16} /> {language === 'TH' ? 'ลบ' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
