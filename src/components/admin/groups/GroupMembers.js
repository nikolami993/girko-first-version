import React, { useState } from 'react'
import Button from '../../UI/Button';
import styles from '../groups/GroupMembers.module.css';
function GroupMembers(props) {
    const { usersEdit } = props;
    const [arrayUsers, setArrayUsers] = useState(usersEdit);

    console.log(usersEdit);
    
    const removeHandler = (e, index) => {
       
        e.preventDefault();
        const list = [...usersEdit];
        console.log("list");
        console.log(list[index].status);
        if (list[index].status === "" || list[index].status === "I") {
            list[index].status = "D";
            console.log("jeste");
        // } else if (list[index].status === "I") {
        //     list.splice(index, 1);
        }
        console.log("nije");
        setArrayUsers(list);
        props.onChangeUser(arrayUsers);
    };
    return (
        <>
            {usersEdit.map((user, index) => (
                <div className={user.status === "D" ? styles.remove : styles.responses} key={index}>
                    {/* <input type="text" id={user.data_id} className={styles["input-box-input"]} value={user.last_name != null ? user.name +" "+user.last_name : user.name} autoComplete="off" disabled /> */}
                    <input type="text" id={user.data_id} className={styles["input-box-input"]} value={user.last_name  ? user.name +" "+user.last_name : user.name} autoComplete="off" disabled />
                    <button className={styles.minus} id={user.data_id} onClick={(e) => removeHandler(e, index)}>-</button>
                </div>
            ))}
        </>
    )
}

export default GroupMembers