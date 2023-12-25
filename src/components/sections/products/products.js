import React, { useContext, useEffect, useState } from 'react';
import ProductCard from './product-card/product-card';
import { Subheading, Heading, Paragraph } from '../../UI/typography/typography';
import Button from '../../UI/button/button';
import styles from './products.module.scss';
import WidthContainer from '../../UI/width-container/container';
import CartLink from '../nav-menu/cart-link/cart-link';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../../redux/productsSlice';
import ModalContext from '../../../context/product-modal';

const Products = () => {
  const [showAll, setShowAll] = useState(false);
  const dispatch = useDispatch();
  const { onOpen: onOpenModal } = useContext(ModalContext);
  const counter = useSelector((state) => state.cart.cartCounter);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const productsData = useSelector((state) => state.products.productsList);

  const toggleShowAll = (e) => {
    e.preventDefault();
    setShowAll(!showAll);
  };

  const productsList = productsData.map((product) => (
    <ProductCard
      key={product.name}
      product={product}
      onOpenModal={() => onOpenModal(product)}
    />
  ));

  return (
    <div className={styles.categories}>
      <Subheading className={styles['categories-subheading']}>
        Categories
      </Subheading>
      <Heading className={styles['categories-heading']}>Our Products</Heading>
      {productsData.length ? (
        <>
          <WidthContainer className={styles['categories__container']}>
            {showAll
              ? productsList
              : productsList.slice(0, productsData.length / 2)}
          </WidthContainer>
          <Button
            showArrow
            onClick={toggleShowAll}
            className={styles['categories-button']}
          >
            {showAll ? 'Show Less' : 'Show More'}
          </Button>
        </>
      ) : (
        <Paragraph>No products found</Paragraph>
      )}
      {counter > 0 && <CartLink className={styles['cart-link']} />}
    </div>
  );
};

export default Products;
