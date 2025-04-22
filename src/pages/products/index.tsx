import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import Layout from '../../components/Layout';

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
  const [loading, setLoading] = useState(true);
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
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-red-500 text-center">{error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Head>
          <title>Escuela Marketplace - Products</title>
          <meta name="description" content="Browse our wide range of products" />
        </Head>

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
                <p className="text-gray-600 mb-4">{product.description.slice(0, 100)}...</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-bold text-lg">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-gray-500">{product.category.name}</span>
                </div>
                <Link 
                  href={`/products/${product.id}`} 
                  className="mt-4 block w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition text-center"
                >
                  View Details
                </Link>
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
    </Layout>
  );
};

export default ProductsPage;
