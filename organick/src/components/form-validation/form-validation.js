import { useReducer } from 'react';

const validateReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT':
      return {
        value: action.value,
        isValid: action.isValid,
        isTouched: false,
      };
    case 'BLUR':
      return {
        value: state.value,
        isValid: state.isValid && action.isValid,
        isTouched: true,
      };
    case 'RESET':
      return {
        value: '',
        isValid: undefined,
        isTouched: false,
      };
    default:
      return state;
  }
};

const useInputValidation = (validatorFn) => {
  const [inputState, dispatch] = useReducer(validateReducer, {
    value: '',
    isValid: undefined,
    isTouched: false,
  });

  const isValid = validatorFn(inputState.value);
  const valueChangeHandler = (event) => {
    dispatch({
      type: 'INPUT',
      value: event.target.value,
      isValid: validatorFn(event.target.value),
    });
  };

  const inputBlurHandler = () => {
    dispatch({ type: 'BLUR', isValid });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid: inputState.isValid,
    isTouched: inputState.isTouched,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export const validators = {
  nameValidator: (value) => /^[A-Z][a-z]+ [A-Z][a-z]+$/.test(value),
  emailValidator: (value) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(value),
  phoneValidator: (value) => /^\d{10}$/.test(value),
  addressValidator: (value) => value.trim().length > 10,
  passwordValidator: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(value),
}

export default useInputValidation;
