"use client"; // Always at the top
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('https://api.escuelajs.co/api/v1/categories');
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="category bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Product Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="category-item flex flex-col items-center p-4 border rounded-lg hover:bg-gray-100 transition"
          >
            <img 
              src={category.image} 
              alt={category.name} 
              className="w-20 h-20 object-cover rounded-full mb-2"
            />
            <span className="text-center font-semibold">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
