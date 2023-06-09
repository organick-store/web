import React from 'react';
import WidthContainer from '../../../../../UI/WidthContainer/container';
import styles from './login.module.scss';
import useInputValidation, {
  validators,
} from '../../../../../form-validation/form-validation';
import { Subheading } from '../../../../../UI/Typography/typography';
import { Input } from '../../form-input/form-input';
import Button from '../../../../../UI/Button/Button';
import { login } from '../../../../../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const email = useInputValidation(validators.emailValidator);
  const password = useInputValidation(validators.passwordValidator);
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!email.isValid || !password.isValid) {
      return;
    }
    resetForm();
    // dispatch(clearCart());
    dispatch(login(email.value, password.value));
    navigate('/');
  };

  const resetForm = () => {
    email.reset();
    password.reset();
  };

  return (
    <WidthContainer>
      <form className={styles.form}>
        <Subheading className={styles['form-title']}>Login</Subheading>
        <div className={styles.form__main}>
          <Input
            invalid={!email.isValid && email.isTouched}
            value={email.value}
            label={'Email address*'}
            inptType={'email'}
            inptPlaceholder={'example@yourmail.com'}
            onChange={email.valueChangeHandler}
            onBlur={email.inputBlurHandler}
            warn={'Enter a valid email'}
          />
          <Input
            invalid={!password.isValid && password.isTouched}
            value={password.value}
            label={'Password(at least 8 characters)*'}
            inptType={'password'}
            onChange={password.valueChangeHandler}
            onBlur={password.inputBlurHandler}
            warn={'Enter valid password'}
          />
        </div>
        <Button
          showArrow
          type='submit'
          className={styles['form-button']}
          onClick={submitHandler}
        >
          Login
        </Button>
      </form>
    </WidthContainer>
  );
};

export default Login;
