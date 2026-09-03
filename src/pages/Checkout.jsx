import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="container section flex flex-col items-center justify-center animate-fade-in" style={{ minHeight: '60vh', textAlign: 'center' }}>
        <CheckCircle size={64} style={{ color: '#10b981', marginBottom: '1.5rem' }} />
        <h1 style={{ marginBottom: '1rem' }}>Order Confirmed!</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '400px' }}>
          Thank you for your purchase. We've received your order and will email you the receipt and shipping details shortly.
        </p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  if (cartItems.length === 0 && !isSuccess) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="animate-fade-in section">
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>Checkout</h1>
        
        <div className="grid grid-cols-2 gap-8" style={{ alignItems: 'start' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Shipping Information</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>First Name</label>
                  <input type="text" className="input" required />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Last Name</label>
                  <input type="text" className="input" required />
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
                <input type="email" className="input" required />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Address</label>
                <input type="text" className="input" required />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>City</label>
                  <input type="text" className="input" required />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Postal Code</label>
                  <input type="text" className="input" required />
                </div>
              </div>
              
              <hr style={{ margin: '1rem 0', borderColor: 'var(--border-color)' }} />
              
              <h2 style={{ marginBottom: '1rem' }}>Payment</h2>
              <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: '#f8fafc' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>This is a demo store. No actual payment will be processed.</p>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '1rem', marginTop: '1rem', fontSize: '1.125rem' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
              </button>
            </form>
          </div>
          
          <div>
            <div className="card" style={{ padding: '1.5rem', backgroundColor: '#f8fafc' }}>
              <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Order Summary</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div style={{ position: 'relative' }}>
                        <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                        <span className="badge" style={{ top: '-8px', right: '-8px', fontSize: '0.65rem' }}>{item.quantity}</span>
                      </div>
                      <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{item.name}</span>
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <hr style={{ margin: '1rem 0', borderColor: 'var(--border-color)' }} />
              
              <div className="flex justify-between" style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between" style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                <span>Free</span>
              </div>
              
              <div className="flex justify-between" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>Total</span>
                <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
