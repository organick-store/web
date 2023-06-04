import React from 'react';
import { Input } from '../form-input/form-input';
import WidthContainer from '../../../../UI/WidthContainer/container';
import styles from './order-form.module.scss';
import Button from '../../../../UI/Button/Button';
import useInputValidation, {
  validators,
} from '../../../../form-validation/form-validation';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../../../../redux/cartSlice';
import { Paragraph, Subheading } from '../../../../UI/Typography/typography';
import AuthService from '../../../../../services/AuthService';
import { registration } from '../../../../../redux/userSlice';

const Form = ({ bill }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.cart.products).map(
    ({ url, ...info }) => info
  );
  

  const name = useInputValidation(validators.nameValidator);
  const email = useInputValidation(validators.emailValidator);
  const phone = useInputValidation(validators.phoneValidator);
  const address = useInputValidation(validators.addressValidator);
  const password = useInputValidation(validators.passwordValidator);
  const retypePassword = useInputValidation(validators.passwordValidator);

  const resetForm = () => {
    name.reset();
    email.reset();
    phone.reset();
    address.reset();
    password.reset();
    retypePassword.reset();
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (
      !name.isValid ||
      !email.isValid ||
      !phone.isValid ||
      !address.isValid ||
      !password.isValid ||
      !retypePassword.isValid
    ) {
      return;
    }
    resetForm();
    dispatch(clearCart());
    dispatch(registration(name.value, email.value, password.value));
    navigate('/success');
  };

  return (
    <WidthContainer>
      <form className={styles.form}>
        <Subheading className={styles['form-title']}>Registration</Subheading>
        <div className={styles.form__main}>
          <Input
            invalid={!name.isValid && name.isTouched}
            value={name.value}
            label={'Full name*'}
            inptType={'text'}
            inptPlaceholder={'Name Surname'}
            onChange={name.valueChangeHandler}
            onBlur={name.inputBlurHandler}
            warn={'Enter a valid full name'}
          />
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
            invalid={!address.isValid && address.isTouched}
            value={address.value}
            label={'Address*'}
            inptType={'text'}
            inptPlaceholder={'Your address'}
            onChange={address.valueChangeHandler}
            onBlur={address.inputBlurHandler}
            warn={'Enter a valid address'}
          />
          <Input
            invalid={!phone.isValid && phone.isTouched}
            value={phone.value}
            label={'Phone number*'}
            inptType={'tel'}
            inptPlaceholder={'0000000000'}
            onChange={phone.valueChangeHandler}
            onBlur={phone.inputBlurHandler}
            warn={'Enter a valid phone number'}
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
          <Input
            invalid={retypePassword.value !== password.value && retypePassword.isTouched}
            value={retypePassword.value}
            label={'Retype password*'}
            inptType={'password'}
            onChange={retypePassword.valueChangeHandler}
            onBlur={retypePassword.inputBlurHandler}
            warn={'Retyped password does not match the entered one entered'}
          />
        </div>
        <Paragraph>
          <NavLink to={'/signin'} className={styles['login-link']}>
            Already have an account?
          </NavLink>
        </Paragraph>
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

export default Form;
