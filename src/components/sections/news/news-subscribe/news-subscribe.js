import React from 'react';
import WidthContainer from '../../../UI/WidthContainer/container';
import styles from './news-subscribe.module.scss';
import { Heading } from '../../../UI/Typography/typography';
import Button from '../../../UI/Button/Button';

const Subscribe = () => {
  return (
    <WidthContainer className={styles.subscribe}>
      <Heading className={styles['subscribe-heading']} textColor='white'>
        Subscribe to our Newsletter
      </Heading>
      <div className={styles['subscribe__submit']}>
        <input
          type='email'
          className={styles['subscribe__submit-input']}
          placeholder='Your Email Address'
        />
        <Button className={styles['subscribe__submit-button']}>
          Subscribe
        </Button>
      </div>
    </WidthContainer>
  );
};

export default Subscribe;
