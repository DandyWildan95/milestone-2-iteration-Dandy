// src/api/Api.ts
import { Product } from '../types/product';

interface FetchResult {
  success: boolean;
  data?: Product[];
  error?: string;
}

const mapProductToViewModel = (product: Product): Product => {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    images: product.images,
    category: {
      id: product.category.id,
      name: product.category.name,
      image: product.category.image,
      creationAt: product.category.creationAt,
      updatedAt: product.category.updatedAt
    },
    creationAt: product.creationAt,
    updatedAt: product.updatedAt
  };
};

const mapProductDetailsToViewModel = (data: Product): Product => {
  return {
    id: data.id,
    title: data.title,
    price: data.price,
    description: data.description,
    images: data.images,
    category: {
      id: data.category.id,
      name: data.category.name,
      image: data.category.image,
      creationAt: data.category.creationAt,
      updatedAt: data.category.updatedAt
    },
    creationAt: data.creationAt,
    updatedAt: data.updatedAt
  };
};

export async function fetchProducts(): Promise<FetchResult> {
  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/products');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data: Product[] = await response.json();
    
    // Transform data to match our Product type
    const transformedProducts = data.map(product => mapProductToViewModel(product));

    return { success: true, data: transformedProducts };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}

export async function fetchProductById(id: string): Promise<FetchResult> {
  try {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data: Product = await response.json();
    
    // Transform data to match our Product type
    const transformedProduct = mapProductDetailsToViewModel(data);

    return { success: true, data: [transformedProduct] };
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}