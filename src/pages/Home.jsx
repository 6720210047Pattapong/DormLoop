import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Car, Home as HomeIcon, Smartphone, Bike, PersonStanding, Cat, Tv, MoreHorizontal, CheckCircle, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';
import { ProductContext } from '../context/ProductContext';

const Home = () => {
  const { language } = useContext(LanguageContext);
  const { products } = useContext(ProductContext);
  const navigate = useNavigate();

  const categories = [
    { name: 'Electronics', icon: <Tv size={24} />, label: language === 'TH' ? 'เครื่องใช้ไฟฟ้า' : 'Electronics', color: '#2563eb', gradient: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' },
    { name: 'Furniture', icon: <HomeIcon size={24} />, label: language === 'TH' ? 'เฟอร์นิเจอร์' : 'Furniture', color: '#a16207', gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' },
    { name: 'Dorm Essentials', icon: <Sparkles size={24} />, label: language === 'TH' ? 'ของใช้หอพัก' : 'Dorm Essentials', color: '#db2777', gradient: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)' },
    { name: 'Books', icon: <PersonStanding size={24} />, label: language === 'TH' ? 'หนังสือ' : 'Books', color: '#7c3aed', gradient: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)' },
    { name: 'Clothes', icon: <Cat size={24} />, label: language === 'TH' ? 'เสื้อผ้า' : 'Clothes', color: '#059669', gradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' },
    { name: 'Others', icon: <MoreHorizontal size={24} />, label: language === 'TH' ? 'อื่น ๆ' : 'Others', color: '#475569', gradient: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)' },
  ];

  const bannerSlides = [
    {
      title: language === 'TH' ? 'สินค้าดี มีประสิทธิภาพ สำหรับนักศึกษา' : 'Smart student deals, ready to shop',
      subtitle: language === 'TH' ? 'ซื้อของใช้หอพัก รองเท้า หนังสือ และอุปกรณ์ดิจิทัลที่ใช้งานง่าย' : 'Find dorm essentials, books, gadgets and more in one place.',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
      category: 'Dorm Essentials',
    },
    {
      title: language === 'TH' ? 'อุปกรณ์ไอทีพร้อมใช้งานทันที' : 'Tech gear for everyday life',
      subtitle: language === 'TH' ? 'หูฟัง แท็บเล็ต และอุปกรณ์ไฟฟ้าราคาพิเศษจากนักศึกษาจริง' : 'Headphones, gadgets and electronics from trusted student sellers.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
      category: 'Electronics',
    },
    {
      title: language === 'TH' ? 'หนังสือและไอเทมที่ใช้งานได้จริง' : 'Books and useful finds for campus life',
      subtitle: language === 'TH' ? 'เสื้อผ้า หนังสือ และของใช้ที่ช่วยให้การใช้ชีวิตในมหาวิทยาลัยง่ายขึ้น' : 'Textbooks, clothing and everyday essentials for student life.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
      category: 'Books',
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % bannerSlides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [bannerSlides.length]);

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="animate-fade-in" style={{ background: 'linear-gradient(180deg, #f5f7fb 0%, #eef2ff 100%)', minHeight: '100vh', paddingBottom: '3rem' }}>
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #2563eb 100%)', padding: '3rem 0 5rem', color: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.12)', padding: '0.5rem 0.9rem', borderRadius: '999px', marginBottom: '1rem', fontSize: '0.8rem' }}>
                <Sparkles size={16} /> {language === 'TH' ? 'ตลาดนักศึกษาออนไลน์' : 'Student marketplace'}
              </div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)', lineHeight: 1.1, marginBottom: '1rem', fontWeight: 800 }}>
                {language === 'TH' ? 'ซื้อ-ขายของใช้ในมหาวิทยาลัย จบง่ายที่ TSU Market' : 'Buy and sell campus essentials in one smart marketplace'}
              </h1>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.82)', maxWidth: '640px', marginBottom: '1.5rem' }}>
                {language === 'TH' ? 'ค้นหาสินค้าใหม่จากเพื่อนนักศึกษา ดูรายละเอียดสินค้าแบบเรียลไทม์ และลงขายของคุณได้ทันที' : 'Discover student deals, browse real listings, and sell your own items in minutes.'}
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <Link to="/shop" className="btn btn-primary" style={{ background: '#f8fafc', color: '#0f172a', padding: '0.9rem 1.5rem', fontWeight: 700, borderRadius: '12px' }}>
                  {language === 'TH' ? 'Shop now' : 'Shop now'}
                </Link>
                <Link to="/product/create" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white', padding: '0.9rem 1.5rem', borderRadius: '12px' }}>
                  {language === 'TH' ? 'ลงขายสินค้า' : 'Sell item'}
                </Link>
              </div>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', color: 'rgba(255,255,255,0.9)' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.5rem' }}>{products.length}</strong>
                  <span style={{ fontSize: '0.8rem' }}>{language === 'TH' ? 'รายการสินค้า' : 'Listings'}</span>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.5rem' }}>24/7</strong>
                  <span style={{ fontSize: '0.8rem' }}>{language === 'TH' ? 'เปิดให้ขายตลอด' : 'Always open'}</span>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.5rem' }}>Safe</strong>
                  <span style={{ fontSize: '0.8rem' }}>{language === 'TH' ? 'นัดรับแบบง่าย' : 'Easy meetups'}</span>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(15,23,42,0.35)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(15, 23, 42, 0.35)' }}>
              <div style={{ position: 'relative', height: '350px' }}>
                <img src={bannerSlides[activeSlide].image} alt={bannerSlides[activeSlide].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,23,42,0.1), rgba(15,23,42,0.75))' }} />
                <div style={{ position: 'absolute', left: '1.5rem', right: '1.5rem', bottom: '1.5rem' }}>
                  <div style={{ display: 'inline-block', background: '#ffffff20', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', padding: '0.35rem 0.7rem', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                    {bannerSlides[activeSlide].category}
                  </div>
                  <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem' }}>{bannerSlides[activeSlide].title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.82)', marginBottom: '1rem' }}>{bannerSlides[activeSlide].subtitle}</p>
                  <button onClick={() => navigate(`/shop?category=${encodeURIComponent(bannerSlides[activeSlide].category)}`)} className="btn btn-primary" style={{ background: 'white', color: '#0f172a', borderRadius: '10px', padding: '0.75rem 1rem' }}>
                    {language === 'TH' ? 'ดูสินค้า' : 'View deals'} <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', padding: '0.9rem' }}>
                {bannerSlides.map((slide, index) => (
                  <button
                    key={slide.title}
                    onClick={() => setActiveSlide(index)}
                    style={{
                      width: index === activeSlide ? '28px' : '10px',
                      height: '10px',
                      borderRadius: '999px',
                      border: 'none',
                      background: index === activeSlide ? '#ffffff' : 'rgba(255,255,255,0.4)',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div style={{ background: 'white', borderRadius: '22px', boxShadow: '0 20px 45px rgba(15,23,42,0.08)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#0f172a' }}>{language === 'TH' ? 'หมวดหมู่ยอดนิยม' : 'Popular categories'}</h2>
              <Link to="/shop" style={{ color: '#2563eb', fontWeight: 600 }}>{language === 'TH' ? 'ดูทั้งหมด' : 'Browse all'} →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCategoryClick(cat.name)}
                  style={{
                    background: cat.gradient,
                    border: '1px solid rgba(148,163,184,0.2)',
                    borderRadius: '18px',
                    padding: '1rem 0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.7rem',
                    color: '#0f172a',
                    boxShadow: '0 12px 30px rgba(15, 23, 42, 0.04)',
                  }}
                >
                  <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255,255,255,0.7)', color: cat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)' }}>
                    {cat.icon}
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '2.5rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', borderRadius: '24px', padding: '2rem', boxShadow: '0 20px 45px rgba(37, 99, 235, 0.08)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>⚡</div>
              <h3 style={{ margin: '0 0 0.75rem', color: '#0f172a', fontSize: '1.4rem' }}>{language === 'TH' ? 'ค้นหาไว' : 'Fast discovery'}</h3>
              <p style={{ margin: 0, color: '#334155', lineHeight: 1.7 }}>{language === 'TH' ? 'ค้นหาสินค้าแบบเรียลไทม์และกรองตามหมวดหมู่ได้ทันที' : 'Browse listings live and filter by category instantly.'}</p>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)', borderRadius: '24px', padding: '2rem', boxShadow: '0 20px 45px rgba(219, 39, 119, 0.08)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🤝</div>
              <h3 style={{ margin: '0 0 0.75rem', color: '#0f172a', fontSize: '1.4rem' }}>{language === 'TH' ? 'น่าเชื่อถือ' : 'Trusted community'}</h3>
              <p style={{ margin: 0, color: '#334155', lineHeight: 1.7 }}>{language === 'TH' ? 'ตลาดสำหรับนักศึกษา ปลอดภัยและง่ายต่อการนัดรับสินค้าระหว่างกัน' : 'Built for students with simple, direct meetups and clear listings.'}</p>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', borderRadius: '24px', padding: '2rem', boxShadow: '0 20px 45px rgba(5, 150, 105, 0.08)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>💬</div>
              <h3 style={{ margin: '0 0 0.75rem', color: '#0f172a', fontSize: '1.4rem' }}>{language === 'TH' ? 'ลงขายง่าย' : 'Easy selling'}</h3>
              <p style={{ margin: 0, color: '#334155', lineHeight: 1.7 }}>{language === 'TH' ? 'เริ่มต้นขายสินค้าของคุณได้ภายในไม่กี่คลิกโดยไม่ต้องมีตะกร้าหรือชำระเงิน' : 'List your own items in minutes without cart or checkout steps.'}</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '2.5rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.7rem', color: '#0f172a', margin: 0 }}>{language === 'TH' ? 'Why choose TSU Market' : 'Why choose TSU Market'}</h2>
            <Link to="/shop" style={{ color: '#2563eb', fontWeight: 700 }}>{language === 'TH' ? 'เริ่มช้อปเลย' : 'Start shopping'} →</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 18px 35px rgba(15,23,42,0.05)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontSize: '1.5rem' }}>⭐</div>
              <h4 style={{ margin: '0 0 0.75rem', color: '#0f172a' }}>{language === 'TH' ? 'สินค้าใหม่ทุกวัน' : 'Fresh listings daily'}</h4>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.7 }}>{language === 'TH' ? 'เจอสินค้าและของใช้ที่เป็นประโยชน์ต่อชีวิตประจำวันมากขึ้น' : 'Find useful everyday items from fellow students and local sellers.'}</p>
            </div>

            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 18px 35px rgba(15,23,42,0.05)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontSize: '1.5rem' }}>💎</div>
              <h4 style={{ margin: '0 0 0.75rem', color: '#0f172a' }}>{language === 'TH' ? 'คัดสรรจากชุมชน' : 'Curated by community'}</h4>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.7 }}>{language === 'TH' ? 'รายการสินค้าได้รับการคัดสรรให้ตรงกับความต้องการของนักศึกษา' : 'Every listing is tailored for student life and campus convenience.'}</p>
            </div>

            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 18px 35px rgba(15,23,42,0.05)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontSize: '1.5rem' }}>✅</div>
              <h4 style={{ margin: '0 0 0.75rem', color: '#0f172a' }}>{language === 'TH' ? 'ใช้งานง่าย' : 'Simple to use'}</h4>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.7 }}>{language === 'TH' ? 'ไม่ต้องมีตะกร้าและไม่มีการชำระเงิน ให้คุณโฟกัสที่สินค้าดี ๆ เท่านั้น' : 'No cart or payment flow required—just discover and list goods simply.'}</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '2.5rem' }}>
        <div className="container">
          <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '28px', padding: '2rem', color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
              <h2 style={{ margin: 0, fontSize: '1.7rem' }}>{language === 'TH' ? 'เสียงตอบรับจากผู้ใช้งาน' : 'What students say'}</h2>
              <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{language === 'TH' ? 'ชุมชนนักศึกษามหาวิทยาลัย' : 'Campus community'}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {[
                { name: 'Nattida', text: 'ค้นหาสินค้าได้รวดเร็วมาก ใช้งานง่าย เหมาะกับนักศึกษา' },
                { name: 'Pree', text: 'ลงขายของใช้หอพักได้เลย ไม่ยุ่งยากและดูเป็นตลาดที่น่าเชื่อถือ' },
                { name: 'Bank', text: 'ดีมากสำหรับการหาอุปกรณ์และหนังสือที่ใช้ในมหาวิทยาลัย' },
              ].map((item) => (
                <div key={item.name} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>“</div>
                  <p style={{ color: '#e2e8f0', lineHeight: 1.7, marginBottom: '1rem' }}>{item.text}</p>
                  <div style={{ fontWeight: 700, color: '#f8fafc' }}>{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '2.25rem' }}>
        <div className="container">
          <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#0f172a' }}>{language === 'TH' ? 'สินค้าแนะนำ' : 'Featured Products'}</h2>
            <Link to="/shop" style={{ color: '#2563eb', fontWeight: 600, fontSize: '0.95rem' }}>
              {language === 'TH' ? 'ดูทั้งหมด' : 'See all'} →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
