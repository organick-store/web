import React from 'react';
import IconLink from '../icon-link/icon-link';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Avatar } from '../../../../img/authorize.svg';
import { Heading } from '../../../UI/Typography/typography';
import styles from './profile.module.scss';
import { logout } from '../../../../redux/userSlice';
import Button from '../../../UI/Button/Button';

const Profile = ({ className }) => {
  const { name, isAuth } = useSelector((state) => state.user);
  const userFirstName = name.split(' ')[0];
  const dispatch = useDispatch();
  
  return !isAuth ? (
    <IconLink linkTo={'/signup'}>
      <Avatar className={className} />
    </IconLink>
  ) : (
    <div onClick={async () => dispatch(logout())}>
      <Heading className={styles.greetings}>Hi, {userFirstName}</Heading>
    </div>
  );
};

export default Profile;
