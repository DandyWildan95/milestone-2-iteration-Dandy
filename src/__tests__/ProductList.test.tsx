import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductList from '../pages/products/products.page';
import { ProductService } from '../services/ProductService';
import axios from 'axios';

// Mock the entire ProductService module
jest.mock('../services/ProductService', () => ({
  ProductService: {
    getAllProducts: jest.fn()
  }
}));

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ProductList Component', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Laptop',
      price: 1000,
      description: 'High-performance laptop',
      images: ['laptop.jpg'],
      category: {
        id: 1,
        name: 'Electronics',
        image: 'electronics.jpg',
        creationAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z'
      },
      creationAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    // Mock the getAllProducts method to return an empty array
    (ProductService.getAllProducts as jest.Mock).mockResolvedValue([]);
    
    render(<ProductList />);
  });

  it('renders product list component', async () => {
    // Setup mock implementation
    (ProductService.getAllProducts as jest.Mock).mockResolvedValue(mockProducts);

    // Render the component
    render(<ProductList />);

    // Wait for the products to be rendered
    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
    });
  });

  it('handles error when fetching products fails', async () => {
    // Setup mock to simulate error
    (ProductService.getAllProducts as jest.Mock).mockRejectedValue(new Error('Failed to fetch products'));

    // Render component
    render(<ProductList />);

    // Wait for and check error message
    await waitFor(() => {
      const errorMessage = screen.getByText(/Failed to fetch products/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('renders without crashing with axios mock', async () => {
    // Mock the axios get method to return an empty array
    mockedAxios.get.mockResolvedValue({ data: [] });

    // Render the component
    const { findByText } = render(<ProductList />);

    // Wait for the loading text to disappear
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('https://api.escuelajs.co/api/v1/products');
    });
  });
});