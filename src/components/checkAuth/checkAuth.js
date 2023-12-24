import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refresh } from '../../redux/userSlice';

const CheckAuth = () => {
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.isAuth) {
      dispatch(refresh(token));
    }
  }, [dispatch, user.isAuth, token]);
};

export default CheckAuth;
