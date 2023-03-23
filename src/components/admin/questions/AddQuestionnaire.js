import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { FaUser, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../navbar/Sidebar";
import styles from "../questions/AddQuestionnaire.module.css";
import BackdropGroup from "../groups/BackdropGroup";

export default function AddQuestionnaire({ socket }) {
  const [poruka, setPoruka] = useState("");
  const [message, setMessage] = useState("");
  const [groups, setGroups] = useState("");
  const [chekiranaGrupa, setchekiranaGrupa] = useState("");
  const [datum, setDatum] = useState("");
  const [users, setUsers] = useState([]);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [questionData, setQuestionData] = useState([]);
  const [testData, setTestData] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const [checkedUsersIds, setCheckedUsersIds] = useState([]);
  const [checkedQuestionIds, setCheckedQuestionIds] = useState([]);
  const [query, setQuery] = useState("");
  const [questionCritirea, setQuestionCritirea] = useState("");
  const [mailman, setMailman] = useState("");
  const [selected, setSelected] = useState("");
  const [openModalPoll, setOpenModalPoll] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsApprove, setModalIsApprove] = useState(false);

  let navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const readCookie = () => {
    const user = Cookies.get("user");
    if (user) {
      setAuth(true);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    readCookie();
    allUsers();
    allPolls();
  }, []);
  const allUsers = () => {
    // socket?.emit("all_all_users", { admin: window.name }, function (dataFromServer) {
    //   // console.log(JSON.stringify(dataFromServer));
    //   setMailman(window.name);
    //   setUsers(dataFromServer);
    // });
  };
  const allPolls = () => {
    console.log("all_questionnaires");
    socket?.emit(
      "all_questionnaires",
      { user_id: window.name },
      function (dataFromServer) {
        // socket?.emit("all_questionnaires", { user_id: window.name }, function (dataFromServer) {
        console.log(JSON.stringify(dataFromServer));
        setQuestionnaires(dataFromServer);
      }
    );
  };

  const inputChangeHandlerPoruka = (event) => {
    setPoruka(event.target.value);
  };

  const submitHandler2 = (event) => {
    event.preventDefault();
    if (serverData.length > 0 && selected.length > 0) {
      console.log("serverData");
      console.log(serverData);
      console.log("selected");
      console.log(selected);

      const userData = {
        to_users: serverData,
        to_poll: selected,
      };

      console.log(userData);
      console.log("add_poll_users");

      socket?.emit(
        "add_poll_users",
        { to_users: serverData, to_poll: selected },
        function (data) {
          console.log(data);
          if (data === "ok") {
            setModalIsApprove(true);
            setUsers([]);
            setServerData([]);
            setCheckedUsersIds([]);
            setSelected("");
          }
        }
      );
     
    } else {
      console.log(1);
      setModalIsOpen(true);
    }
  };
  //pamti check status
  const checkUsers = (e) => {
    var permissions_array = [...serverData];
    if (e.target.checked) {
      let checkedUser = users.find((user) => user.name === e.target.name);
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

  const checkQuestions = (e) => {
    var permissions_array = [...questionData];
    if (e.target.checked) {
      let checkedQuestion = questionnaires.find(
        (questionnaire) => questionnaire.name === e.target.name
      );
      // setCheckedUsersIds([...checkedUsersIds, checkedUser.name]);
      setCheckedQuestionIds([...checkedQuestionIds, checkedQuestion.name]);
      permissions_array = [...questionData, e.target.id];
    } else {
      setCheckedQuestionIds(
        checkedQuestionIds.filter(
          (questionnaire) => questionnaire !== e.target.name
        )
      );
      permissions_array.splice(questionData.indexOf(e.target.id), 1);
    }
    console.log(permissions_array);

    setQuestionData(permissions_array);
  };

  const radioChangeHandler = (e) => {
    console.log(e.target.id);
    let id = e.target.id;
    if(id != null){
      setSelected(id);
      console.log("get_users_for_poll");
      socket?.emit("get_users_for_poll", { p_id_poll: id }, function (dataFromServer) {
        console.log(JSON.stringify(dataFromServer));
        setUsers(dataFromServer);
    });
    }
    
  };
  const clearHandlerSurvey=()=>{
    document.querySelector('#anketa').value = '';
    setQuestionCritirea("");
    setShow(false); 
  }
  const clearHandlerGroup=()=>{
    document.querySelector('#grupa').value = '';
    setQuery("");
    setShow2(false); 
  }
  const closeHandler = () => {
    setOpenModalPoll(true);
    setMessage("");

    allUsers();
    allPolls();
    setCheckedUsersIds([""]);
    setSelected("");
    console.log(123);
  };

  const modalFormHandler = () => {
    setModalIsOpen(false);
  }
  const modalFormApproveHandler = () => {
    setModalIsApprove(false);
  }
  const approvedFormHandler = (approve) => {
    setModalIsOpen(false);
   
  }
  return (
    <Sidebar>
      {message ? (
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="modalrow">
              <div className="modaltitle col-sm-12">
                <h1>Uspešno dodata anketa</h1>
              </div>
            </div>
            <div className="modalrow modalmarginbtn">
              <div className="col-sm-12 modalfooter">
                <button className="modalyesbtn" onClick={closeHandler}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.contentaddpost}>
          <div className={styles.boxaddpost}>
            <div className={styles.containeraddpost}>
              <form action="#" method="post">
                <div className={styles.titleaddpost}>
                  <h3>Anketa</h3>
                </div>
                <input
                  type="text"
                  className={styles.searchUsers}
                  id="anketa"
                  name="anketa"
                  placeholder="Unesite anketu..."
                  autoComplete="off"
                  onChange={(e) => (setQuestionCritirea(e.target.value) || e.target.value.length >= 3 ? setShow(true) : setShow(false))}
                />
                <button className={`${show === true ? styles.clearinput : styles.clearinputhide}`} type="button" onClick={clearHandlerSurvey}></button>
                <div className={styles.borderaddQuestionnaire}>
                  {questionnaires
                    ? questionnaires
                        .filter((questionnaire) =>
                          questionnaire.name
                            .toLowerCase()
                            .includes(questionCritirea.toLowerCase())
                        )
                        .map((questionnaire) => (
                          <div
                            key={questionnaire.data_id}
                            className={styles.forgetradio}
                          >
                            <label className={styles["radio-label"]}>
                              <input
                                type="radio"
                                id={questionnaire.data_id}
                                name={questionnaire.name}
                                value={questionnaire.name}
                                onChange={radioChangeHandler}
                                checked={selected === questionnaire.data_id}
                              />
                              <span className={styles["radio-custom"]}></span>
                              <span className={styles.usersAddQuestions}>
                                {questionnaire.name}
                              </span>
                            </label>
                            {/* <label className={styles['checkbox-label']}> */}
                            {/* <input type="checkbox" id={user.data_id} name={user.email} value={user.email}  onChange={e => checkUsers(e)} checked={checkedUsersIds.includes(user.email)} /> */}
                            {/* <input type="radio" 
                                        id={questionnaire.data_id} 
                                        name={questionnaire.name} 
                                        value={questionnaire.name} 
                                        onChange={radioChangeHandler} 
                                        checked={selected === questionnaire.data_id} /> */}
                            {/* <span className={styles['checkbox-custom']}></span> */}
                            {/* <span className={styles.korisnici}>{questionnaire.name}</span> */}
                            {/* </label> */}
                          </div>
                        ))
                    : "nema"}
                </div>
                {users.length > 0 ? 
                 <>
                  <div className={styles.titleaddQuestion}>
                  <h3>Korisnici</h3>
                </div>
                <input
                  type="text"
                  className={styles.searchUsers}
                  id="grupa"
                  name="grupa"
                  placeholder="Unesite pretragu..."
                  autoComplete="off"
                  onChange={(e) => (setQuery(e.target.value) || e.target.value.length >= 3 ? setShow2(true) : setShow2(false))}
                />
                 <button className={`${show2 === true ? styles["clear-icon"] : styles["clear-icon-hide"]}`} type="button" onClick={clearHandlerGroup}></button>
                <div className={styles.borderaddQuestionnaire}>
                  {users
                    .filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
                    .map((user) => (
                      <div key={user.data_id} className={styles.forget}>
                        <label className={styles["checkbox-label"]}>
                          {/* <input type="checkbox" id={user.data_id} name={user.email} value={user.email}  onChange={e => checkUsers(e)} checked={checkedUsersIds.includes(user.email)} /> */}
                          <input
                            type="checkbox"
                            id={user.data_id}
                            name={user.name}
                            value={user.name}
                            onChange={(e) => checkUsers(e)}
                            disabled={user.user_id && true}
                            checked={user.user_id ? true : checkedUsersIds.includes(user.name)}
                          />
                          <span className={styles["checkbox-custom"]}></span>

                          {/* <span className={styles.korisnici}>{user.name}</span> */}

                          <span className={`${user.user_id ? styles.disabled : styles.usersAddQuestions}`}>{user.last_name ? user.name +" "+ user.last_name : user.name }</span>
                          <i className={styles["faiconsforuser-s"]}>
                            {user.type === 1 ? <FaUsers /> : <FaUser />}
                          </i>
                        </label>
                      </div>
                    ))}
                </div>
                 </>
                : null}
               
                {/* <textarea className={styles['input-box-txt']} placeholder="Unesite poruku..." onChange={inputChangeHandlerPoruka}></textarea> */}
                {/* <button className='btn-addpost' onClick={submitHandler}>Pošalji</button> */}

                <button
                  className={styles["btn-addpost"]}
                  onClick={submitHandler2}
                >
                  Distriburiraj anketu
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {modalIsOpen && (
        <BackdropGroup
        onConfirm={modalFormHandler}
        onApprove={approvedFormHandler}
        check={false}
        title="Podaci nisu validni" 
        />
      )}
      {modalIsApprove && (
        <BackdropGroup
        onConfirm={modalFormApproveHandler}
        onApprove={approvedFormHandler}
        check={false}
        title="Uspešno ste dodali anketu" 
        />
      )}
    </Sidebar>
  );
}
