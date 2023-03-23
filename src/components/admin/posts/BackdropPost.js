import React from "react";
import ReactDOM from "react-dom";
import styles from "../posts/BackdropPost.css";

import ModalOverlay from "../questions/modals/ModalOverlay";
import Backdrop from "../../UI/Backdrop";

function BackdropPost(props) {
  const { users, form } = props;
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
  );
}





export default BackdropPost;
