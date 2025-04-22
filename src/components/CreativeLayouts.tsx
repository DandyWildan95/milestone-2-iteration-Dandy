// src/components/CreativeLayouts.tsx
import React from 'react';
import './CreativeLayouts.css'; // Import corresponding CSS for styles
import '@testing-library/jest-dom/extend-expect'; // Ensure this import is present

const CreativeLayouts: React.FC = () => {
  return (
    <div className="creative-layouts">
      <section className="hero">
        <h1>Welcome to Escuela Marketplace</h1>
        <p>Your one-stop shop for diverse, high-quality products.</p>
      </section>

      <section className="featured-products">
        <div className="product-showcase">
          <h2>Discover Amazing Products</h2>
          <p>Experience the best selection from top categories.</p>
        </div>
      </section>

      <footer>
        <p>&copy; 2025 Escuela Marketplace. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CreativeLayouts;
