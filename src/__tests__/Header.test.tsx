import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';

describe('Header Component', () => {
  it('renders header with navigation', () => {
    render(<Header />);
    
    const homeLink = screen.getByRole('link', { name: /home/i });
    const productsLink = screen.getByRole('link', { name: /products/i });
    
    expect(homeLink).toBeInTheDocument();
    expect(productsLink).toBeInTheDocument();
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(productsLink).toHaveAttribute('href', '/products');
  });
});
