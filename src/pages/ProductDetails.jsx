import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingCart, Check, MapPin, User, Tag, Edit, Trash2 } from 'lucide-react';
import { ProductContext } from '../context/ProductContext';
import { LanguageContext } from '../context/LanguageContext';
import { AuthContext } from '../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products, deleteProduct } = useContext(ProductContext);
  const { language } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  
  const [added, setAdded] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const p = products.find(prod => prod.id === parseInt(id));
    setProduct(p);
  }, [id, products]);

  const handleDelete = () => {
    if(window.confirm(language === 'TH' ? 'คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?' : 'Are you sure you want to delete this?')) {
      deleteProduct(product.id);
      alert(language === 'TH' ? 'ลบสินค้าสำเร็จ' : 'Deleted successfully');
      navigate('/shop');
    }
  };

  if (!product) {
    return (
      <div className="container section text-center">
        <h2>{language === 'TH' ? 'ไม่พบสินค้า' : 'Product not found'}</h2>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          {language === 'TH' ? 'กลับไปหน้าร้านค้า' : 'Back to Shop'}
        </Link>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-outline" 
            style={{ padding: '0.5rem 1rem' }}
          >
            <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> 
            {language === 'TH' ? 'กลับ' : 'Back'}
          </button>

          {user?.role === 'admin' && (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link 
                to={`/product/edit/${product.id}`}
                className="btn btn-primary"
                style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center' }}
              >
                <Edit size={18} style={{ marginRight: '0.5rem' }} /> 
                {language === 'TH' ? 'แก้ไข (แอดมิน)' : 'Edit (Admin)'}
              </Link>
              <button 
                onClick={handleDelete}
                className="btn"
                style={{ background: 'red', color: 'white', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', border: 'none' }}
              >
                <Trash2 size={18} style={{ marginRight: '0.5rem' }} /> 
                {language === 'TH' ? 'ลบ (แอดมิน)' : 'Delete (Admin)'}
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-8" style={{ alignItems: 'start' }}>
          <div>
            <img 
              src={product.image || 'https://via.placeholder.com/600x400?text=No+Image'} 
              alt={product.title} 
              style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }} 
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <span style={{ color: 'var(--primary-color)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {product.category}
              </span>
              <h1 style={{ fontSize: '3rem', margin: '0.5rem 0' }}>{product.title}</h1>
              <span style={{ fontSize: '2rem', fontWeight: 700 }}>฿{product.price}</span>
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
                  <><Check size={20} style={{ marginRight: '0.5rem' }} /> {language === 'TH' ? 'เพิ่มแล้ว' : 'Added to Cart'}</>
                ) : (
                  <><ShoppingCart size={20} style={{ marginRight: '0.5rem' }} /> {language === 'TH' ? 'เพิ่มลงตะกร้า' : 'Add to Cart'}</>
                )}
              </button>
            </div>
            
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '1rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>{language === 'TH' ? 'ข้อมูลสินค้า' : 'Product Information'}</h3>
              <ul style={{ paddingLeft: '0', listStyle: 'none', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={18} color="var(--primary-color)" />
                  <strong>{language === 'TH' ? 'ผู้ขาย:' : 'Seller:'}</strong> {product.seller?.name || 'Unknown'}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Tag size={18} color="var(--primary-color)" />
                  <strong>{language === 'TH' ? 'สภาพ:' : 'Condition:'}</strong> {product.condition}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={18} color="var(--primary-color)" />
                  <strong>{language === 'TH' ? 'สถานที่นัดรับ:' : 'Meeting Location:'}</strong> {product.meetingLocation}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
