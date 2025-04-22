import { render, screen } from '@testing-library/react'
import HomePage from '../pages/index.page'
import React from 'react'
import '@testing-library/jest-dom';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Navigation Component', () => {
  beforeEach(() => {
    // Mock the axios get method to return an empty array
    mockedAxios.get.mockResolvedValue({ data: [] });
  });

  it('renders shop all products link', () => {
    render(<HomePage />)
    
    const shopAllProductsLink = screen.getByRole('link', { name: /shop now/i })
    expect(shopAllProductsLink).toHaveAttribute('href', '/products')
    expect(shopAllProductsLink).toHaveClass('bg-blue-500')
  });

  it('renders loading state', async () => {
    // Simulate loading state
    mockedAxios.get.mockImplementation(() => new Promise(() => {}));

    render(<HomePage />)
    
    const loadingSpinner = screen.getByRole('status');
    expect(loadingSpinner).toBeInTheDocument();
  });
});