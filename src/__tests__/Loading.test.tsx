import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import HomePage from '../pages/index.page'

test('shows loading state', () => {
  render(<HomePage data={[]} error={undefined} />)
  expect(screen.getByText('Loading...')).toBeInTheDocument()
})