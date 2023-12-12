import React from 'react';
import inptStyles from './form-input.module.scss';
import classNames from 'classnames';

export const Input = ({
  label,
  inptType,
  inptPlaceholder,
  onChange,
  onBlur,
  invalid,
  value,
  warn,
}) => {
  return (
    // <>
      <label className={inptStyles.label}>
        {label}
        {invalid && <span className={inptStyles.warn}>{warn}</span>}
        <input
          type={inptType}
          placeholder={inptPlaceholder}
          className={classNames(inptStyles.input, {
            [inptStyles.invalid]: invalid,
          })}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          required
        />
      </label>
     // {/* <span className={inptStyles.warn}>{warn}</span> */}
    //{/* </> */}
  );
};

export const Textarea = ({ label, inptType, inptPlaceholder }) => {
  return (
    <label className={inptStyles.label}>
      {label}
      <textarea
        type={inptType}
        placeholder={inptPlaceholder}
        className={classNames(inptStyles.input, inptStyles.textarea)}
      />
    </label>
  );
};
