import React from 'react';

import styles from './input.module.css';

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && touched && shouldValidate
}

const Input = (props) => {

  const inputType = props.type || 'text';
  const inputClasses = [styles.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    inputClasses.push(styles.invalid);
  }

  return (
    <div className={inputClasses.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
      {
        isInvalid( props )
          ? <span>{props.errorMessage || 'enter the valid information'}</span>
          : null
      }


    </div>
  )
}

export default Input;