import React from 'react';
import { useSelector } from 'react-redux';
import { Heading, Subheading } from '../../UI/Typography/typography';
import WidthContainer from '../../UI/WidthContainer/container';
import ProductCard from '../products/product-card/product-card';
import styles from './offers.module.scss';

const Offers = () => {
  const productsData = useSelector(
    (state) => state.products.productsList
  ).slice(0, 4);

  const ProductsList = productsData.map((product) => (
    <ProductCard
      type={product.type}
      name={product.name}
      key={product.name}
      price={product.price}
      discount={product.discount}
      url={product.url}
      id={product.id}
    />
  ));

  return (
    <div className={styles['offers']}>
      <WidthContainer className={styles['offers__container']}>
        <Subheading className={styles['offers-subheading']}>Offer</Subheading>
        <Heading className={styles['offers-heading']}>
          We Offer Organic For You
        </Heading>
        <div className={styles['offers__list']}>{ProductsList}</div>
      </WidthContainer>
    </div>
  );
};

export default Offers;
