import React from 'react'
import styles from '../boxes/LayoutBox.module.css';

export default function LayoutBox(props) {
    return (
        <div className={styles.box}>
            <div className={styles.boxwidth}>
                <div className={styles.container}>
                   {props.children}
                </div>
            </div>
        </div>
    )
}
