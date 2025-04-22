"use client"; // Always at the top
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2>Sidebar</h2>
      <ul>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
