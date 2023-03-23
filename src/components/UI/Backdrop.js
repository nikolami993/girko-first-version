import React from 'react'
import styles from '../UI/Backdrop.module.css';
function Backdrop(props) {
  return (
    <div className={styles.backdrop} onClick={props.onConfirm} />
  )
}

export default Backdrop