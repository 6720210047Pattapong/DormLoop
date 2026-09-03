import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-color)', letterSpacing: '-0.05em' }}>TSU Market</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6" style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/" style={{ fontWeight: 500 }}>Home</Link>
          <Link to="/shop" style={{ fontWeight: 500 }}>Shop</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="btn-icon" style={{ position: 'relative' }}>
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="badge">{cartCount}</span>
            )}
          </Link>
          <button className="btn-icon md:hidden" style={{ display: 'none' }}>
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
