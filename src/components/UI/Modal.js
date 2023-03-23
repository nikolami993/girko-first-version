import React from 'react'
import ModalOverlay from '../admin/questions/modals/ModalOverlay'
import Backdrop from './Backdrop'

function Modal(props) {
  return (
    <>
    {ReactDOM.createPortal(
      <Backdrop onConfirm={props.onConfirm} users={users} style={styles.backdrop} />,
      document.getElementById("backdrop-root")
    )}
    {ReactDOM.createPortal(
      <ModalOverlay onConfirm={props.onConfirm} users={users} data={form} />,
      document.getElementById("overlay-root")
    )}
  </>
  )
}

export default Modal