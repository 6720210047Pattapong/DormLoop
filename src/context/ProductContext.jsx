import React, { createContext, useState, useEffect } from 'react';
import { mockProducts as initialMockProducts } from '../data/mockProducts';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialMockProducts);

  const addProduct = (product) => {
    setProducts([{ ...product, id: Date.now() }, ...products]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === parseInt(id) ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== parseInt(id)));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
