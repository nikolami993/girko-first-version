import React, { useEffect, useRef, useState } from "react";
import styles from "../posts/Post.module.css";
import GIRLogo from "../../../img/logo.png";
// import { IconName } from "react-icons/fa";
import {
  IoCheckmarkDoneSharp,
  IoCheckmarkOutline,
  IoCloseSharp,
} from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import Sidebar from "../../navbar/Sidebar";
import Cookies from "js-cookie";

import BackdropPost from "./BackdropPost";
// alert('test');
export default function Post({ socket }) {
  const [modalForm, setModalForm] = useState(false);
  const [formData, setFormData] = useState([]);
  const [clickedUser, setClickedUser] = useState(false);
  const [clickedGroup, setClickedGroup] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [posts, setPosts] = useState([]);
  const [responses, setResponse] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchUserValue, setSearchUserValue] = useState("");
  const [searchGroupValue, setSearchGroupValue] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const searchUser = useRef("");
  const searchGroup = useRef("");
  const ref = useRef();

  let navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const readCookie = () => {
    const user = Cookies.get("user");
    if (user) {
      setAuth(true);
      window.name = user;
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  const refreshPosts = (user, date) => {
    socket?.emit(
      "get_all_msgs_users",
      { user_id: user, date: date },
      function (dataFromServer) {
        console.log("get_all_msgs_users");
        console.log(dataFromServer);
        setPosts([
          ...new Map(
            dataFromServer.map((item) => [item["cr_id"], item])
          ).values(),
        ]);
      }
    );
  };
  useEffect(() => {
    console.log(15985);
    if (searchUser.current.length <= 3 && searchGroup.current.length < 3) {
      console.log(window.name);
      refreshPosts(window.name, "");
    }
  }, [searchUserValue, searchGroupValue]);

  const handlerUsers = (event) => {
    event.preventDefault();
    let msgId = event.currentTarget.id;
    console.log(msgId);
    let chooseRow = posts.find(post => post.msgId === msgId);

    console.log("chooseRow");
    console.log(chooseRow);
    socket?.emit(
      "get_users_for_ntfcs",
      { msg_id: msgId },
      function (dataFromServer) {
        console.log(dataFromServer);
        setUsers(dataFromServer);
      }
    );
    setFormData(chooseRow);

    setModalForm(true);
    // setVisible(!visible);
  };
  const focusHandler = (event) => {
    let id = event.target.id;
    console.log(id);
    if (id == 1) {
      searchGroup.current = "";
      console.log("OBRISANO JE searchGroup " + searchGroup.current);

      setClickedUser(true);
      setClickedGroup(false);
      console.log("id true " + id);
    } else if (id == 2) {
      searchUser.current = "";
      console.log("OBRISANO JE searchUser " + searchUser.current);
      setClickedUser(false);
      setClickedGroup(true);
      console.log("id false " + id);
    } else {
      setClickedUser(false);
      setClickedGroup(false);
    }
  };
  const blurHandler = (event) => {
    let id = event.target.id;
    setClickedUser(false);
    setClickedGroup(false);
  };
  const searchBtnUserHandler = (event) => {
    event.preventDefault();
    searchUser.current = event.target.value;
    setSearchUserValue(event.target.value);
    console.log("pre " + searchUser.current);

    if (searchUser.current.length > 3 && searchGroup.current.length === 0) {
      console.log("posle " + searchUser.current);
      socket?.emit(
        "get_msgs_for_user",
        { userName: searchUser.current, logId: window.name },
        function (dataFromServer) {
          console.log(dataFromServer);
          setPosts(dataFromServer);
        }
      );
    }
  };
  const searchBtnGroupHandler = (event) => {
    event.preventDefault();
    searchGroup.current = event.target.value;

    setSearchGroupValue(event.target.value);
    console.log("pre " + searchGroup.current);
    if (searchUser.current.length === 0 && searchGroup.current.length > 3) {
      console.log("posle " + searchGroup.current);
      socket?.emit(
        "get_msgs_for_group",
        { groupName: searchGroup.current, logId: window.name },
        function (dataFromServer) {
          console.log(dataFromServer);
          setPosts(dataFromServer);
        }
      );
    }
  };



  const searchDatePosts = (event) => {
    event.preventDefault();
    refreshPosts(window.name, event.target.value);
  };
  const MaxLengthMessage = 187;
  const modalFormHandler = () => {
    setModalForm(false);
  }
  return (

    <div className={styles.parentpost}>
      {modalForm && 
                    <BackdropPost 
                    onConfirm={modalFormHandler} 
                    users={users} 
                    form={formData} /> 
                    }

      <Sidebar>

      {!modalForm && 
      <div>
        <div className={styles['container-finder']}>
          <div
            className={`${!clickedUser ? `${styles.finder}` : `${styles.finder} ${styles.active}`} `}
            onFocus={focusHandler}
            onBlur={blurHandler}
          >
            <div className={styles.finder__outer}>
              <div className={styles.finder__inner}>
                <div className={styles.finder__icon}></div>
                <input
                  className={styles.finder__input}
                  id="1"
                  onChange={searchBtnUserHandler}
                  autoComplete="off"
                  placeholder="Unesite ime primaoca..."
                  type="text"
                  maxLength="25"
                />
              </div>
            </div>
          </div>
          <div>
            <div
            className={`${!clickedGroup ? `${styles.finder}` : `${styles.finder} ${styles.active}`} `}
            onFocus={focusHandler}
              onBlur={blurHandler}
            >
               <div className={styles.finder__outer}>
              <div className={styles.finder__inner}>
                <div className={styles.finder__icon}></div>
                  <input
                  className={styles.finder__input}
                  id="2"
                    onChange={searchBtnGroupHandler}
                    autoComplete="off"
                    placeholder="Unesite ime grupe..."
                    type="text"
                    maxLength="25"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.finder}>
              <div className={styles.finder__outer}>
                <div className={styles.finder__inner}>
                  <input
                    className={styles.finder__input}
                    type="text"
                    placeholder="Odaberite datum"
                    ref={ref}
                    // onChange={(e) => console.log(e.target.value)}
                    onChange={searchDatePosts}
                    onFocus={() => (ref.current.type = "date")}
                    // onBlur={() => (ref.current.type = "text")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.postcontent}>
          <div className={styles.container}>
            <div className={styles.borderformsg}>
              <table className={styles.neumorphic}>
                <thead>
                  <tr>
                    <th>Posiljaoc</th>
                    <th>Ime objave</th>
                    <th>Primaoci</th>
                    <th>Datum slanja</th>
                    <th>Status objave</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.length > 0
                    ? posts.map((post) => {
                        return (
                          <tr className={styles.settingsOfrow} onClick={handlerUsers} id={post.msgId}>
                            <td>{post.sendman}</td>
                            
                            <td className={styles.nameOfpost}>{post.message.length > MaxLengthMessage ? (post.message.substring(0, MaxLengthMessage)+'...') : post.message}</td>
                            <td
                              className={styles.msgusers}
                            >
                              Korisnici
                            </td>
                            <td>
                              {new Date(
                                post.publishDate
                              ).toLocaleString('en-GB', { timeZone: 'UTC' })}
                            </td>
                            <td>
                              {(post.received && post.read) ||
                              (post.received == null && post.read)
                                ? "procitano"
                                : (post.received && post.read === null) ||
                                  (post.received == null &&
                                    post.read == null)
                                ? "poslato"
                                : null}
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
              {posts.length === 0 && <p className={styles.errorMsg}>Nema objava za datu pretragu</p>}
            </div>
          </div>

          {/* <div className={visible ? styles.lightbox : styles.hide-lightbox}> */}
          
          <div
            className={`${visible ? styles.lightbox : styles["hide-lightbox"]}`}
          >
            <div className={styles.boxpostusers}>
              <form action="#" method="post">
                <div>Primaoci poruke:</div>
               
                {users
                  ? users.map((user) => {
                      return (
                        <ul>
                          <li>
                            {user.name}{" "}
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
                            ) : user.received && user.read == null ? (
                              <IoCheckmarkOutline
                                style={{
                                  color: "#282828",
                                  fontSize: "25px",
                                  marginBottom: "-1%",
                                }}
                              />
                            ) : user.received == null && user.read == null ? (
                              <IoCheckmarkOutline
                                style={{
                                  color: "#282828",
                                  fontSize: "25px",
                                  marginBottom: "-1%",
                                }}
                              />
                            ) : null}
                          </li>
                        </ul>
                      );
                    })
                  : "no users"}
                <div
                  className={styles.closewindow}
                  onClick={() => setVisible(!visible)}
                >
                  X
                </div>
              </form>
            </div>
          </div>
        </div>
        </div>
        }

      </Sidebar>
    </div>
  );
}
