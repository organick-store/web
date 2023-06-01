import React, { useState } from 'react';
import ProductCard from './product-card/product-card';
import { Subheading, Heading } from '../../UI/Typography/typography';
import Button from '../../UI/Button/Button';
import styles from './products.module.scss';
import WidthContainer from '../../UI/WidthContainer/container';
import ProductForm from './products-modal/products-modal';
import ProductBackdrop from './products-modal/product-backdrop';
import CartLink from '../nav-menu/cart-link/cart-link';
import { useSelector } from 'react-redux';

const Products = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const counter = useSelector((state) => state.cart.cartCounter);

  const productsData = useSelector((state) => state.products.productsList);
  // console.log("productsData", productsData);
  const toggleShowAll = (e) => {
    e.preventDefault();
    setShowAll(!showAll);
  };

  const openModalHandler = (e) => {
    e?.preventDefault();
    setIsModalOpened((prev) => !prev);
  };

  const selectProductHandler = (product_id) => {
    const selectedItem = productsData.find(
      (element) => element.id === product_id
    );
    // console.log(selectedItem);
    setSelectedProduct(selectedItem);
  };

  const productsList = showAll
    ? productsData
    : productsData.slice(0, productsData.length / 2);

  const ProductsList = productsList.map((product) => (
    <ProductCard
      type={product.type}
      name={product.name}
      key={product.name}
      price={product.price}
      discount={product.discount}
      url={product.url}
      onOpenModal={openModalHandler}
      onSelectItem={selectProductHandler}
      id={product.id}
    />
  ));

  return (
    <div className={styles.categories}>
      <Subheading className={styles['categories-subheading']}>
        Categories
      </Subheading>
      <Heading className={styles['categories-heading']}>Our Products</Heading>
      <WidthContainer className={styles['categories__container']}>
        {ProductsList}
      </WidthContainer>
      <Button
        showArrow
        onClick={toggleShowAll}
        className={styles['categories-button']}
      >
        {showAll ? 'Show Less' : 'Show More'}
      </Button>
      <ProductForm
        onOpenModal={openModalHandler}
        isShown={isModalOpened}
        selectedProduct={selectedProduct}
      />
      {isModalOpened && (
        <>
          <ProductBackdrop onOpenModal={openModalHandler} />
        </>
      )}
      {counter > 0 && <CartLink className={styles['cart-link']} />}
    </div>
  );
};

export default Products;
