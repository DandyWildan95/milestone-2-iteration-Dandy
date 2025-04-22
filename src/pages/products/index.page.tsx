"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorBoundary from '../../components/ErrorBoundary';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
    image: string;
  };
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('https://api.escuelajs.co/api/v1/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <Layout>
      <ErrorBoundary>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Escuela Marketplace Products</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map(product => (
              <div 
                key={product.id} 
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
              >
                <img 
                  src={product.images[0] || 'https://via.placeholder.com/300'} 
                  alt={product.title} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                  <p className="text-gray-600 mb-2">{product.description.slice(0, 100)}...</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">${product.price}</span>
                    <span className="text-sm text-gray-500">{product.category.name}</span>
                  </div>
                  <button 
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              No products found
            </div>
          )}
        </div>
      </ErrorBoundary>
    </Layout>
  );
};

export default ProductsPage;
