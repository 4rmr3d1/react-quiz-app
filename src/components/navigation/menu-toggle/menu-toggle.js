import React from 'react';
import styles from './menu-toggle.module.css';

const MenuToggle = ({onToggle, isOpen}) => {

  const iClasses = [
    styles.MenuToggle,
    'fa',
    isOpen ? `fa-times ${styles.open}` : 'fa-bars'
  ]

  return (
    <i
      className={iClasses.join(' ')}
      onClick={onToggle}
    />
  )
}

export default MenuToggle;