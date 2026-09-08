import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, Search, Heart, MessageCircle, ShoppingCart } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { language, setLanguage } = useContext(LanguageContext);
  const { cartCount } = useCart();

  return (
    <>
      {/* Top Help Bar */}
      <div style={{ background: '#f5f5f5', padding: '0.25rem 0', borderBottom: '1px solid #eee', fontSize: '0.8rem', color: '#666' }}>
        <div className="container flex justify-end items-center">
          <div className="flex gap-4">
            <span style={{ cursor: 'pointer' }}>{language === 'TH' ? 'ช่วยเหลือ' : 'Help'}</span>
            <span style={{ cursor: 'pointer' }}>
              <span 
                style={{ fontWeight: language === 'TH' ? 'bold' : 'normal', color: language === 'TH' ? '#333' : '#666' }}
                onClick={() => setLanguage('TH')}
              >TH</span>
              {' | '}
              <span 
                style={{ fontWeight: language === 'EN' ? 'bold' : 'normal', color: language === 'EN' ? '#333' : '#666' }}
                onClick={() => setLanguage('EN')}
              >EN</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar" style={{ background: '#fff', borderBottom: 'none', padding: '1rem 0' }}>
        <div className="container flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.05em' }}>
              TSU Market <span style={{fontSize:'0.8rem', fontWeight: 400}}>by Students</span>
            </span>
            <span style={{ color: 'var(--primary-color)', fontWeight: 600, display: 'none' }} className="md:block">{language === 'TH' ? 'บทความ' : 'Articles'}</span>
          </Link>
          
          <div className="hidden md:flex items-center" style={{ flex: 1, maxWidth: '500px', margin: '0 2rem' }}>
            <div style={{ display: 'flex', width: '100%', border: '1px solid #e5e5e5', borderRadius: '4px', overflow: 'hidden' }}>
              <input type="text" placeholder={language === 'TH' ? 'ค้นหา' : 'Search'} style={{ padding: '0.75rem 1rem', border: 'none', outline: 'none', flex: 1 }} />
              <button style={{ padding: '0 1rem', borderLeft: '1px solid #e5e5e5', background: '#fafafa', color: '#666' }}>
                <Search size={20} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="btn-icon" style={{ background: 'none' }}><Heart size={22} color="#666" /></button>
            <button className="btn-icon" style={{ background: 'none' }}><MessageCircle size={22} color="#666" /></button>
            <Link to="/cart" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem' }}>
              <ShoppingCart size={22} color="#666" />
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: '-4px', right: '-2px', background: '#2563eb', color: 'white', borderRadius: '999px', minWidth: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>
                  {cartCount}
                </span>
              )}
            </Link>
            
            {!user ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/login" style={{ fontWeight: 500, fontSize: '0.95rem' }}>{language === 'TH' ? 'เข้าสู่ระบบ / สมัครสมาชิก' : 'Login / Register'}</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link to="/my-products" style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={18}/> {language === 'TH' ? 'สินค้าของฉัน' : 'My Listings'}
                </Link>
                <button onClick={logout} className="btn-icon" title="Logout" style={{ color: 'red', background: 'none' }}>
                  <LogOut size={20} />
                </button>
              </div>
            )}
            
            <Link to="/product/create" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', borderRadius: '4px', background: 'var(--primary-color)', marginLeft: '1rem' }}>
              {language === 'TH' ? 'ลงขาย' : 'Sell'}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
