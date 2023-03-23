import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ReUser.module.css";

export default function ReUser({socket}) {
  const { id } = useParams();
  const [msg, setMsg] = useState("");
  useEffect(() => {
    socket?.emit(
      "reverify",
      { id: id },
      function (dataFromServer) {
        console.log(dataFromServer);
        if (dataFromServer === "ok") {
          setMsg("Mejl za verifikaciju naloga je poslat na Vašu e-mail adresu!");
        }
      }
    );
  }, []);

  return (
    <div className={styles.msg}>
      <h1>{msg}</h1>
    </div>
  );
}
