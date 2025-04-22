import axios from 'axios';
import { Product } from '../types/product';

const API_URL = 'https://api.escuelajs.co/api/v1/products';

export const ProductService = {
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await axios.get<Product[]>(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async getProductById(id: string): Promise<Product> {
    try {
      const response = await axios.get<Product>(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  },

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    try {
      const response = await axios.get<Product[]>(`${API_URL}?categoryId=${categoryId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products in category ${categoryId}:`, error);
      throw error;
    }
  }
};
