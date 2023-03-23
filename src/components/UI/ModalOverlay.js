import React from 'react'
import styles from './ModalOverlay.module.css';

function ModalOverlay({title, check, approvedForm,onConfirm}) {

    const yesSendForm = () => {
        approvedForm(true);    
        // onConfirm();   
    }

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>

                <div className={styles.modalrow}>
                    <div className={`${styles.modaltitle} col-sm-12`}>
                        <h1>{title}</h1>
                    </div>
                </div>
                {check ?
                    <div className={`${styles.modaltitle} ${styles.modalmarginbtn}`}>
                        <div className={`col-sm-6 ${styles.modalfooter}`}>
                            <button className={styles.modalyesbtn} onClick={yesSendForm}>Da</button>
                        </div>
                        <div className={`col-sm-6 ${styles.modalfooter}`}>
                            {/* <button id="modalcancelBtn" onClick={() => closeModalPoll(false)}>Ne</button> */}
                            <button id={styles.modalcancelBtn} onClick={onConfirm}>Ne</button>
                        </div>
                    </div>
                    :
                    <div className={`${styles.modaltitle} ${styles.modalmarginbtn}`}>
                        <div className={`col-sm-12 ${styles.modalfooter}`}>
                            <button className={styles.modalyesbtn}  onClick={onConfirm}>Ok</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ModalOverlay