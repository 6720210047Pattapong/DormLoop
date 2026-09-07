import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { ProductContext } from '../context/ProductContext';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const { token } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const { products, addProduct, updateProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Electronics',
    condition: 'New',
    image: '',
    meetingLocation: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const p = products.find(prod => prod.id === parseInt(id));
      if (p) {
        setFormData({
          title: p.title || '',
          description: p.description || '',
          price: p.price || '',
          category: p.category || 'Electronics',
          condition: p.condition || 'New',
          image: p.image || '',
          meetingLocation: p.meetingLocation || ''
        });
      }
    }
  }, [id, isEditMode, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        updateProduct(id, formData);
      } else {
        addProduct(formData);
      }
      navigate('/my-products');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>
        {isEditMode 
          ? (language === 'TH' ? 'แก้ไขสินค้า' : 'Edit Product') 
          : (language === 'TH' ? 'ลงขายสินค้า' : 'Create Listing')}
      </h2>
      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            {language === 'TH' ? 'หัวข้อ *' : 'Title *'}
          </label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            {language === 'TH' ? 'รายละเอียด *' : 'Description *'}
          </label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              {language === 'TH' ? 'ราคา (฿) *' : 'Price (฿) *'}
            </label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              {language === 'TH' ? 'หมวดหมู่ *' : 'Category *'}
            </label>
            <select name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Dorm">Dorm Essentials</option>
              <option value="Books">Books</option>
              <option value="Clothes">Clothes</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              {language === 'TH' ? 'สภาพ *' : 'Condition *'}
            </label>
            <select name="condition" value={formData.condition} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </div>
          
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              {language === 'TH' ? 'สถานที่นัดรับ *' : 'Meeting Location *'}
            </label>
            <input type="text" name="meetingLocation" value={formData.meetingLocation} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            {language === 'TH' ? 'ลิงก์รูปภาพ' : 'Image URL'}
          </label>
          <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="https://example.com/image.jpg" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '0.75rem' }}>
            {isEditMode 
              ? (language === 'TH' ? 'บันทึกการแก้ไข' : 'Update Product') 
              : (language === 'TH' ? 'สร้างประกาศ' : 'Create Listing')}
          </button>
          <button type="button" onClick={() => navigate('/my-products')} className="btn" style={{ flex: 1, padding: '0.75rem', backgroundColor: '#f3f4f6' }}>
            {language === 'TH' ? 'ยกเลิก' : 'Cancel'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
