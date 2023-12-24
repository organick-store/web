import React from 'react';
import Button from '../../../UI/Button/Button';
import styles from './product-card.module.scss';
import { Heading } from '../../../UI/Typography/typography';
import { ReactComponent as Rating } from '../../../../img/5-stars.svg';
import ProductPrice from './product-price/product-price';
import ProductImg from './product-image/product-image';

const ProductCard = ({
  // type,
  // name,
  // price,
  // discount,
  product,
  onOpenModal,
  onSelectItem,
  // id,
  // image,
}) => {
  const selectProduct = () => {
    if (!onOpenModal) return;
    onOpenModal();
    onSelectItem(product.id);
  };

  return (
    <div className={styles.product} onClick={selectProduct}>
      <Button className={styles['product-tag']}>{product.type}</Button>
      <ProductImg
        image={product.image}
        alt={product.name}
        className={styles['product-img']}
      />
      <div className={styles['product__description']}>
        <Heading className={styles['product__description-heading']}>
          {product.name}
        </Heading>
        <hr className={styles['product__description-separator']} />
        <p className={styles['product__description__parameters']}>
          <ProductPrice price={product.price} discount={product.discount} />
          <Rating className={styles['rate']} />
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
