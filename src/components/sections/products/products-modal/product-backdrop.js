import React from 'react';
import styles from './product-backdrop.module.scss';

const ProductBackdrop = ({ onOpenModal }) => {
  return <div className={styles.backdrop} onClick={onOpenModal}></div>;
};

export default ProductBackdrop;
