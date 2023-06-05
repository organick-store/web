import React from 'react';
import IconLink from '../icon-link/icon-link';
import { useSelector } from 'react-redux';
import { ReactComponent as Avatar } from '../../../../img/authorize.svg';
import { Heading } from '../../../UI/Typography/typography';
import styles from './profile.module.scss';

const Profile = ({ className }) => {
  const { name, isAuth } = useSelector((state) => state.user);
  const userFirstName = name.split(' ')[0];
  console.log(isAuth);

  return !isAuth ? (
    <IconLink linkTo={'/signup'}>
      <Avatar className={className} />
    </IconLink>
  ) : (
    <Heading className={styles.greetings}>Hi, {userFirstName}</Heading>
  );
};

export default Profile;
