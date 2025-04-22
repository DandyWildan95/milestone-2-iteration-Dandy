// src/api/index.ts
import axios from 'axios';
import { Product } from '../types/product';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

interface FetchResult {
  success: boolean;
  data?: Product[];
  error?: string;
}

export const fetchProducts = async (): Promise<FetchResult> => {
  try {
    const response = await axios.get<Product[]>(`${BASE_URL}/products`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};

export const fetchProductById = async (id: string): Promise<FetchResult> => {
  try {
    const response = await axios.get<Product>(`${BASE_URL}/products/${id}`);
    return {
      success: true,
      data: [response.data]
    };
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};