import React, { useState } from 'react';
import { Input } from '../../components/UI/form-input/form-input';
import WidthContainer from '../../components/UI/width-container/container';
import styles from './registration.module.scss';
import Button from '../../components/UI/button/button';
import useInputValidation, {
  validators,
} from '../../hooks/useInputValidation';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Paragraph, Subheading } from '../../components/UI/typography/typography';
import { registration } from '../../redux/userSlice';

const Registration = () => {
  const dispatch = useDispatch();
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState(false);

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
    try {
      const { success, message } = await dispatch(
        registration(
          name.value,
          email.value,
          password.value,
          phone.value,
          address.value,
        ),
      );
      if (success) {
        setRegistrationStatus(true);
        setRegistrationMessage(message);
      } else {
        setRegistrationStatus(false);
        setRegistrationMessage(message);
      }
    } catch (error) {
      setRegistrationStatus(false);
      setRegistrationMessage('An error occurred during registration.');
    }
  };

  return (
    <WidthContainer className={styles.container}>
      {!registrationStatus ? (
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
              invalid={
                retypePassword.value !== password.value &&
                retypePassword.isTouched
              }
              value={retypePassword.value}
              label={'Retype password*'}
              inptType={'password'}
              onChange={retypePassword.valueChangeHandler}
              onBlur={retypePassword.inputBlurHandler}
              warn={'Retyped password does not match the entered one'}
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
            Register
          </Button>
        </form>
      ) : (
        <>
          <Subheading>{registrationMessage}</Subheading>
          <Paragraph>Please, confirm your email!</Paragraph>
        </>
      )}
    </WidthContainer>
  );
};

export default Registration;