import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import HomePage from '../pages/index.page';
import { Product } from '../types/product';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockProduct: Product = {
  id: 29,
  title: 'Mid-Century Modern Wooden Dining Table',
  price: 24,
  description: 'Elevate your dining room with this sleek Mid-Century Modern dining table, featuring an elegant walnut finish and tasteful design.',
  images: [
    'https://api.escuelajs.co/api/v1/files/dining-table.jpg'
  ],
  category: {
    id: 3,
    name: 'Furniture',
    image: 'https://api.escuelajs.co/api/v1/files/furniture-category.jpg',
    creationAt: '2024-02-12T17:00:00.000Z',
    updatedAt: '2024-02-12T17:00:00.000Z'
  },
  creationAt: '2024-02-12T17:00:00.000Z',
  updatedAt: '2024-02-12T17:00:00.000Z'
};

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders welcome message', () => {
    render(<HomePage data={[]} error={undefined} />);
    expect(screen.getByText(/Welcome to Our Online Store/i)).toBeInTheDocument();
  });

  it('renders products after successful data fetch', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [mockProduct] });

    render(<HomePage data={[mockProduct]} error={undefined} />);

    await waitFor(() => {
      expect(screen.getByText('Mid-Century Modern Wooden Dining Table')).toBeInTheDocument();
      expect(screen.getByText('Elevate your dining room with this sleek Mid-Century Modern dining table, featuring an elegant walnut finish and tasteful design.')).toBeInTheDocument();
      expect(screen.getByText('$24')).toBeInTheDocument();
    });
  });

  it('renders error message when data fetch fails', () => {
    const errorMessage = 'Failed to fetch products';
    render(<HomePage data={[]} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders no products message when no data', () => {
    render(<HomePage data={[]} error={undefined} />);

    expect(screen.getByText(/No products available/i)).toBeInTheDocument();
  });
});
