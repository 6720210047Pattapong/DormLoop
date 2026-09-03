import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container section flex flex-col items-center justify-center" style={{ minHeight: '60vh' }}>
        <h2 style={{ marginBottom: '1rem' }}>Your cart is empty</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in section">
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>Shopping Cart</h1>
        
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2" style={{ gridColumn: 'span 2' }}>
            <div className="card" style={{ padding: '1.5rem' }}>
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between" style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                    <div>
                      <h3 style={{ fontSize: '1.125rem' }}>{item.name}</h3>
                      <span style={{ color: 'var(--text-secondary)' }}>${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2" style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.25rem' }}>
                      <button className="btn-icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus size={16} />
                      </button>
                      <span style={{ width: '2rem', textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                      <button className="btn-icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <span style={{ fontWeight: 700, width: '80px', textAlign: 'right' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    
                    <button className="btn-icon" style={{ color: '#ef4444' }} onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="card" style={{ padding: '1.5rem', position: 'sticky', top: '100px' }}>
              <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Order Summary</h2>
              
              <div className="flex justify-between" style={{ marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between" style={{ marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                <span>Free</span>
              </div>
              
              <div className="flex justify-between" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem', marginBottom: '2rem' }}>
                <span style={{ fontWeight: 600, fontSize: '1.25rem' }}>Total</span>
                <span style={{ fontWeight: 700, fontSize: '1.5rem' }}>${cartTotal.toFixed(2)}</span>
              </div>
              
              <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                Proceed to Checkout <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
