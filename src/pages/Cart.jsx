import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft, ShieldCheck, Truck, Wallet } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { LanguageContext } from '../context/LanguageContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { language } = useContext(LanguageContext);

  if (cartItems.length === 0) {
    return (
      <div className="container section text-center" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', background: 'white', border: '1px solid #e2e8f0', borderRadius: '28px', padding: '2.5rem 2rem', boxShadow: '0 18px 40px rgba(15, 23, 42, 0.05)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
          <h2 style={{ marginBottom: '0.75rem' }}>{language === 'TH' ? 'ตะกร้าของคุณว่างเปล่า' : 'Your cart is empty'}</h2>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>{language === 'TH' ? 'เลือกสินค้าเพื่อเพิ่มลงตะกร้าก่อนสั่งซื้อ' : 'Pick a few items and add them to your cart.'}</p>
          <Link to="/shop" className="btn btn-primary" style={{ padding: '0.9rem 1.5rem', borderRadius: '12px' }}>
            {language === 'TH' ? 'กลับไปเลือกสินค้า' : 'Continue shopping'}
          </Link>
        </div>
      </div>
    );
  }

  const shippingFee = 0;
  const total = cartTotal + shippingFee;

  return (
    <div className="container section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>{language === 'TH' ? 'ตะกร้าสินค้า' : 'Shopping cart'}</div>
          <h1 style={{ margin: '0.25rem 0 0', fontSize: '2.1rem' }}>{language === 'TH' ? 'สินค้าของคุณ' : 'Your items'}</h1>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/shop" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', borderRadius: '12px' }}>
            <ArrowLeft size={18} /> {language === 'TH' ? 'กลับร้านค้า' : 'Back to shop'}
          </Link>
          <button onClick={clearCart} className="btn btn-outline" style={{ color: '#dc2626', borderColor: '#fecaca', borderRadius: '12px' }}>
            {language === 'TH' ? 'ล้างตะกร้า' : 'Clear cart'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.9fr) minmax(280px, 0.9fr)', gap: '2rem', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '132px minmax(0, 1fr) auto', gap: '1rem', background: 'white', border: '1px solid #e2e8f0', borderRadius: '22px', padding: '1rem', alignItems: 'center', boxShadow: '0 12px 28px rgba(15, 23, 42, 0.04)' }}>
              <img src={item.image || 'https://via.placeholder.com/120x120?text=No+Image'} alt={item.title} style={{ width: '132px', height: '132px', objectFit: 'cover', borderRadius: '16px' }} />
              <div style={{ minWidth: 0 }}>
                <div style={{ color: '#0f172a', fontWeight: 700, letterSpacing: '0.02em', textTransform: 'uppercase', fontSize: '0.75rem', marginBottom: '0.35rem' }}>{item.category}</div>
                <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.18rem', lineHeight: 1.3 }}>{item.title}</h3>
                <div style={{ color: '#475569', marginBottom: '0.6rem' }}>{language === 'TH' ? 'จากผู้ขาย' : 'From seller'}: {item.seller?.name || 'TSU Market'}</div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>฿{Number(item.price).toLocaleString()}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginTop: '0.8rem' }}>
                  <button onClick={() => updateQuantity(item.id, Number(item.quantity) - 1)} className="btn-icon" style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <Minus size={16} />
                  </button>
                  <span style={{ minWidth: '26px', textAlign: 'center', fontWeight: 700 }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, Number(item.quantity) + 1)} className="btn-icon" style={{ width: '34px', height: '34px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', height: '100%' }}>
                <button onClick={() => removeFromCart(item.id)} className="btn-icon" style={{ color: '#dc2626', background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '10px', width: '40px', height: '40px' }}>
                  <Trash2 size={18} />
                </button>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>฿{(Number(item.price) * Number(item.quantity)).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>

        <aside style={{ position: 'sticky', top: '1.5rem', background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '1.5rem', boxShadow: '0 20px 42px rgba(15, 23, 42, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wallet size={18} color="#2563eb" />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.3rem' }}>{language === 'TH' ? 'สรุปคำสั่งซื้อ' : 'Order summary'}</h3>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '0.9rem 1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a', fontWeight: 700 }}>
              <ShieldCheck size={16} color="#16a34a" />
              {language === 'TH' ? 'ชำระเงินแบบปลอดภัย' : 'Secure payment'}
            </div>
            <div style={{ color: '#64748b', fontSize: '0.82rem', marginTop: '0.35rem' }}>{language === 'TH' ? 'สั่งสินค้าได้โดยไม่ต้องมี backend จริง' : 'Demo cart flow for mockup purposes'}</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.85rem 0', color: '#475569' }}>
            <span>{language === 'TH' ? 'ราคารวมสินค้า' : 'Subtotal'}</span>
            <strong>฿{cartTotal.toLocaleString()}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.85rem 0', color: '#475569' }}>
            <span>{language === 'TH' ? 'ค่าจัดส่ง' : 'Shipping'}</span>
            <strong>{language === 'TH' ? 'ฟรี' : 'Free'}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.85rem 0', color: '#475569' }}>
            <span>{language === 'TH' ? 'ภาษี' : 'Tax'}</span>
            <strong>฿0</strong>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '1rem 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>{language === 'TH' ? 'รวมทั้งสิ้น' : 'Total'}</span>
            <strong style={{ fontSize: '1.7rem', color: '#0f172a' }}>฿{total.toLocaleString()}</strong>
          </div>

          <button
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '1rem 1.2rem',
              borderRadius: '14px',
              fontWeight: 800,
              boxShadow: '0 16px 30px rgba(37, 99, 235, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem'
            }}
          >
            <Truck size={18} />
            {language === 'TH' ? 'ชำระเงิน' : 'Pay now'}
          </button>

          <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>
            {language === 'TH' ? 'Mock payment UI เท่านั้น — ไม่เรียก backend จริง' : 'Mock payment UI only — no real backend call'}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
