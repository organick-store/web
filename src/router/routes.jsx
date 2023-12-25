import React from 'react';
import CartBody from '../pages/cart/cart';
import MainBody from '../pages/main/main';
import SuccessBanner from '../components/UI/banners/success-banner/success-banner';
import Registration from '../pages/registration/registration';
import Login from '../pages/login/login';
import ActivateAccount from '../pages/activate-account/activate-account';
import NotFound from '../pages/not-found/not-found';

export const routes = [
  {
    path: '/',
    exact: true,
    element: <MainBody />,
  },
  {
    path: '/cart',
    exact: true,
    element: <CartBody />,
  },
  {
    path: '/success',
    exact: true,
    element: <SuccessBanner />,
  },
  {
    path: '/signup',
    exact: true,
    element: <Registration />,
  },
  {
    path: '/signin',
    exact: true,
    element: <Login />,
  },
  {
    path: '/confirmemail/:token',
    element: <ActivateAccount />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
