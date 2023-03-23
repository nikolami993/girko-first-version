import React, { useEffect } from 'react'
import { FaUser, FaUsers } from 'react-icons/fa';
import Input from '../../UI/Input';
import styles from '../form/FormItem.module.css';
export default function FormItem(props) {
  const { user, users, setCheckedUsersIds, checkedUsersIds, serverData, setServerData, checkedUsers, unMarkedUser } = props;



  




  const checkUsers = (e) => {


    let permissions_array = [...serverData];
    if (e.target.checked) {
      let checkedUser = users.find(user => user.name === e.target.name);
      setCheckedUsersIds([...checkedUsersIds, checkedUser.name]);

      permissions_array = [...serverData, e.target.id];
    } else {
      setCheckedUsersIds(checkedUsersIds.filter(user => user !== e.target.name));
      permissions_array.splice(serverData.indexOf(e.target.id), 1);
    }
    console.log(permissions_array);
    setServerData(permissions_array);
    props.onAddCheckedItems(permissions_array);
  };
  return (
    <div className={styles.forget}>
        {/* <p>{checkedUsersIds}</p> */}

      <label className={styles.checkbox}>
        <Input
          type="checkbox"
          id={user.data_id}
          name={user.name}
          value={user.name}
          onChange={e => checkUsers(e)}
          checked={checkedUsersIds.includes(user.name)}
        />
        <span className={styles['checkbox-custom']}></span>
        <span className={styles.users}>{user.last_name ? user.name + " " + user.last_name : user.name}</span>
        <i className={styles['faiconsforuser-s']}>
          {user.type === 1 ? <FaUsers /> : <FaUser />}</i>
      </label>
    </div>
  )
}
