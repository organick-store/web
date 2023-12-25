import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WidthContainer from '../../components/UI/width-container/container';
import styles from './activate-account.module.scss';
import { Subheading } from '../../components/UI/typography/typography';
import { useDispatch } from 'react-redux';
import { activate } from '../../redux/userSlice';

const ActivateAccount = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const [subheadingText, setSubheadingText] = useState('');

  useEffect(() => {
    const activateUser = async () => {
      const { message } = await dispatch(activate(token));
      setSubheadingText(message);
    };

    activateUser();
  }, [dispatch, token]);

  return (
    <WidthContainer className={styles.container}>
      <Subheading>{subheadingText}</Subheading>
    </WidthContainer>
  );
};

export default ActivateAccount;
