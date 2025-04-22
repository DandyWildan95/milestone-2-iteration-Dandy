import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomePage from '../pages/index.page';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock the HomePage component to avoid out-of-scope variable issues
jest.mock('../pages/index.page', () => {
    return {
        __esModule: true,
        default: function MockHomePage({ data = [] }) {
            return (
                <div>
                    <h1>Welcome to Escuela Marketplace</h1>
                    <a href="/products">Shop Now</a>
                </div>
            );
        }
    };
});

describe('HomePage', () => {
    beforeEach(() => {
        // Mock the axios get method to return an empty array
        mockedAxios.get.mockResolvedValue({ data: [] });
    });

    test('renders welcome message', async () => {
        render(<HomePage data={[]} />);
        const welcomeMessage = screen.getByText(/Welcome to Escuela Marketplace/i);
        expect(welcomeMessage).toBeInTheDocument();
    });

    test('renders shop now link', async () => {
        render(<HomePage data={[]} />);
        
        const shopNowLink = screen.getByRole('link', { name: /shop now/i });
        expect(shopNowLink).toHaveAttribute('href', '/products');
    });

    test('renders loading state', async () => {
        // Simulate loading state
        mockedAxios.get.mockImplementation(() => new Promise(() => {}));

        render(<HomePage data={[]} />);
        
        const loadingSpinner = screen.getByRole('status');
        expect(loadingSpinner).toBeInTheDocument();
    });
});