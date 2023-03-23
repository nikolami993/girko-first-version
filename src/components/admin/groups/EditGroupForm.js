import React, { useEffect, useRef, useState } from 'react'
import Header from "../boxes/Header";
import Input from "../../UI/Input";
import Search from "../../UI/Search";
import GIRLogo from "../../../img/logo.png";
import styles from "../groups/EditGroupForm.module.css"
import { useNavigate } from 'react-router-dom';
import Button from '../../UI/Button';
import DropdownGroup from './DropdownGroup';
import GroupMembers from './GroupMembers';

export default function EditGroupForm(props) {
    const { socket, usersEdit, editGroupName } = props;
    console.log(usersEdit);
    const [arrayUsers, setArrayUsers] = useState([{ data_id: "", name: "", last_name:"",  status: "" }]);
    const resetHandler = (e) => {
        e.preventDefault();
        props.onSubmitForm(false);
    };
    const changeUserHandler = (e) => {
        e.preventDefault();
        let id = e.target.id;
        let data = {
            group_id: id,
            users: usersEdit
        };
        console.log("changeUserHandler");
        console.log(data);
        socket?.emit("add_del_v_users_json", { data }, function (dataFromServer) {
            if(dataFromServer === "ok"){
               props.onSubmitForm(false);
            }
        });
    };
    const addUserHandler = (data) => {
       props.onAddUserGroup(data);

    }
    const onChangeHandler = (data) => {
        setArrayUsers(data);
    }
    return (
        <>
            {usersEdit ? (
                <form action="#" method="post">
                    <Header
                        style={styles.titleEditGroup}
                        title="Grupa korisnika"
                        image={GIRLogo}
                        imageStyle={styles.log}
                    />
                    <Header
                        style={styles.titleEditGroup}
                        title={editGroupName[0].name}
                    />
                    <DropdownGroup socket={socket} usersEdit={usersEdit} editGroupName={editGroupName[0].name} onAddUser={addUserHandler} />
                    <GroupMembers usersEdit={usersEdit} onChangeUser={onChangeHandler} />
                    <button className={styles.btnAdmin} id={editGroupName[0].data_id} onClick={changeUserHandler}>Sačuvaj promene</button>
                    <button className={styles.btnAdminRemove} onClick={resetHandler}>Otkaži promene</button>
                </form>

            ) : null}
        </>
    )
}
