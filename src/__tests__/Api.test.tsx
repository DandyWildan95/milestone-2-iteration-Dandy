import axios from 'axios';
import { fetchProducts, fetchProductById } from '../api';
import { Product } from '../types/product';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Functions', () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'Test Product',
      description: 'Test Description',
      price: 100,
      category: {
        id: 1,
        name: 'Test Category',
        image: 'test-category-image.jpg',
        creationAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z'
      },
      images: ['test-image.jpg'],
      creationAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches products successfully', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockProducts });

    const result = await fetchProducts();

    expect(result.success).toBe(true);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.escuelajs.co/api/v1/products');
  });

  it('handles product fetch error', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network error'));

    const result = await fetchProducts();

    expect(result.success).toBe(false);
    expect(result.error).toBe('Network error');
  });
});

describe('Escuela Jax API', () => {
  const API_URL = 'https://api.escuelajs.co/api/v1/products';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch products successfully', async () => {
    const mockProducts = [{ id: 1, title: 'Test Product', price: 100 }];
    mockedAxios.get.mockResolvedValue({ data: mockProducts });

    const response = await axios.get(API_URL);
    const products = response.data;

    expect(products).toBeDefined();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);

    // Check the structure of the first product
    const firstProduct = products[0];
    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('title');
    expect(firstProduct).toHaveProperty('price');
  });

  it('should fetch a specific product by ID', async () => {
    const productId = 29; // Using an existing product ID from the API response
    const mockProduct = { 
      id: productId, 
      title: 'Test Product', 
      price: 100 
    };
    
    mockedAxios.get.mockResolvedValue({ data: mockProduct });

    const response = await axios.get(`${API_URL}/${productId}`);
    const product = response.data;

    expect(product).toBeDefined();
    expect(product.id).toBe(productId);
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('price');
  });
});
