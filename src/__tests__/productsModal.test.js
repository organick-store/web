import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Products from '../components/sections/products/products';
import { ModalProvider } from '../context/product-modal';
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

jest.mock('../services/AuthService.js', () => {});

describe('Products modal', () => {
  test('opens modal when product card is clicked', async () => {
    mockFetchProducts.mockResolvedValue({
      data: { products: generateMockProducts(1), count: 1 },
    });

    render(
      <Provider store={store}>
        <ModalProvider>
          <Products />
        </ModalProvider>
      </Provider>,
    );

    await waitFor(() => {
      const product1 = screen.getByText('Product 1');
      fireEvent.click(product1);
    });

    await waitFor(() => {
      const modal = screen.getByTestId('products-modal');
      expect(modal).toBeDefined();
    });
  });

  test('renders products details: overview, toggles between description and additional info', async () => {
    mockFetchProducts.mockResolvedValue({
      data: { products: generateMockProducts(1), count: 1 },
    });

    render(
      <Provider store={store}>
        <ModalProvider>
          <Products />
        </ModalProvider>
      </Provider>,
    );
    await waitFor(() => {
      const product1 = screen.getByText('Product 1');
      fireEvent.click(product1);
    });

    await waitFor(() => {
      const productOverview = screen.getByText('overview');
      expect(productOverview).toBeDefined();
    });

    const descriptionButton = screen.getByText('Product Description');
    const additionalInfoButton = screen.getByText('Additional Info');

    expect(descriptionButton).toBeDefined();
    expect(additionalInfoButton).toBeDefined();

    expect(screen.getByText('description')).toBeDefined();
    expect(screen.queryByText('info')).toBeNull();

    fireEvent.click(additionalInfoButton);
    expect(screen.getByText('info')).toBeDefined();
    expect(screen.queryByText('description')).toBeNull();
  });

  test('updates input quantity correctly', async () => {
    mockFetchProducts.mockResolvedValue({
      data: { products: generateMockProducts(1), count: 1 },
    });

    render(
      <Provider store={store}>
        <ModalProvider>
          <Products />
        </ModalProvider>
      </Provider>,
    );

    await waitFor(() => {
      const product1 = screen.getByText('Product 1');
      fireEvent.click(product1);
    });

    const quantityInput = screen.getByLabelText('Quantity:');
    expect(quantityInput.value).toBe('1');

    fireEvent.change(quantityInput, { target: { value: '5' } });

    expect(quantityInput.value).toBe('5');
  });

  test('dispatches addItemToCart action when "Add To Cart" button is clicked', async () => {
    mockFetchProducts.mockResolvedValue({
      data: { products: generateMockProducts(1), count: 1 },
    });

    render(
      <Provider store={store}>
        <ModalProvider>
          <Products />
        </ModalProvider>
      </Provider>,
    );

    await waitFor(() => {
      const product1 = screen.getByText('Product 1');
      fireEvent.click(product1);
    });

    const addToCartButton = screen.getByText('Add To Cart');
    fireEvent.click(addToCartButton);

    expect(store.getState().cart.cartCounter).toBe(1);
    expect(store.getState().cart.products[0]).toMatchObject({
      id: 1,
      name: 'Product 1',
      price: 10,
      discount: 0,
      image: 'product1.jpg',
      quantity: 1,
    });
  });

  test('close modal when "X" button is clicked', async () => {
    mockFetchProducts.mockResolvedValue({
      data: { products: generateMockProducts(1), count: 1 },
    });

    render(
      <Provider store={store}>
        <ModalProvider>
          <Products />
        </ModalProvider>
      </Provider>,
    );

    await waitFor(() => {
      const product1 = screen.getByText('Product 1');
      fireEvent.click(product1);
    });

    await waitFor(() => {
      const modal = screen.getByTestId('products-modal');
      expect(modal).toBeDefined();
    });

    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);

    await waitFor(() => {
      const modal = screen.queryByTestId('products-modal');
      expect(modal).toBeNull();
    });
  });

  test('close modal when "Add To Cart" button is clicked', async () => {
    mockFetchProducts.mockResolvedValue({
      data: { products: generateMockProducts(1), count: 1 },
    });

    render(
      <Provider store={store}>
        <ModalProvider>
          <Products />
        </ModalProvider>
      </Provider>,
    );

    await waitFor(() => {
      const product1 = screen.getByText('Product 1');
      fireEvent.click(product1);
    });

    await waitFor(() => {
      const modal = screen.getByTestId('products-modal');
      expect(modal).toBeDefined();
    });

    const addToCartButton = screen.getByText('Add To Cart');
    fireEvent.click(addToCartButton);

    await waitFor(() => {
      const modal = screen.queryByTestId('products-modal');
      expect(modal).toBeNull();
    });
  });
});
