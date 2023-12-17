import React from 'react';
import styles from './product-price.module.scss';
import classNames from 'classnames';

const ProductPrice = ({ price, discount, className }) => {
  const isDiscount = discount !== 0;
  return (
    <span className={classNames(styles.price, className)}>
      {isDiscount && <span
        className={classNames(styles.discount, className)}
      >
        ${price.toFixed(2)}
      </span>}
      ${(price - discount).toFixed(2)}
    </span>
  );
};

export default ProductPrice;
