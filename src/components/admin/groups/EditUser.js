import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { groupActions } from '../../store/add-group-slice';
import { updateUsersData } from '../../store/edit-user-actions';
import { userActions } from '../../store/edit-user-slice';
import Input from '../../UI/Input';
import Header from '../boxes/Header';
import GIRLogo from './../../../img/logo.png'
import styles from './EditUser.module.css'
function EditUser() {

  const id = useSelector(state => state.user.id);
  const name = useSelector(state => state.user.name);
  const lastName = useSelector(state => state.user.lastName);
  const active = useSelector(state => state.user.active);
  const email = useSelector(state => state.user.email);
  const error = useSelector(state => state.user.error);
  const dispatch = useDispatch();


  const handleChangeName = (e) => {
    dispatch(userActions.editName(e.target.value));
  }
  const handleChangeLastName = (e) => {
    dispatch(userActions.editLastName(e.target.value));
  }
  const handleChangeEmail = (e) => {
    dispatch(userActions.editEmail(e.target.value));
  }
  const changeStatusHandler = (e) => {
    dispatch(userActions.editStatus(!active));
  }
  const resetHandler = (e) => {
    e.preventDefault();
    dispatch(userActions.editReset({}));
  };
  const changeUserHandler = (e) => {
    e.preventDefault();
    let m = 0;
    if(active){
      m = 1;
    }else{
      m = 0;
    }
    const formData = {
      user_id:id, name, last_name: lastName, email, activate:m
    }
    dispatch(updateUsersData(formData));
  };

  return (
    
    <form action="#" method="post">
      {error && <p>Greska nema podataka</p>}
      {!error && <>
      <Header
        style={styles.titleofForm}
        title="Korekcija korisnika"
        imageStyle={styles.log}
        image={GIRLogo}
      />
      <Input
        type="text"
        autoComplete="off"
        style={styles["input-box"]}
        id={id}
        value={name}
        onChange={handleChangeName}
        placeholder="Unesite ime"
      />
      <input
        type="text"
        autoComplete="off"
        className={styles["input-box"]}
        id={id}
        value={lastName}
        onChange={handleChangeLastName}
        placeholder="Unesite prezime"
      />
      <input
        type="text"
        autoComplete="off"
        className={styles["input-box"]}
        id={id}
        value={email}
        onChange={handleChangeEmail}
      />
      <span className={styles.status}>Status korisnika</span>
      <input
        type="checkbox"
        autoComplete="off"
        className={styles["check-box"]}
        id={id}
        checked={active}
        onChange={changeStatusHandler}
      />
      <div className={styles.newBtn}>
        <button
          className={styles.btnAdmin}
          onClick={changeUserHandler}
        >
          Sačuvaj promene
        </button>
        <button
          className={styles.btnAdminRemove}
          onClick={resetHandler}
        >
          Otkaži promene
        </button>
      </div>
      </>
      }
    </form>

  )
}

export default EditUser