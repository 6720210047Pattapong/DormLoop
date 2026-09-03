import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home = () => {
  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section 
        className="section flex items-center animate-gradient" 
        style={{ 
          minHeight: '85vh', 
          background: 'linear-gradient(135deg, rgba(37,99,235,0.05) 0%, rgba(29,78,216,0.1) 100%)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: 'var(--primary-light)',
            color: 'var(--primary-color)',
            borderRadius: '2rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 14px 0 rgba(37,99,235,0.1)'
          }}>
            #1 ตลาดนัดมือสองเพื่อชาว ม.ทักษิณ
          </div>
          <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            ส่งต่อของใช้ <br />
            <span style={{ 
              background: '-webkit-linear-gradient(45deg, var(--primary-color), #60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>ราคานิสิต</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2.5rem', fontWeight: '300' }}>
            พื้นที่สำหรับนิสิต ม.ทักษิณ ในการซื้อขาย แลกเปลี่ยน ของใช้ ชุดนิสิต อุปกรณ์การเรียน ในราคาสบายกระเป๋า
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/shop" className="btn btn-primary" style={{ fontSize: '1.25rem', padding: '1rem 2.5rem' }}>
              เลือกซื้อสินค้าเลย
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '300px', height: '300px', background: 'rgba(37,99,235,0.1)', borderRadius: '50%', filter: 'blur(60px)' }}></div>
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '400px', height: '400px', background: 'rgba(96,165,250,0.1)', borderRadius: '50%', filter: 'blur(80px)' }}></div>
      </section>

      {/* Featured Products */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div className="flex items-center justify-between" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem' }}>สินค้าแนะนำ</h2>
            <Link to="/shop" style={{ color: 'var(--primary-color)', fontWeight: 600, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ดูทั้งหมด <span>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
