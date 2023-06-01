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

export default useInputValidation;
