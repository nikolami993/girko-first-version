import React from 'react'
import styles from './ButtonClose.module.css'
function ButtonClose(props) {
    const { query } = props;
    const clearSearchHandler = () => {
        props.onAddCheck(false);
    }
    return (
        <button    
            type="reset"
            className={`${query.length > 2 ? styles["close-icon"] : styles["close-icon-hide"]}`}
            onClick={clearSearchHandler}>
        </button>
    )
}

export default ButtonClose;






