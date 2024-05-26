import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Products from '../components/sections/products/products';
import { generateMockProducts } from '../__mocks__/mockProducts';

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
    getAll: () => mockFetchProducts(),
  };
});

jest.mock('../services/AuthService.js', () => { });

describe('Products component', () => {
  test('renders products correctly', async () => {
    mockFetchProducts.mockReturnValue({
      data: { products: generateMockProducts(2), count: 2 },
    });

    render(
      <Provider store={store}>
        <Products />
      </Provider>,
    );

    await waitFor(() => {
      const product1 = screen.getByText('Product 1');
      const product1Price = screen.getByText('$10.00');
      const product1Image = screen.getAllByAltText('Product 1');

      expect(product1).toBeDefined();
      expect(product1Price).toBeDefined();
      expect(product1Image).toBeDefined();

      const product2 = screen.getByText('Product 2');
      const product2Price = screen.getByText('$10.50');
      const product2Image = screen.getAllByAltText('Product 2');

      expect(product2).toBeDefined();
      expect(product2Price).toBeDefined();
      expect(product2Image).toBeDefined();
    });
  });

  test('renders "No products found" when there are no products', async () => {
    mockFetchProducts.mockReturnValue({ data: { products: [], count: 0 } });

    render(
      <Provider store={store}>
        <Products />
      </Provider>,
    );

    await waitFor(() => {
      const noProducts = screen.getByText('No products found');

      expect(noProducts).toBeDefined();
    });
  });

  test('shows more products when "Show more" button is clicked', async () => {
    mockFetchProducts
      .mockResolvedValueOnce({
        data: { products: generateMockProducts(8), count: 16 },
      })
      .mockResolvedValue({
        data: { products: generateMockProducts(16), count: 16 },
      });
    render(
      <Provider store={store}>
        <Products />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getAllByTestId('product-card').length).toBe(8);
    });

    const showMoreButton = screen.getByText('Show more');
    expect(showMoreButton).toBeDefined();

    act(() => {
      fireEvent.click(showMoreButton);
    });

    await waitFor(() => {
      expect(screen.getAllByTestId('product-card').length).toBe(16);
    });
  });

  test('shows less product when "Show less" button is clicked', async () => {
    mockFetchProducts
      .mockResolvedValueOnce({
        data: { products: generateMockProducts(16), count: 16 },
      })
      .mockResolvedValue({
        data: { products: generateMockProducts(8), count: 16 },
      });

    render(
      <Provider store={store}>
        <Products />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getAllByTestId('product-card').length).toBe(16);
    });

    const showLessButton = screen.getByText('Show less');
    expect(showLessButton).toBeDefined();

    act(() => {
      fireEvent.click(showLessButton);
    });

    await waitFor(() => {
      expect(screen.getAllByTestId('product-card').length).toBe(8);
      screen.debug();
    });
  });


});
