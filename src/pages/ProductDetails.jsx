import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container section text-center">
        <h2>Product not found</h2>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="animate-fade-in section">
      <div className="container">
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-outline" 
          style={{ marginBottom: '2rem', padding: '0.5rem 1rem' }}
        >
          <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Back
        </button>

        <div className="grid grid-cols-2 gap-8" style={{ alignItems: 'start' }}>
          <div>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }} 
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <span style={{ color: 'var(--primary-color)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {product.category}
              </span>
              <h1 style={{ fontSize: '3rem', margin: '0.5rem 0' }}>{product.name}</h1>
              <span style={{ fontSize: '2rem', fontWeight: 700 }}>${product.price.toFixed(2)}</span>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: 1.6 }}>
              {product.description}
            </p>
            
            <div style={{ marginTop: '1rem' }}>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }}
                onClick={handleAddToCart}
                disabled={added}
              >
                {added ? (
                  <><Check size={20} style={{ marginRight: '0.5rem' }} /> Added to Cart</>
                ) : (
                  <><ShoppingCart size={20} style={{ marginRight: '0.5rem' }} /> Add to Cart</>
                )}
              </button>
            </div>
            
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '1rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Features</h3>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Premium quality materials</li>
                <li>Fast and secure shipping</li>
                <li>30-day return policy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
