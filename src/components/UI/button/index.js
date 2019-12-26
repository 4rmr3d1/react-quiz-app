import React from 'react';
import './button.css';

const Button = (
  {type, onClick, disabled, children}
) => {

  const buttonClass = [
    disabled ? `btn-outline-${type}` : `btn-${type}`
  ]

  return (
    <button
      onClick={onClick}
      className={`btn ${buttonClass.join(' ')}`}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button;