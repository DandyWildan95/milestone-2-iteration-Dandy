import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@testing-library/jest-dom/extend-expect'; 
import Home from './Home';
import React from 'react';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <Home />
    </StrictMode>
  );
}