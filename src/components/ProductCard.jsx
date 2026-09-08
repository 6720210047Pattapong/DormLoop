import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';
import { AuthContext } from '../context/AuthContext';
import { ProductContext } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { language } = useContext(LanguageContext);
  const { user, token } = useContext(AuthContext);
  const { deleteProduct } = useContext(ProductContext);
  const { addToCart } = useCart();
  const canManageProduct = !!user && (user.role === 'admin' || product.sellerId === user.id);

  const handleDelete = async (e) => {
    e.preventDefault();
    if(window.confirm(language === 'TH' ? 'คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?' : 'Are you sure you want to delete this?')) {
      try {
        await deleteProduct(product.id, token);
        alert(language === 'TH' ? 'ลบสินค้าสำเร็จ' : 'Deleted successfully');
      } catch (error) {
        alert(error.message || 'Delete failed');
      }
    }
  };

  return (
    <div className="card" style={{ position: 'relative' }}>
      {canManageProduct && (
        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10, display: 'flex', gap: '0.5rem' }}>
          <Link 
            to={`/product/edit/${product.id}`}
            style={{ background: 'var(--primary-color)', color: 'white', padding: '0.5rem', borderRadius: '50%', display: 'flex' }}
            title={language === 'TH' ? 'แก้ไขสินค้า' : 'Edit listing'}
          >
            <span style={{ fontSize: '0.8rem' }}>✏️</span>
          </Link>
          <button 
            onClick={handleDelete}
            style={{ background: 'red', color: 'white', padding: '0.5rem', borderRadius: '50%', display: 'flex' }}
            title={language === 'TH' ? 'ลบสินค้า' : 'Delete listing'}
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
      <Link to={`/product/${product.id}`}>
        <img 
          src={product.image || 'https://via.placeholder.com/300x250?text=No+Image'} 
          alt={product.title} 
          style={{ width: '100%', height: '250px', objectFit: 'cover' }} 
        />
      </Link>
      <div style={{ padding: '1.5rem' }}>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {product.category}
        </span>
        <Link to={`/product/${product.id}`}>
          <h3 style={{ marginTop: '0.5rem', marginBottom: '0.5rem', fontSize: '1.25rem' }}>{product.title}</h3>
        </Link>
        <div className="flex items-center justify-between" style={{ marginTop: '1rem' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>฿{product.price}</span>
          <Link to={`/product/${product.id}`} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
            {language === 'TH' ? 'ดูรายละเอียด' : 'View'}
          </Link>
        </div>
        <button
          onClick={() => addToCart(product, 1)}
          className="btn btn-outline"
          style={{ width: '100%', marginTop: '0.75rem', padding: '0.7rem 1rem' }}
        >
          {language === 'TH' ? 'เพิ่มลงตะกร้า' : 'Add to cart'}
        </button>
        {!user && (
          <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#64748b' }}>
            {language === 'TH' ? 'เข้าสู่ระบบเพื่อจัดการประกาศ' : 'Login to manage this listing'}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
