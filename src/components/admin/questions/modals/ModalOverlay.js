import React from "react";
import { IoCheckmarkDoneSharp, IoCheckmarkOutline } from "react-icons/io5";
import styles from "../modals/ModalOverlay.module.css";
function ModalOverlay(props) {
  console.log(props);
  return (
    <div>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2 className={styles.headerChanges}>Detalji objave</h2>
        </header>
        <div className={styles.rowSeeMsg}>
          <div className="col-sm-12">
            <div className={styles.labelSeeMsg}>
              <h4 className={styles.changes}>Datum</h4>
            </div>
          </div>
        </div>

        <div className={styles.rowSeeMsg}>
          <div className="col-sm-12">
            <div className={styles.datamodalSeeMsg}>
              {new Date(props.data.publishDate).toLocaleString("en-GB", {
                timeZone: "UTC",
              })}
            </div>
          </div>
        </div>
        <div className={styles.rowSeeMsg}>
          <div className="col-sm-12">
            <div className={styles.labelSeeMsg}>
              <h4 className={styles.changes}>Korisnici</h4>
            </div>
          </div>
        </div>
        <div className={styles.rowSeeMsg}>
          <div className={styles.boxUsersSeeMsg}>
        {props.users ? props.users.map((user) => {
              return (
                    <div className={styles.userslabelSeeMsg}>{user.name}
                    <span>
                      {user.received && user.read ? (
                        <IoCheckmarkDoneSharp
                        style={{
                          color: "green",
                          fontSize: "25px",
                          marginBottom: "-1%",
                        }}
                      />
                      ) : user.received == null && user.read ? (
                        <IoCheckmarkDoneSharp
                              style={{
                                color: "green",
                                fontSize: "25px",
                                marginBottom: "-1%",
                              }}
                            />
                      ) : user.received && user.read == null ?(
                        <IoCheckmarkOutline
                              style={{
                                color: "#282828",
                                fontSize: "25px",
                                marginBottom: "-1%",
                              }}
                            />
                      ) : user.received == null && user.read ==null ? (
                        <IoCheckmarkOutline
                              style={{
                                color: "#282828",
                                fontSize: "25px",
                                marginBottom: "-1%",
                              }}
                            />

                      ) : null}
                    </span>
                    </div>
                    );
              }):"no users"}
              </div>
        </div>
        <div className={styles.rowSeeMsg}>
          <div className="col-sm-12">
            <div className={styles.labelSeeMsg}>
              <h4 className={styles.changes}>Tekst poruke</h4>
            </div>
          </div>
        </div>
        <div className={styles.rowSeeMsg}>
        <div className={styles.modaltitleSeeMsg}>
          <div className={styles.modalSeeMsg}>
          <p className={styles.changes}>{props.data.message}</p>
          </div>
        </div>
        </div>
        <footer className={styles.actions}>
          <span
            className={styles.modalclosebtnSeeMsg}
            onClick={props.onConfirm}
          >
            X
          </span>
        </footer>
      </div>

      {/*  
     <div className="modalBackgroundSeeMsg">
      <div className="modalContainerSeeMsg">
         <div className="rowSeeMsg">
           <div className="titleCloseBtnSeeMsg col-sm-12">
             <button className="modalclosebtnSeeMsg" onClick={props.onConfirm}>
              X
             </button>
           </div>
         </div>
         <div className="rowSeeMsg">
           <div className="col-sm-12">
             <div className="labelSeeMsg">Datum</div>
           </div>
         </div>
         <div className="rowSeeMsg">
             <div className="datamodalSeeMsg col-sm-12">
                 <div>{new Date(props.data.datumSlanjaPoruke).toLocaleString('en-GB', { timeZone: 'UTC' })}</div>
             </div>
         </div>
         <div className="rowSeeMsg">
           <div className="col-sm-12">
             <div className="labelSeeMsg">Korisnici</div>
           </div>
         </div>
         <div className="rowSeeMsg">
             <div className="boxUsersSeeMsg col-sm-6">
             {props.users ? props.users.map((user) => {
              return (
                    <div className='userslabelSeeMsg'>{user.name}
                    <span>
                      {user.received && user.read ? (
                        <IoCheckmarkDoneSharp
                        style={{
                          color: "green",
                          fontSize: "25px",
                          marginBottom: "-1%",
                        }}
                      />
                      ) : user.received == null && user.read ? (
                        <IoCheckmarkDoneSharp
                              style={{
                                color: "green",
                                fontSize: "25px",
                                marginBottom: "-1%",
                              }}
                            />
                      ) : user.received && user.read == null ?(
                        <IoCheckmarkOutline
                              style={{
                                color: "#282828",
                                fontSize: "25px",
                                marginBottom: "-1%",
                              }}
                            />
                      ) : user.received == null && user.read ==null ? (
                        <IoCheckmarkOutline
                              style={{
                                color: "#282828",
                                fontSize: "25px",
                                marginBottom: "-1%",
                              }}
                            />

                      ) : null}
                    </span>
                    </div>
                    );
              }):"no users"}
            </div>
        </div>
        <div className="rowSeeMsg">
          <div className="col-sm-12">
            <div className="labelSeeMsg">Tekst poruke</div>
          </div>
        </div>
        <div className="rowSeeMsg">
          <div className="modaltitleSeeMsg col-sm-12">
            <div className="modalSeeMsg">
           {props.data.poruka}
            </div>
          </div>
        </div>
      </div>
    </div>  */}
    </div>
  );
}

export default ModalOverlay;
