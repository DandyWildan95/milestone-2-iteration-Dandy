import React from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const handleAddToCart = () => {
    // TODO: Implement actual cart functionality
    console.log(`Added ${product.name} to cart`);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <div className="product-image">
        <Image 
          src={product.imageUrl} 
          alt={product.name} 
          width={300} 
          height={300} 
          layout="responsive" 
        />
      </div>
      <p className="product-description">{product.description}</p>
      <p className="product-price">Price: ${product.price.toFixed(2)}</p>
      <button 
        onClick={handleAddToCart} 
        className="add-to-cart-btn"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
