import { useEffect, useState,  } from "react";
import { useSelector, useDispatch } from 'react-redux';
import styles from "../admin/AdminForm.module.scss";
import GIRLogo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";
import Sidebar from "../navbar/Sidebar";
import Cookies from "js-cookie";
import { log } from "util";
import editImg from "../../img/edit.png";
import Input from "../UI/Input";
import Spinner from "../UI/Spinner";
const AdminForm = ({ socket }) => {
  const [checkedUsersIds, setCheckedUsersIds] = useState([]);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [date, setDate] = useState("");
  const [users, setUsers] = useState([]);
  const [usersEdit, setUsersEdit] = useState([]);
  const [usersChecked, setUsersChecked] = useState([{ id: "", name: "" }]);
  const [serverData, setServerData] = useState([]);
  const [message, setMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  let navigate = useNavigate();

  const [auth, setAuth] = useState(false);

  // const groupData = useSelector((state)=> state.group);

  useEffect(() => {
    if (users.length > 0) {
      setIsLoading(false);
      //console.log(users.length);
    }
  }, [users]);


  const groupName = useSelector(state => state.group);
  const dispatch = useDispatch();
  const readUsers = () => {
    socket?.emit(
      "all_users",
      { admin: window.name },
      function (dataFromServer) {
        setTimeout(() => {
          if(dataFromServer.length > 0){
            console.log(dataFromServer);
            setIsLoading(false);
            setUsers(dataFromServer);
        }
        }, 2000);        
      }
    );
  }
  const readCookie = () => {
    const user = Cookies.get("user");
    if (user) {
      setAuth(true);
    } else {
      navigate("/");
    }
  };

  const readSocket = () => {
    socket.emit("message", true, function (dataFromServer) {
      console.log("dataFromServer");
      console.log(dataFromServer);
      if (dataFromServer.length > 0) {
        return true;
      }
    });
  };


  useEffect(() => {
    if (readSocket) {
      readCookie();
      readUsers();
    } else {
      navigate("/");

    }

  }, []);


  
  // useEffect(() => {
  //   const getUsersData = () => {
  //     return async (dispatch) => {
  //         const fetchData = async () => {
  //               socket?.emit(
  //                 "all_users",
  //                 { admin: window.name },
  //                 function (dataFromServer) {
  //                 //   console.log(dataFromServer);
  //                   return dataFromServer;
  //                 }
  //               );
  
  
  //         }
  //         try{
  //             const getData = await fetchData();
  //             dispatch(groupActions.getUsersData(getData));
  //             console.log("getData");
  //             console.log(getData);
  //         }catch(error){
  //             console.log("error");
  //         }
  //     }
  // }

  // }, []);




  const inputChangeHandlerGroup = (event) => {
    if (event.target.value.length >= 3) {
      setShow(true);
      setGroup(event.target.value);
    }
    else {
      setShow(false);
    }
  };

  const clearHandlerGroup = () => {
    document.querySelector('#grupa').value = '';
    setShow(false);
  }
  const clearSearchHandler = () => {
    document.querySelector('#pretraga').value = '';
    setQuery("");
    setShow2(false);
    //setServerData(users);
  }


  const submitHandler = (event) => {
    event.preventDefault();
    if (group.length > 0) {
      const userData = {
        users: serverData,
        name: group,
        date,
      };
      
      console.log("userData");
      console.log(userData);
      socket?.emit(
        "cr_new",
        { users: serverData, name: group },
        function (dataFromServer) {
          console.log(dataFromServer);
          navigate("/kreiranje_poruke");
        }
      );

      console.log(1000);
      socket.on("cr_new_msg", function (dataFromServer) {
        console.log("cr_new_msg " + JSON.stringify(dataFromServer));
        navigate("/poruke");

        // navigate('/posts')
      });
    } else if (group.length === 0) {
      console.log(1);
    }
  };


  const checkUsers = (e) => {
    var permissions_array = [...serverData];
    if (e.target.checked) {
      let checkedUser = users.find((user) => user.name === e.target.name);
      console.log(checkedUser);

      setCheckedUsersIds([...checkedUsersIds, checkedUser.name]);
      permissions_array = [...serverData, e.target.id];
    } else {
      setCheckedUsersIds(
        checkedUsersIds.filter((user) => user !== e.target.name)
      );
      permissions_array.splice(serverData.indexOf(e.target.id), 1);
    }
    console.log(permissions_array);

    setServerData(permissions_array);

  };

  const handleChangeName = (e) => {
    console.log(e.target.value);

    setNameUser(e.target.value);
  };
  const handleChangeLastName = (e) => {
    console.log(e.target.value);
    setLastName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const editUserHandler = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    let id = e.target.id;
    let editUser = {};
    editUser["user"] = users.filter((user) =>
      user.data_id.toLowerCase().includes(id)
    );
    setId(editUser.user[0].data_id);
    setNameUser(editUser.user[0].name);
    setLastName(editUser.user[0].last_name);
    setEmail(editUser.user[0].email);
    if (editUser.user[0].active === 0) {
      setStatus(false);
    } else {
      setStatus(true);
    }
    setUsersEdit(editUser);
  };
  const resetHandler = (e) => {
    e.preventDefault();
    setId("");
    setNameUser("");
    setLastName("");
    setEmail("");
    setStatus(false);
    setUsersEdit([]);

    // readUsers();
  };

  const changeUserHandler = (e) => {
    e.preventDefault();
    let check = 0;
    if (status) {
      check = 1;
    }

    const userForm = {
      user_id: id,
      name: nameUser,
      last_name: lastName,
      activate: check,
      email: email,
    };
    console.log(userForm);

    socket?.emit(
      "update_users",
      { users: userForm },
      function (dataFromServer) {
        console.log(dataFromServer);
      }
    );


    setId("");
    setNameUser("");
    setLastName("");
    setEmail("");
    setStatus(false);
    setUsersEdit([]);
    readUsers();
  };
  const changeStatusHandler = (e) => {
    setStatus((val) => !val);
  }

  const removeUser= (id) => {
    console.log(`remove ${id}`, serverData);

    setServerData(prev => {
      const arr = [...prev];
      arr.splice(arr.indexOf(id),1);
      return arr;
    });

    let unCheckUser = users.find(user => user.data_id.includes(id));
    console.log("unCheckUser ", unCheckUser.name);
    setCheckedUsersIds(prev => {
      const rm = [...prev];
      rm.splice(rm.indexOf(unCheckUser.name),1);
      return rm;
    });
      //  prev.splice(indexOf(id)unCheckUser.name,1));
  }

  console.log('rerender', serverData)

  return (
    <Sidebar>
      <div className={styles.content}>

        {usersEdit.user ? (
          <div className={styles.boxhome}>
            <div className={styles.containerhome}>
              <form action="#" method="post">
                <div className={styles.titleofForm}>
                  <img src={GIRLogo} className={styles.log} alt="" />
                  <h3>Korekcija korisnika</h3>
                </div>

                <input
                  type="text"
                  autoComplete="off"
                  className={styles["input-box"]}
                  id={id}
                  value={nameUser}
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
                  id={usersEdit.user[0].data_id}
                  checked={status}
                  onChange={changeStatusHandler}
                />

                {/* <input type="text" required className="input-box" id="grupa" name="poruka" placeholder="Unesite poruku" onChange={inputChangeHandlerPoruka} /> */}
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
              </form>
            </div>
          </div>
        ) :
          <div className={styles.boxhome}>
            <div className={styles.containerhome}>
              <form action="#" method="post">
                <div className={styles.titleofForm}>
                  <img src={GIRLogo} className={styles.log} alt="" />
                  <h3>Korisnici</h3>
                </div>
                <Input
                  type="text"
                  style={styles["input-box"]}
                  id="grupa"
                  name="grupa"
                  placeholder="Unesite naziv grupe ..."
                  onChange={inputChangeHandlerGroup}
                  autoComplete="off"
                />
                <button className={`${show === true ? styles.clearinput : styles.clearinputhide}`} type="button" onClick={clearHandlerGroup}></button>

                {
                  serverData.length > 0 &&
                  <div className={styles.previewCheckUsers}>

                    {
                      serverData ? serverData.map(
                        data => users.filter(
                          user => user.data_id.includes(data))
                          .map( user => (
                              <span className={styles.userTag}>
                                <i>{user.name + " " + user.last_name +" "}</i>
                                <span className={styles.userTagRemove} onClick={() => removeUser(user.data_id)}>&#x2715;</span>
                              </span>
                            )
                          )
                      ) 
                      : 
                      null
                    }
                  </div>
                }

                <div className={styles.searchGroup}>
                  <input
                    type="search"
                    className={styles["input-search"]}
                    id="pretraga"
                    name="pretraga"
                    placeholder="Pretraga..."
                    onChange={(e) => (setQuery(e.target.value) || e.target.value.length >= 3 ? setShow2(true) : setShow2(false))}
                  // onChange={(e) => (setQuery(e.target.value))}
                  />

                  {/* <button className={styles["close-icon"]} type="reset" onClick={clearHandlerGroup}></button> */}
                  <button className={`${show2 === true ? styles["close-icon"] : styles["close-icon-hide"]}`} type="button" onClick={clearSearchHandler}></button>

                </div>
                <div className={`${styles.boxforUsers} ${isLoading ? styles.boxforUsersplusCss : " "}`}>{/********************/}
                {isLoading ? ( <Spinner style={styles.containerloader} /> ) : (
                  <div>
                  {users
                    .filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
                    .map((user) => (
                      <div className={styles.bordertwo}>
                        <div key={user.data_id} className={styles.forget}>
                          <label className={styles["checkbox-label"]}>
                            {/* <input type="checkbox" id={user.data_id} name={user.email} value={user.email}  onChange={e => checkUsers(e)} checked={checkedUsersIds.includes(user.email)} /> */}
                            {user.active === 1 &&
                              <input
                                type="checkbox"
                                id={user.data_id}
                                name={user.name}
                                data-email={user.email}
                                data-active={user.active}
                                value={user.name}
                                onChange={(e) => checkUsers(e)}
                                checked={checkedUsersIds.includes(user.name)}
                              />
                            }
                            {user.active === 1 ? <div className={styles["checkbox-custom"]}></div> : null}
                            {user.active === 1 &&
                              <div className={styles.usersinAdminForm}>{user.name + " " + user.last_name}</div>}
                            {user.active === 0 &&
                              <div className={styles.usersDisabled}>{user.name + " " + user.last_name}</div>}

                          </label>
                        </div>
                        <div className={styles.btns}>
                          <button
                            id={user.data_id}
                            className={styles.updateBtn}
                            onClick={editUserHandler}
                          >
                            <img src={editImg} className={styles.editicon} onClick={editUserHandler} id={user.data_id} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>{/********************/}

                {/* <input type="text" required className="input-box" id="grupa" name="poruka" placeholder="Unesite poruku" onChange={inputChangeHandlerPoruka} /> */}

                <button className={styles.btnAdminGroup} onClick={submitHandler}>
                  Kreiraj grupu
                </button>
              </form>
            </div>
          </div>
        }
      </div>
    </Sidebar>
  );
};
export default AdminForm;
