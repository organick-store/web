import React, { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';
import WidthContainer from '../UI/WidthContainer/container';
import styles from './activateAccount.module.scss';
import { Subheading } from '../UI/Typography/typography';
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
