import React from 'react';
import styles from './button.module.css';

const Button = (
  {type, onClick, disabled, children}
) => {

  const buttonClass = [
    styles.Button,
    styles[type]
  ]

  return (
    <button
      onClick={onClick}
      className={buttonClass.join(' ')}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button;