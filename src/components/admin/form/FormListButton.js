import React, { useEffect, useRef, useState } from 'react'
import styles from '../form/FormListButton.module.css'
import editImg from "../../../img/edit.png";
import trashImg from "../../../img/trash2.png";
import ModalOverlay from '../../UI/ModalOverlay';
import BackdropGroup from '../groups/BackdropGroup';
export default function FormListButton(props) {
  const { users, query, socket } = props;
  console.log("SADSASDASDASDAS");
  console.log(query);
  const [group, setGroup] = useState("");
  const [groupId, setGroupId] = useState("");
  const [check, setCheck] = useState(false);
  const [arrayUsers, setArrayUsers] = useState([{ data_id: "", name: "", status: "" }]);
  const [modalForm, setModalForm] = useState(false);
  useEffect(() => {
    // console.log(group);
    if (check) {
      props.onEditGroup(arrayUsers, group, check);
    }
  }, [check]);

  const removeGroupHandler = (e) => {
    e.preventDefault();
    let id = e.target.id;
    console.log("ssssssssssid");
    console.log(id);

    if (id != null) {
      setModalForm(true);
      setGroupId(id);
      // <ModalOverlay check="true" title="Da li ste sigurni da li želite da sačuvate anketu?" />
    }
    
  };

  const editGroupHandler = (e) => {

    e.preventDefault();
    let id = e.target.id;
    setGroup(id);
    socket?.emit("all_group_users", { id: id }, function (dataFromServer) {
      
      console.log("all_group_users");
      console.log(dataFromServer);
      
      setCheck(true);
      setArrayUsers(dataFromServer);
    });
  };
  const modalFormHandler = () => {
    setModalForm(false);
  }
  const approvedFormHandler = (approve) => {
    setModalForm(false);
    if(approve){
    socket?.emit("remove_group_user", { id: groupId }, function (dataFromServer) {
          console.log(dataFromServer);
          if (dataFromServer === "ok") {
            props.refresh();
          }
        });
    }
  }



  return (
    <>
      {modalForm && 
        <BackdropGroup
          onConfirm={modalFormHandler}
          onApprove={approvedFormHandler}
          check={true}
          title="Da li želite da obrišite grupu?" 
          />
      }
      {/* {!modalForm && */}
        <div className={styles.boxforusers}>
          {users
            .filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
            .map((user) => (
              <div className={styles.bordertwo}>
                <div key={user.data_id} className={styles.forget}>
                  <label className={styles["checkbox-label"]}>
                    <div className={styles.UsersforList}>{user.last_name ? user.name +" "+user.last_name : user.name}</div>
                  </label>
                </div>
                <div className={styles.btns}>
                  <button
                    id={user.data_id}
                    className={styles.updateBtn}
                    onClick={editGroupHandler}
                  >
                    <img src={editImg} className={styles.editicon} onClick={editGroupHandler} value={user.name} id={user.data_id} />
                  </button>
                  <button
                    id={user.data_id}
                    className={styles.removeBtn}
                    onClick={removeGroupHandler}
                  >
                    <img src={trashImg} className={styles.editicon} onClick={removeGroupHandler} value={user.name} id={user.data_id} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      {/* } */}
    </>

  )
}
