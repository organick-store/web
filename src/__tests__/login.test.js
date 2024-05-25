import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from '../pages/login/login';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../redux/userSlice';

const createStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
    },
  });

const mockLogin = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../services/AuthService.js', () => {
  return {
    login: () => mockLogin(),
  };
});

describe('Login component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    useNavigate.mockReturnValue(mockNavigate);
    mockLogin.mockReturnValue({ data: { token: 'token' } });
  });

  test('calls login function on form submission', async () => {
    render(
      <Provider store={createStore()}>
        <Login />
      </Provider>,
    );

    const emailInput = screen.getByLabelText('Email address*');
    const passwordInput = screen.getByLabelText(
      'Password(at least 8 characters)*',
    );
    const loginButton = screen.getAllByRole('button')[0];

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(mockLogin).toHaveBeenCalledTimes(1));
  });

  test('navigates to home page when user succesfully logged in', async () => {
    render(
      <Provider store={createStore()}>
        <Login />
      </Provider>,
    );

    const emailInput = screen.getByLabelText('Email address*');
    const passwordInput = screen.getByLabelText(
      'Password(at least 8 characters)*',
    );
    const loginButton = screen.getAllByRole('button')[0];

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledTimes(1));
  });

  test('does not call login function if email is invalid', async () => {
    render(
      <Provider store={createStore()}>
        <Login />
      </Provider>,
    );

    const emailInput = screen.getByLabelText('Email address*');
    const passwordInput = screen.getByLabelText(
      'Password(at least 8 characters)*',
    );
    const loginButton = screen.getAllByRole('button')[0];

    fireEvent.change(emailInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(mockLogin).not.toHaveBeenCalled());
  });

  test('does not call login function if password is invalid', async () => {
    render(
      <Provider store={createStore()}>
        <Login />
      </Provider>,
    );

    const emailInput = screen.getByLabelText('Email address*');
    const passwordInput = screen.getByLabelText(
      'Password(at least 8 characters)*',
    );
    const loginButton = screen.getAllByRole('button')[0];

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'pass' } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(mockLogin).not.toHaveBeenCalled());
  });

  test('does not navigate to home page if user is not authorized', async () => {
    render(
      <Provider store={createStore()}>
        <Login />
      </Provider>,
    );
    const emailInput = screen.getByLabelText('Email address*');
    const passwordInput = screen.getByLabelText(
      'Password(at least 8 characters)*',
    );
    const loginButton = screen.getAllByRole('button')[0];

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'pass' } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(mockNavigate).not.toHaveBeenCalled());
  });
});
