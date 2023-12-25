import React from 'react';
import styles from './product-image.module.scss';
import classNames from 'classnames';

const ProductImg = ({ product, className }) => {
  return (
    <img
      alt={product?.name || ''}
      src={product?.image || ''}
      className={classNames(styles.img, className)}
    ></img>
  );
};

export default ProductImg;
