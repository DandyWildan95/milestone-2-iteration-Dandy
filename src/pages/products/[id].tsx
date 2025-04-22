import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import Link from 'next/link';
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

const ProductDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;

      try {
        const response = await axios.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleNextImage = () => {
    if (product && product.images) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % product.images.length
      );
    }
  };

  const handlePrevImage = () => {
    if (product && product.images) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    }
  };

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

  if (!product) {
    return (
      <Layout>
        <div className="text-center text-gray-500 mt-10">
          Product not found
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Head>
          <title>{product.title} - Escuela Marketplace</title>
          <meta name="description" content={product.description} />
        </Head>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative">
            <img 
              src={product.images[currentImageIndex]} 
              alt={product.title} 
              className="w-full h-96 object-cover rounded-lg"
            />
            {product.images.length > 1 && (
              <div className="flex justify-between mt-4">
                <button 
                  onClick={handlePrevImage}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Previous
                </button>
                <button 
                  onClick={handleNextImage}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-green-600 font-bold text-2xl">${product.price.toFixed(2)}</span>
              <span className="text-sm text-gray-500">Category: {product.category.name}</span>
            </div>

            <div className="flex space-x-4">
              <button 
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Add to Cart
              </button>
              <Link 
                href="/products" 
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition"
              >
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
