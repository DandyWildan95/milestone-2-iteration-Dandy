"use client";

import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { Product } from '../types/product';
import { fetchProducts } from '../api';

interface HomePageProps {
  data: Product[];
  error?: string | null;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow-md">
          <img 
            src={product.images[0]} 
            alt={product.title} 
            className="w-full h-48 object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-green-600">${product.price}</span>
            <Link 
              href={`/products/${product.id}`} 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

const HomePage: React.FC<HomePageProps> = ({ data, error }) => {
  return (
    <Layout>
      <div className="homepage container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Escuela Marketplace: Shop Everything
        </h1>
        
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}

        {!error && data.length === 0 && (
          <p className="text-center text-gray-600">
            No products available at the moment
          </p>
        )}

        <ProductList products={data} />

        <div className="mt-8 text-center">
          <Link 
            href="/products" 
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
          >
            Shop All Products
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const result = await fetchProducts();

  return {
    props: {
      data: result.success ? result.data || [] : [],
      error: result.success ? null : result.error || 'Failed to fetch products'
    }
  };
}

export default HomePage;
