import React, { createContext, useState, useEffect, useCallback } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async (search = '', category = 'All') => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (category && category !== 'All') params.set('category', category);

      const res = await fetch(`/api/products?${params.toString()}`);
      if (!res.ok) {
        throw new Error('Failed to load products');
      }

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Product fetch error:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (product, token) => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(product)
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to create product');
    }

    setProducts(prev => [data, ...prev]);
    return data;
  };

  const updateProduct = async (id, updatedProduct, token) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedProduct)
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to update product');
    }

    setProducts(prev => prev.map(product => product.id === parseInt(id) ? data : product));
    return data;
  };

  const deleteProduct = async (id, token) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to delete product');
    }

    setProducts(prev => prev.filter(product => product.id !== parseInt(id)));
    return data;
  };

  return (
    <ProductContext.Provider value={{ products, loading, fetchProducts, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
