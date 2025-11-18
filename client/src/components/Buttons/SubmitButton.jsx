// components/Button/Button.jsx
import React from 'react';
import styles from './SubmitButton.module.css';

const SubmitButton = ({ 
  children, 
  type = 'button', 
  variant = 'primary',
  disabled = false, 
  onClick,
  className = '',
  ...props 
}) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default SubmitButton;