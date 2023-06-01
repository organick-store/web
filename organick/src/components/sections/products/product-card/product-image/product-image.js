import React from 'react';
import styles from './product-image.module.scss';
import classNames from 'classnames';

const ProductImg = ({name, url, className}) => {
  return (
    <img
      alt={name}
      src={url}
      className={classNames(styles.img, className)}
    ></img>
  );
};

export default ProductImg;
