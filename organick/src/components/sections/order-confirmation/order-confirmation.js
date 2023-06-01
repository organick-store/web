import React, { useState } from 'react';
import styles from './order-confirmation.module.scss';
import Button from '../../UI/Button/Button';
import { Heading } from '../../UI/Typography/typography';
import WidthContainer from '../../UI/WidthContainer/container';
import Form from './order-form/order-form';
import OrderElement from './order-form/order-element/order-element';
import { useSelector } from 'react-redux';

const Order = () => {
  const [isOrderBtnClicked, setIsOrderBtnClicked] = useState(false);

  const toOrderHandler = () => {
    setIsOrderBtnClicked(true);
  };

  const cart = useSelector((state) => state.cart.products);

  const OrderedProductsList = cart.map((product) => (
    <OrderElement
      name={product.name}
      price={product.price}
      discount={product.discount}
      key={product.id}
      id={product.id}
      url={product.url}
      quantity={product.quantity}
    />
  ));

  const bill = cart.reduce(
    (acc, curr) => {
      acc.price += +curr.price * +curr.quantity;
      acc.discount += +curr.discount * +curr.quantity;
      return acc;
    },
    { price: 0, discount: 0 }
  );

  return (
    <section className={styles['order']}>
      <WidthContainer className={styles['order__list']}>
        {OrderedProductsList}
      </WidthContainer>
      <WidthContainer className={styles['order__total']}>
        <Heading className={styles['order__total-cost']}>
          {`Total cost: $${bill.price - bill.discount}`}
        </Heading>
        <Heading className={styles['order__total-cost']}>
          {`Discount: $${bill.discount}`}
        </Heading>
      </WidthContainer>

      {!isOrderBtnClicked && (
        <Button
          showArrow
          className={styles['order-to']}
          onClick={toOrderHandler}
        >
          To order
        </Button>
      )}
      {isOrderBtnClicked && <Form bill={bill}/>}
    </section>
  );
};

export default Order;
