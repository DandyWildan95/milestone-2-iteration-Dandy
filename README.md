# Escuela Marketplace

## 📘 Project Documentation

### Table of Contents
1. [Project Overview](#-project-overview)
2. [Technologies](#-technologies)
3. [Project Structure](#-project-structure)
4. [Key Components](#-key-components)
5. [Development Workflow](#-development-workflow)
6. [API Integration](#-api-integration)
7. [State Management](#-state-management)
8. [Error Handling](#-error-handling)
9. [Testing Strategy](#-testing-strategy)
10. [Performance Optimization](#-performance-optimization)
11. [Deployment](#-deployment)

## �� Project Overview

Escuela Marketplace is a modern e-commerce web application built with Next.js, React, and TypeScript. The project demonstrates best practices in web development, including responsive design, state management, and API integration. It features a comprehensive product catalog, shopping cart functionality, and user authentication.

## 🚀 Technologies

### Core Technologies
- **Frontend Framework**: Next.js 15.1.6
- **UI Library**: React 18.2.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Testing**: Jest, React Testing Library

### Development Tools
- **Package Manager**: npm
- **Compiler**: SWC
- **Linting**: ESLint
- **Code Formatting**: Prettier

## 📂 Project Structure

```
src/
│
├── components/           # Reusable React components
│   ├── Layout.tsx        # Main layout component
│   ├── Header.tsx        # Navigation header
│   ├── Navbar.tsx        # Navigation bar
│   ├── LoadingSpinner.tsx # Loading indicator
│   ├── ErrorBoundary.tsx # Error handling component
│   └── ...
│
├── pages/                # Next.js page components
│   ├── index.page.tsx    # Home page
│   ├── products/         # Product-related pages
│   │   ├── index.tsx     # Product listing page
│   │   ├── products.page.tsx # Products page
│   │   └── product-detail.page.tsx # Product detail page
│   ├── cart.page.tsx     # Shopping cart page
│   ├── register.page.tsx # User registration
│   └── ...
│
├── api/                  # API integration
│   ├── Api.ts           # API client
│   └── index.ts         # API exports
│
├── hooks/                # Custom React hooks
│   ├── useApi.ts        # Generic API fetching hook
│   ├── useCart.tsx      # Shopping cart functionality
│   └── ...
│
├── types/                # TypeScript type definitions
│   ├── product.ts       # Product-related types
│   ├── global.ts        # Global type definitions
│   └── index.ts         # Type exports
│
├── styles/               # Global styles
│   └── globals.css      # Global CSS styles
│
└── __tests__/           # Test suites
    ├── Api.test.tsx     # API integration tests
    ├── App.test.tsx     # App component tests
    ├── HomePage.test.tsx # Home page tests
    └── ...
```

## 🧩 Key Components

### 1. Layout Component (`src/components/Layout.tsx`)
- Provides consistent page structure
- Handles global navigation
- Implements responsive design
- Manages loading states

### 2. Home Page (`src/pages/index.page.tsx`)
- Displays welcome message
- Provides navigation to products
- Implements responsive design
- Handles loading states

### 3. Products Pages
- Product listing page (`src/pages/products/products.page.tsx`)
- Product detail page (`src/pages/products/product-detail.page.tsx`)
- Implements product filtering and search
- Handles product data fetching

### 4. Cart Functionality (`src/components/useCart.tsx`)
- Manages shopping cart state
- Handles add/remove items
- Calculates total price
- Persists cart data

## 🔄 Development Workflow

### Local Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Open `http://localhost:3000`

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm run start`: Run production build
- `npm test`: Run test suite
- `npm run lint`: Run code linter
- `npm run test:coverage`: Generate test coverage report

### Testing
The project uses Jest and React Testing Library for testing. Key test files include:
- `src/__tests__/HomePage.test.tsx`: Tests for the home page
- `src/__tests__/ProductList.test.tsx`: Tests for product listing
- `src/__tests__/Api.test.tsx`: Tests for API integration

### Code Quality
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Jest for test coverage

## 🌐 API Integration

### API Base URL
`https://api.escuelajs.co/api/v1`

### Endpoint Documentation

#### 1. Products Endpoints

##### Get All Products
- **Endpoint**: `GET /products`
- **Description**: Retrieve a list of all products
- **Query Parameters**:
  - `limit` (optional): Limit the number of products returned
  - `offset` (optional): Skip a specified number of products
- **Response**:
  ```typescript
  interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: {
      id: number;
      name: string;
      image: string;
    };
  }
  ```

##### Get Single Product
- **Endpoint**: `GET /products/{id}`
- **Description**: Retrieve details of a specific product
- **Path Parameters**:
  - `id` (required): Unique identifier of the product
- **Response**: Single Product object

##### Create Product
- **Endpoint**: `POST /products`
- **Description**: Create a new product
- **Request Body**:
  ```typescript
  {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
  }
  ```

#### 2. Categories Endpoints

##### Get All Categories
- **Endpoint**: `GET /categories`
- **Description**: Retrieve a list of all product categories
- **Response**:
  ```typescript
  interface Category {
    id: number;
    name: string;
    image: string;
  }
  ```

##### Get Single Category
- **Endpoint**: `GET /categories/{id}`
- **Description**: Retrieve details of a specific category
- **Path Parameters**:
  - `id` (required): Unique identifier of the category

#### 3. Filtering and Pagination

##### Filter Products
- **Endpoint**: `GET /products`
- **Query Parameters**:
  - `categoryId`: Filter products by category
  - `price_min`: Minimum product price
  - `price_max`: Maximum product price
  - `title`: Search products by title

##### Pagination
- Use `limit` and `offset` query parameters
- Example: `GET /products?limit=10&offset=20`
  - Returns 10 products
  - Skips first 20 products

### Error Handling

#### Common Error Responses
- `400 Bad Request`: Invalid parameters
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side error

### Authentication
- This API does not require authentication for read operations
- Some endpoints may require authentication for write operations

### Rate Limiting
- Be aware of potential rate limits
- Implement exponential backoff for retry mechanisms

### Best Practices
- Always handle potential network errors
- Implement caching where appropriate
- Use try-catch blocks for API calls
- Provide fallback UI for loading and error states

### Example API Call (Using Fetch)
```typescript
async function fetchProducts(limit: number = 10) {
  try {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const products: Product[] = await response.json();
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}
```

### Recommended Tools for API Testing
- Postman
- Insomnia
- cURL
- Browser Developer Tools (Network tab)

### Potential Improvements
- Implement local caching
- Add retry logic for failed requests
- Create a more robust error handling mechanism
- Develop a custom hook for API interactions

## 🔍 State Management

### Approach
- Utilizes React Hooks (`useState`, `useEffect`)
- Implements local component state
- Passes state via props
- Manages async state with loading/error indicators

## 🛡️ Error Handling

### Strategies
- Comprehensive try/catch blocks
- Fallback UI for loading states
- Detailed error logging
- User-friendly error messages
- Graceful degradation of functionality

## 🧪 Testing Strategy

### Testing Tools
- Jest for test runner
- React Testing Library for component testing
- Mocking for API calls

### Test Coverage
- Unit tests for services and hooks
- Component rendering tests
- API integration tests
- Error state tests

## 🚀 Performance Optimization

### Techniques
- Code splitting with Next.js
- Lazy loading of components
- Optimized image loading
- Minimal bundle size
- Efficient state management

## 🌈 Deployment

### Recommended Platforms
- Vercel (Optimal for Next.js)
- Netlify
- Heroku
- AWS Amplify

### Deployment Steps
1. Create production build: `npm run build`
2. Deploy build artifacts
3. Configure environment variables
4. Set up continuous integration

## 🔮 Future Roadmap

- [ ] Implement user authentication
- [ ] Add shopping cart functionality
- [ ] Create comprehensive product search
- [ ] Develop admin dashboard
- [ ] Implement internationalization

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create pull request

## 📄 License

Distributed under the MIT License.

## 📞 Contact

[Your Name]
[Your Email]
Project Link: [Repository URL]

## Project Overview

Indonesian Tobacco is a modern e-commerce web application built with Next.js and React, designed to showcase and sell premium tobacco products from Indonesia. The application provides a seamless shopping experience with features like product browsing, detailed product views, and responsive design.

## 🚀 Technologies Used

- **Frontend**: 
  - Next.js 15.1.6
  - React 18.2.0
  - TypeScript
  - Tailwind CSS

- **API**: 
  - Fake Store API (https://api.escuelajs.co/api/v1)

- **Testing**:
  - Jest
  - React Testing Library

## 📦 Features

- **Home Page**
  - Featured products display
  - Responsive product cards
  - Navigation to product details

- **Product Listing**
  - Comprehensive product catalog
  - Category-based filtering
  - Pagination support

- **Product Details**
  - Detailed product information
  - Multiple product images
  - Price and description

- **Responsive Design**
  - Mobile-friendly layout
  - Adaptive components
  - Tailwind CSS for styling

## 🛠️ Setup and Installation

### Prerequisites
- Node.js (v18 or later)
- npm (v9 or later)

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/yourusername/indonesian-tobacco.git
cd indonesian-tobacco
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage
```
## 🌐 API Integration

The application uses the Fake Store API to fetch product data. Key endpoints:
- `/products`: Retrieve all products
- `/products/{id}`: Get specific product details
- `/categories`: Fetch product categories

## 🔍 Error Handling

- Comprehensive error handling for API requests
- Fallback UI for loading and error states
- Detailed error logging in development

## 📱 Responsive Design

Implemented with Tailwind CSS, ensuring a great user experience across:
- Desktop
- Tablet
- Mobile devices

## 🚧 Future Roadmap

- [ ] Implement user authentication
- [ ] Add shopping cart functionality
- [ ] Create checkout process
- [ ] Enhance product search capabilities
- [ ] Implement product reviews

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Your Name - [Your Email]

Project Link: [https://github.com/yourusername/indonesian-tobacco](https://github.com/yourusername/indonesian-tobacco)

