import React, { useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, User, Tag, Edit, Trash2, ShoppingCart } from 'lucide-react';
import { ProductContext } from '../context/ProductContext';
import { LanguageContext } from '../context/LanguageContext';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, deleteProduct } = useContext(ProductContext);
  const { language } = useContext(LanguageContext);
  const { user, token } = useContext(AuthContext);
  const { addToCart } = useCart();
  const product = products.find(prod => prod.id === parseInt(id));
  const canManageProduct = !!user && (user.role === 'admin' || product?.sellerId === user.id);

  const handleDelete = async () => {
    if(window.confirm(language === 'TH' ? 'คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?' : 'Are you sure you want to delete this?')) {
      try {
        await deleteProduct(product.id, token);
        alert(language === 'TH' ? 'ลบสินค้าสำเร็จ' : 'Deleted successfully');
        navigate('/shop');
      } catch (error) {
        alert(error.message || 'Delete failed');
      }
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

  return (
    <div className="animate-fade-in section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-outline" 
            style={{ padding: '0.5rem 1rem' }}
          >
            <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> 
            {language === 'TH' ? 'กลับ' : 'Back'}
          </button>

          {canManageProduct && (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link 
                to={`/product/edit/${product.id}`}
                className="btn btn-primary"
                style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center' }}
              >
                <Edit size={18} style={{ marginRight: '0.5rem' }} /> 
                {language === 'TH' ? 'แก้ไข' : 'Edit'}
              </Link>
              <button 
                onClick={handleDelete}
                className="btn"
                style={{ background: 'red', color: 'white', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', border: 'none' }}
              >
                <Trash2 size={18} style={{ marginRight: '0.5rem' }} /> 
                {language === 'TH' ? 'ลบ' : 'Delete'}
              </button>
            </div>
          )}
        </div>

        {!user && (
          <div style={{ marginBottom: '1.5rem', padding: '0.9rem 1.1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#475569', fontWeight: 600 }}>
            {language === 'TH' ? 'เข้าสู่ระบบก่อนจัดการสินค้า หรือดูสินค้าของคุณเอง' : 'Login to manage listings or view your own listings'}
          </div>
        )}

        {user && !canManageProduct && (
          <div style={{ marginBottom: '1.5rem', padding: '0.9rem 1.1rem', background: '#fff7ed', border: '1px solid #fdba74', borderRadius: '12px', color: '#9a4d00', fontWeight: 600 }}>
            {language === 'TH' ? 'คุณต้องเป็นเจ้าของสินค้า หรือแอดมิน จึงสามารถแก้ไข/ลบประกาศนี้ได้' : 'Only the owner or admin can edit or delete this listing'}
          </div>
        )}

        <div className="grid grid-cols-2 gap-8" style={{ alignItems: 'start' }}>
          <div>
            <div style={{ overflow: 'hidden', borderRadius: '24px', boxShadow: '0 20px 45px rgba(15, 23, 42, 0.12)', border: '1px solid #e2e8f0', background: '#fff' }}>
              <img 
                src={product.image || 'https://via.placeholder.com/600x400?text=No+Image'} 
                alt={product.title} 
                style={{ width: '100%', display: 'block', height: '520px', objectFit: 'cover' }} 
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', padding: '0.45rem 0.8rem', borderRadius: '999px', background: '#eff6ff', color: '#1d4ed8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.76rem' }}>
                {product.category}
              </div>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', margin: '0.9rem 0 0.5rem', lineHeight: 1.1 }}>{product.title}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>฿{product.price}</span>
                <span style={{ padding: '0.35rem 0.7rem', background: '#ecfdf5', color: '#047857', borderRadius: '999px', fontWeight: 700, fontSize: '0.8rem' }}>
                  {product.condition}
                </span>
              </div>
            </div>
            
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1.25rem' }}>
              <h3 style={{ margin: '0 0 0.75rem', fontSize: '1.05rem' }}>{language === 'TH' ? 'รายละเอียดสินค้า' : 'Listing details'}</h3>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
                {product.description}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => addToCart(product, 1)}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', padding: '0.9rem 1.4rem' }}
              >
                <ShoppingCart size={18} />
                {language === 'TH' ? 'เพิ่มลงตะกร้า' : 'Add to cart'}
              </button>
              <Link to="/cart" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.9rem 1.4rem' }}>
                {language === 'TH' ? 'ดูตะกร้า' : 'View cart'}
              </Link>
            </div>
            
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1.25rem', background: 'white' }}>
              <h3 style={{ marginBottom: '1rem' }}>{language === 'TH' ? 'ข้อมูลสินค้า' : 'Product Information'}</h3>
              <ul style={{ paddingLeft: '0', listStyle: 'none', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.9rem', margin: 0 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={16} color="#2563eb" /></div>
                  <div><strong>{language === 'TH' ? 'ผู้ขาย:' : 'Seller:'}</strong> {product.seller?.name || 'Unknown'}</div>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Tag size={16} color="#047857" /></div>
                  <div><strong>{language === 'TH' ? 'สภาพ:' : 'Condition:'}</strong> {product.condition}</div>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MapPin size={16} color="#b45309" /></div>
                  <div><strong>{language === 'TH' ? 'สถานที่นัดรับ:' : 'Meeting Location:'}</strong> {product.meetingLocation}</div>
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
