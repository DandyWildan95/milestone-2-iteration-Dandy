import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface UseCart {
  products: Product[];
  cartItems: Product[];
  addToCart: (product: Product) => void;
}

const useCart = (initialProducts: Product[]): UseCart => {
  const [products] = useState<Product[]>(initialProducts);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };

  return {
    products,
    cartItems,
    addToCart,
  };
};

export default useCart;
