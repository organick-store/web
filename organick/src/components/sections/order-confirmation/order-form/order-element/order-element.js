import React, { useState } from 'react';
import styles from './order-element.module.scss';
import { Heading } from '../../../../UI/Typography/typography';
import ProductQuantityInput from '../../../products/product-card/product-quantity-input/input';
import Button from '../../../../UI/Button/Button';
import ProductPrice from '../../../products/product-card/product-price/product-price';
import { useDispatch } from 'react-redux';
import {
  removeItemFromCart,
  setCartItemQuantity,
} from '../../../../../redux/productsSlice';
import ProductImg from '../../../products/product-card/product-image/product-image';

const OrderElement = (props) => {
  const [inputQuantity, setInputQuantity] = useState(props.quantity || '');

  const inputQuantityHandler = (e) => {
    setInputQuantity(+e.target.value);
    dispatch(setCartItemQuantity({ quantity: +e.target.value, id: props.id }));
  };

  const dispatch = useDispatch();

  const removeFromCartHandler = (e) => {
    e.preventDefault();
    dispatch(removeItemFromCart({ id: props.id, quantity: props.quantity }));
  };

  return (
    <div className={styles['product']}>
      <ProductImg alt={props.name} url={props.url} className={styles['product-img']}/>
      <div className={styles['product-wrapper']}>
        <Heading className={styles['product-name']}>{props.name}</Heading>
        <ProductPrice
          className={styles['product-price']}
          price={props.price}
          discount={props.discount}
        />
      </div>
      <ProductQuantityInput
        inputQuantity={inputQuantity}
        inputQuantityHandler={inputQuantityHandler}
      />
      <Button
        className={styles['product-remove']}
        onClick={removeFromCartHandler}
      >
        X
      </Button>
    </div>
  );
};

export default OrderElement;
