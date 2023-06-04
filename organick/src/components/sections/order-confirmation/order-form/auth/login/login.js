import React from 'react';
import WidthContainer from '../../../../../UI/WidthContainer/container';
import styles from './login.module.scss';
import useInputValidation, {
  validators,
} from '../../../../../form-validation/form-validation';
import { useNavigate } from 'react-router-dom';
import { Subheading } from '../../../../../UI/Typography/typography';
import { Input } from '../../form-input/form-input';
import Button from '../../../../../UI/Button/Button';

const Login = () => {
  const navigate = useNavigate();
  const email = useInputValidation(validators.emailValidator);

  const password = useInputValidation(validators.passwordValidator);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!email.isValid || !password.isValid) {
      return;
    }
    resetForm();
    // dispatch(clearCart());
    navigate('/success');
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
            label={'Password(at)*'}
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
          Confirm
        </Button>
      </form>
    </WidthContainer>
  );
};

export default Login;
