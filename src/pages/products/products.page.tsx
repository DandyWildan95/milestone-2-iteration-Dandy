import React, { useState, useEffect, useMemo } from 'react';
import { ProductService } from '../../services/ProductService';
import { Product } from '../../types/product';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc'>('price-asc');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await ProductService.getAllProducts();
        setProducts(result);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(product => product.category.name)));
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => 
        product.title.toLowerCase().includes(filter.toLowerCase()) ||
        product.category.name.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        return b.price - a.price;
      });
  }, [products, filter, sortBy]);

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Escuela Marketplace: Explore All Categories
      </h1>
      
      <div className="flex justify-between mb-6">
        <input 
          type="text" 
          placeholder="Search products or categories..." 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full mr-4 p-2 border rounded"
        />
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value as 'price-asc' | 'price-desc')}
          className="p-2 border rounded"
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600">
          No products match your search criteria
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
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
                <span className="text-sm text-gray-500">
                  Category: {product.category.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
