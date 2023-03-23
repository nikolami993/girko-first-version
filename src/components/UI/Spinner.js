import React, { useState, useEffect } from 'react';
import styles from './Spinner.module.css';

export default function Spinner(props){
    return(
        <div className={props.style}>
            <div className={styles.loader}></div>
        </div>
    )
}

// const Spinner = (props) => {
// function Spinner(props){

//     function confirmHandler(){
//         props.onConfirm();
//         console.log('ovde '+props.onConfirm());
//     }

//     return(
//         <div className={styles.containerloader} onConfirm={confirmHandler}>
//            <div className={styles.loader} onClick={confirmHandler}></div>
//          </div>
//     );
// };
// export default Spinner;
