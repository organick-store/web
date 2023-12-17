import React from 'react';
import styles from './order-confirmation.module.scss';
import Button from '../../UI/Button/Button';
import { Heading } from '../../UI/Typography/typography';
import WidthContainer from '../../UI/WidthContainer/container';
import OrderElement from './order-form/order-element/order-element';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../../redux/cartSlice';
import OrderService from '../../../services/OrderService';

const Order = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const bill = cart.reduce(
    (acc, curr) => {
      acc.price += +curr.price * +curr.quantity;
      acc.discount += +curr.discount * +curr.quantity;
      return acc;
    },
    { price: 0, discount: 0 }
  );

  const createOrder = async () => {
    const orderData = {
      products: cart.map((product) => ({
        name: product.name,
        quantity: product.quantity,
      })),
      token: localStorage.getItem('token'),
      totalCost: bill.price - bill.discount,
      totalDiscount: bill.discount,
      address: user.address,
    };
    try {
      await OrderService.order(orderData);
      dispatch(clearCart());
      navigate('/success');
    } catch (error) {
      console.log(error);
    }
  };

  const toOrderHandler = async () => {
    if (!user.isAuth) {
      navigate('/signup');
      return;
    } else if (!cart.length) {
      return;
    }
    await createOrder();
  };

  const OrderedProductsList = cart.map((product) => (
    <OrderElement
      name={product.name}
      price={product.price}
      discount={product.discount}
      key={product.id}
      id={product.id}
      image={product.image}
      quantity={product.quantity}
    />
  ));

  return (
    <section className={styles['order']}>
      <WidthContainer className={styles['order__list']}>
        {OrderedProductsList}
      </WidthContainer>
      {!cart.length ? (
        <Heading className={styles.empty}>
          There are no items in the cart
        </Heading>
      ) : (
        <WidthContainer className={styles['order__total']}>
          <Heading className={styles['order__total-cost']}>
            {`Total cost: $${bill.price - bill.discount}`}
          </Heading>
          <Heading className={styles['order__total-cost']}>
            {`Discount: $${bill.discount}`}
          </Heading>
        </WidthContainer>
      )}
      <Button showArrow className={styles['order-to']} onClick={toOrderHandler}>
        Order
      </Button>
    </section>
  );
};

export default Order;
