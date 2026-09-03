import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <Link to={`/product/${product.id}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: '100%', height: '250px', objectFit: 'cover' }} 
        />
      </Link>
      <div style={{ padding: '1.5rem' }}>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {product.category}
        </span>
        <Link to={`/product/${product.id}`}>
          <h3 style={{ marginTop: '0.5rem', marginBottom: '0.5rem', fontSize: '1.25rem' }}>{product.name}</h3>
        </Link>
        <div className="flex items-center justify-between" style={{ marginTop: '1rem' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>${product.price.toFixed(2)}</span>
          <button 
            className="btn btn-primary" 
            style={{ padding: '0.5rem 1rem' }}
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={18} style={{ marginRight: '0.5rem' }} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
