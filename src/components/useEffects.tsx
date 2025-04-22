import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="homepage">
      <h1>Welcome to Escuela Marketplace</h1>
      <p>Your trusted source for diverse, high-quality products.</p>
      <nav>
        <ul>
          <li><Link href="/products">Shop Now</Link></li>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/register">Register</Link></li>
          <li><Link href="/cart">Cart</Link></li>
        </ul>
      </nav>
      {isClient && <p>Client-side rendering is active</p>} 
    </div>
  );
};

export default HomePage;
