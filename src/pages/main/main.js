import React from 'react';
import Hero from '../../components/sections/hero/hero';
import AboutAds from '../../components/sections/about-ads/about-ads';
import About from '../../components/sections/about/about';
import Products from '../../components/sections/products/products';
import Testimonials from '../../components/sections/testimonials/testimonials';
import EcoFriendly from '../../components/sections/eco-friendly/eco-friendly';
import EcoFriendlyAds from '../../components/sections/eco-friendly-ads/eco-friendly-ads';
import News from '../../components/sections/news/news';
// import useFetchProducts from '../../components/fetch-products/fetch-products';

const MainBody = () => {
  // useFetchProducts();

  return (
    <>
      <Hero />
      <AboutAds />
      <About />
      <Products />
      <Testimonials />
      <EcoFriendly />
      <EcoFriendlyAds />
      <News />
    </>
  );
};

export default MainBody;
