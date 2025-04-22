import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Escuela Marketplace</h1>
        <p className="text-xl mb-2">Discover a world of quality products from various categories</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Furniture</h2>
            <p>Explore our curated collection of stylish and functional furniture.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Electronics</h2>
            <p>Find the latest tech gadgets and innovative electronic devices.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Clothing</h2>
            <p>Stay trendy with our diverse range of fashion and apparel.</p>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-lg">Shop with confidence. Quality guaranteed.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
