import React from 'react';
import styles from './backdrop.module.css';

const Backdrop = ({ onClick }) => {
  return (
    <div
      className={styles.Backdrop}
      onClick={onClick}
    >

    </div>
  )
}

export default Backdrop;