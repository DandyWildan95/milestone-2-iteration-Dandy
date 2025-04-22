import React, { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import ErrorBoundary from './ErrorBoundary';
import LoadingSpinner from './LoadingSpinner';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

interface Category {
  id: number;
  name: string;
  image: string;
}

const currentYear = new Date().getFullYear();

const Layout: React.FC<LayoutProps> = ({ children, title = 'Escuela Marketplace' }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Remove Grammarly and other extensions that might interfere with hydration
    const metaTags = document.querySelectorAll('meta[data-gr-ext-installed], meta[data-new-gr-c-s-check-loaded]');
    metaTags.forEach(tag => tag.remove());

    // Fetch categories for navigation
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('https://api.escuelajs.co/api/v1/categories');
        setCategories(response.data.slice(0, 5)); // Limit to first 5 categories
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch categories', err);
        setError('Could not load categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <LoadingSpinner fullScreen message="Loading Escuela Marketplace..." />;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>{title}</title>
          <meta name="description" content="Escuela Marketplace: Shop Everything" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800">
              Escuela Marketplace
            </Link>
            <div className="space-x-4 flex items-center">
              <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
              <div className="relative group">
                <span className="text-gray-600 hover:text-blue-600 cursor-pointer">Categories</span>
                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 py-2 w-48 right-0">
                  {error ? (
                    <div className="text-red-500 text-center py-2">
                      Failed to load categories
                    </div>
                  ) : (
                    categories.map((category) => (
                      <Link 
                        key={category.id} 
                        href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                      >
                        {category.name}
                      </Link>
                    ))
                  )}
                </div>
              </div>
              <Link href="/products" className="text-gray-600 hover:text-blue-600">All Products</Link>
              <Link href="/cart" className="text-gray-600 hover:text-blue-600">Cart</Link>
              <Link href="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
              <Link href="/register" className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-sm">
                Sign Up
              </Link>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-6">
          {children}
        </main>

        <footer className="bg-white shadow-md mt-6 py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold mb-4">Escuela Marketplace</h3>
                <p className="text-gray-600">Your one-stop shop for diverse products from various categories.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <Link href="/products" className="block text-gray-600 hover:text-blue-600">Browse Products</Link>
                  <Link href="/about" className="block text-gray-600 hover:text-blue-600">About Us</Link>
                  <Link href="/contact" className="block text-gray-600 hover:text-blue-600">Contact</Link>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect With Us</h4>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="text-gray-600 hover:text-blue-600">Facebook</a>
                  <a href="#" className="text-gray-600 hover:text-blue-600">Twitter</a>
                  <a href="#" className="text-gray-600 hover:text-blue-600">Instagram</a>
                </div>
              </div>
            </div>
            <div className="mt-6 text-gray-500">
              &copy; {currentYear} Escuela Marketplace. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
