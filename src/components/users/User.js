import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReUser from "./ReUser";
import styles from "./User.module.css";
function User({ socket }) {
  const { id } = useParams();
  const [msg, setMsg] = useState("");
  useEffect(() => {
    socket?.emit("verify", { id: id }, function (dataFromServer) {
      console.log(dataFromServer);
      if (dataFromServer.length > 30) {
        setMsg("Uspešno ste se verifikovali!");
      } else if (dataFromServer == "notvalid") {
        setMsg(dataFromServer);
      }else if (dataFromServer == "timeout") {
        setMsg(dataFromServer);
      }
    });
  }, []);

  return (
    <div className={styles.msg}>
      {/* <h1>{msg}</h1> */}
      {msg === "timeout" ? (
        <div>
          <h1>Vreme za verifikaciju naloga na ovom linku je istekao</h1>
          <p>
            Ukoliko želite da obnovite link za verifikaciju kliknite
            <Link to={`/reverify/${id}`}> ovde</Link>
          </p>
        </div>
      ) : msg === "notvalid" ? (
        <div>
          <p>Link za verifikaciju koji ste otvorili nije validan.</p>
          <p>Molimo Vas otvorite poštansko sanduče i otvorite ispravan link</p>
        </div>
      ) : <h1>{msg}</h1>}
    </div>
  );
}

export default User;
