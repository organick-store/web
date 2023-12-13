import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import store from '../redux/store';
import Products from '../components/sections/products/products';

const mockFetchProducts = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('../services/ProductService.js', () => {
  return {
    fetchProducts: () => mockFetchProducts(),
  };
})
jest.mock('../services/OrderService.js', () => {

})
jest.mock('../services/AuthService.js', () => {
})

describe('Products component', () => {
  beforeEach(() => {
    useSelector.mockClear();
    useNavigate.mockClear();
  });

  const mockProducts = [
    {
      id: 1,
      type: 'Type 1',
      name: 'Product 1',
      price: 10,
      discount: 0,
      image: 'product1.jpg',
    },
    {
      id: 2,
      type: 'Type 2',
      name: 'Product 2',
      price: 20,
      discount: 5,
      image: 'product2.jpg',
    },
  ];

  const renderProductComponent = () => {
    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );
  };

  test('renders products correctly', () => {
    useSelector.mockReturnValue(mockProducts);

    renderProductComponent();

    const product1 = screen.getByText('Product 1');

    expect(product1).toBeDefined();
  });

  test('toggles showAll state when "Show More" button is clicked', () => {
    useSelector.mockReturnValue(mockProducts);

    renderProductComponent();

    const showMoreButton = screen.getByText('Show More');

    fireEvent.click(showMoreButton);

    expect(showMoreButton.textContent).toContain('Show Less');
  });

  test('shows all products when "Show More" is clicked', () => {
    useSelector.mockReturnValue(mockProducts);

    renderProductComponent();

    const showMoreButton = screen.getByText('Show More');

    fireEvent.click(showMoreButton);

    const product1 = screen.getByText('Product 1');
    const product2 = screen.getByText('Product 2');

    expect(product1).toBeDefined();
    expect(product2).toBeDefined();
  });

  test('shows only 2 products when "Show Less" is clicked', () => {
    useSelector.mockReturnValue(mockProducts);

    renderProductComponent();

    const showMoreButton = screen.getByText('Show More');

    fireEvent.click(showMoreButton);
    fireEvent.click(showMoreButton);

    const product1 = screen.getByText('Product 1');
    const product2 = screen.queryByText('Product 2');

    expect(product1).toBeDefined();
    expect(product2).toBeNull();
  });

  // Add more tests for other functionality of the Products component
});
