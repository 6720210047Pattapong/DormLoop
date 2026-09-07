import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Car, Home as HomeIcon, Smartphone, Bike, PersonStanding, Cat, Tv, MoreHorizontal, CheckCircle, MessageCircle } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';
import { ProductContext } from '../context/ProductContext';

const Home = () => {
  const { language } = useContext(LanguageContext);
  const { products } = useContext(ProductContext);

  const categories = [
    { name: language === 'TH' ? 'รถมือสอง' : 'Used Cars', icon: <Car size={24} /> },
    { name: language === 'TH' ? 'อสังหาริมทรัพย์' : 'Property', icon: <HomeIcon size={24} /> },
    { name: language === 'TH' ? 'มือถือ แท็บเล็ต' : 'Mobile/Tablet', icon: <Smartphone size={24} /> },
    { name: language === 'TH' ? 'มอเตอร์ไซค์' : 'Motorcycles', icon: <Bike size={24} /> },
    { name: language === 'TH' ? 'พระเครื่อง' : 'Amulets', icon: <PersonStanding size={24} /> }, 
    { name: language === 'TH' ? 'สัตว์เลี้ยง' : 'Pets', icon: <Cat size={24} /> },
    { name: language === 'TH' ? 'เครื่องใช้ไฟฟ้า' : 'Electronics', icon: <Tv size={24} /> },
    { name: language === 'TH' ? 'เพิ่มเติม' : 'More', icon: <MoreHorizontal size={24} /> },
  ];

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', paddingBottom: '3rem' }}>
      
      {/* Hero Section */}
      <section style={{ 
        backgroundColor: '#273c66', 
        padding: '3rem 0 6rem 0', 
        color: 'white',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>
            {language === 'TH' ? 'ซื้อ-ขาย ของออนไลน์ จบง่ายที่ TSU Market' : 'Buy and Sell Online Easily at TSU Market'}
          </h1>
          <div className="flex justify-center gap-4" style={{ fontSize: '0.9rem', color: '#ff8a65' }}>
            <span className="flex items-center gap-1"><CheckCircle size={16} /> {language === 'TH' ? 'ตรวจสอบผู้ขาย' : 'Verified Seller'}</span>
            <span className="flex items-center gap-1"><MessageCircle size={16} /> {language === 'TH' ? 'แชทในระบบ' : 'In-system Chat'}</span>
          </div>
        </div>
      </section>

      {/* Category Section (Overlapping Hero) */}
      <section style={{ marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            {/* Tabs */}
            <div className="flex" style={{ borderBottom: '1px solid #eee' }}>
              <div style={{ padding: '1rem 2rem', borderBottom: '3px solid var(--primary-color)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <span style={{color: 'var(--primary-color)'}}>👍 {language === 'TH' ? 'ยอดนิยม' : 'Popular'}</span>
              </div>
              <div style={{ padding: '1rem 2rem', color: '#666', cursor: 'pointer' }}>🛍️ {language === 'TH' ? 'มาร์เก็ตเพลส' : 'Marketplace'}</div>
              <div style={{ padding: '1rem 2rem', color: '#666', cursor: 'pointer' }}>🚗 {language === 'TH' ? 'รถยนต์' : 'Cars'}</div>
              <div style={{ padding: '1rem 2rem', color: '#666', cursor: 'pointer' }}>🏢 {language === 'TH' ? 'อสังหา' : 'Property'}</div>
            </div>
            
            {/* Icons */}
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4" style={{ padding: '2rem 1rem' }}>
              {categories.map((cat, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: '#f5f7fa', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>
                    {cat.icon}
                  </div>
                  <span style={{ fontSize: '0.85rem', color: '#333', textAlign: 'center' }}>{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ marginTop: '2rem' }}>
        <div className="container">
          <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#333' }}>{language === 'TH' ? 'สินค้าแนะนำ' : 'Featured Products'}</h2>
            <Link to="/shop" style={{ color: 'var(--primary-color)', fontWeight: 500, fontSize: '0.9rem' }}>
              {language === 'TH' ? 'ดูทั้งหมด' : 'See all'} →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
