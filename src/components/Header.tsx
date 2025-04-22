"use client"; // Always at the top
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>Welcome to Escuela Marketplace</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/products">Our Products</a></li>
          <li><a href="/contacts">Contact Us</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
