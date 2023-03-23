import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../navbar/Sidebar";
import styles from "./CreateSurvey.module.css";
import GIRLogo from "../../../img/logo.png";
import editImg from '../../../img/edit.png';
import trashImg from '../../../img/trash2.png';
import previewImg from '../../../img/preview.png';
import BackdropGroup from "../groups/BackdropGroup";
import LayoutBox from "../boxes/LayoutBox";
import Header from "../boxes/Header";
import SelectOption from "../questions/SelectOption";
import LayoutForm from "../../layout/LayoutForm";
const CreateSurvey = ({socket}) => {
    const [modalForm, setModalForm] = useState(false);
  const [modalFormError, setModalFormError] = useState(false);
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState("");
  const [counter, setCounter] = useState("");
  const [pollId, setPollId] = useState("");
  const [pollName, setPollName] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [responses, setResponses] = useState([]);
  const [type, setType] = useState([]); 
  const [answers1, setAnswers1] = useState([
    { answer_id: "", answer_text: "", ans_type: "", status: "", q_id: "" },
  ]); 
  const [answers, setAnswers] = useState([""]); 
  const [checkedUsersIds, setCheckedUsersIds] = useState([]);
  const [users, setUsers] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [maxAnswers, setMaxAnswers] = useState(0);
  const [checkic, setCheckic] = useState(true);
  const maxAnsRef = useRef(0);
  const [seqNumber, setSeqNumber] = useState([]);
  const [statusQuestion, setStatusQuestion] = useState("");
  const [isValidYesNo, setIsValidYesNo] = useState(false);
  const [questionnaires, setQuestionnaires] = useState([]);
  const questionInputRef = useRef(null);
  const qInputRefic = useRef("");
  const selectRef = useRef("");
  const [programType, setProgramType] = useState("");
  const [value, setValue] = useState({});
  const [reset, setReset] = useState(false);
  const [query, setQuery] = useState("");
  const [quests, setQuests] = useState([]);
  const [allBackData, setAllBackData] = useState({});
  const [mode, setMode] = useState(0); //u kom statuse je trenutna forma ako je 0 onda se ocekuje insert obican, ako je 1 onda edit
  const [modeQuestion, setModeQuestion] = useState(0);
  const [selectOptionValues, setSelectOptionValues] = useState({});
  const [selectOptionValues2, setSelectOptionValues2] = useState({});
  const [indexq, setIndexQ] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [sendIdPoll, setSendIdPoll] = useState("");
  const [show, setShow] = useState(false);
  const [checkRemove, setCheckRemove] = useState(false);
  const refreshPolls = () => {
    console.log("get_all_polls_preview");
    socket?.emit(
      "get_all_polls_preview",
      { user_id: window.name },
      function (dataFromServer) {
        setQuests(dataFromServer);
      }
    );
  };
  useEffect(() => {
    refreshPolls();
  }, []);

  const editPollHandler = (e) => {
    console.log("get_questions_answers_for_poll");
    socket?.emit(
      "get_questions_answers_for_poll",
      { poll_id: e.target.id },
      function (dataFromServer) {
        let jsonData = JSON.parse(dataFromServer);
        setAllBackData(jsonData);
        setMode(1);
      }
    );
  };
  useEffect(() => {
    let count = 0;
    let qa = [];
    let qa2 = [];
    for (let x in allBackData) {
      if (count === 0) {
        setPollId(allBackData[x]);
      } else if (count === 1) {
        setPollName(allBackData[x]);
      } else {
        qa.push(allBackData[x]);
      }
      count++;
    }

    qa.forEach(function (obj) {
      qa2.push(obj);
    });
    let q1 = [];
    let q1234 = [];
    qa2.map((q) => {
      q1.push(q);
    });
    for (let index = 0; index < q1.length; index++) {
      for (let index2 = 0; index2 < q1[index].length; index2++) {
        const element = q1[index][index2];
        q1234.push(element);
      }
    }
    setServerData(q1234);
  }, [allBackData]);

  const submitHandler = (event) => {
    event.preventDefault();
    const questionnaireProm = {
      id: pollId,
      name: qInputRefic.current.value,
      qa: serverData,
      user_id: window.name,
    };
    submitQuestionnaire(questionnaireProm);

    setCheckedUsersIds([]);
    setAnswers([""]);
    setAnswers1([
      { answer_id: "", answer_text: "", ans_type: "", status: "", q_id: "" },
    ]); //ok
    setServerData([]);
    qInputRefic.current.value = "";
    setPollId("");
    setPollName("");
    refreshPolls();
  };
  const submitQuestionnaire = (data) => {
    console.log("add_update_delete_poll_question_answer");
    console.log(data);
    socket?.emit(
      "add_update_delete_poll_question_answer",
      { questionnaire: data },
      function (dataFromServer) {
        console.log(dataFromServer);
        if (dataFromServer === "ok") {
          let message = "Uspesno poslata anketa";
          console.log(message);
        }
      }
    );
  };

  const clearHandlerGroup=()=>{
    document.querySelector('#poll').value = ''; // ovo ne sme ovako
    setQuery("");
    setShow(false);
  }
  const inputChangeHandlerQuestion = (event) => {
    qInputRefic.current.value = event.target.value;
    setQuestion(event.target.value);
    setPollName(event.target.value);
  };
  const inputChangeHandlerQuestions = (event) => {
    setQuestions(event.target.value);
  };

  const openHandler = (e) => {
    setSendIdPoll(e.target.id);
    setModalForm(true);
  };

  const addHandler = () => {
    // setAnswers((val)=>[...val, ['']]);//ok
    setAnswers1([
      ...answers1,
      { answer_id: "", answer_text: "", ans_type: "", status: "", q_id: "" },
    ]); //ok
  };
  const removeHandler = (index) => {
    //ok
    console.log(answers1);
    // if (mode == 1) {
    if (answers1.length > 1) {
      // let lists = [...answers];

      let lists = [...answers1];
      let counter = 0;
      console.log("USO");

      answers1.map((a) => {
        if (a.status != "") {
          counter++;
        }
      });
      if (counter > 1) {
        let checkedAnswer = lists.at(index);
        console.log(checkedAnswer);
        if (checkedAnswer.answer_id === "") {
          lists.splice(index, 1);
        } else {
          console.log("jedan jedini " + lists[index].answer_text);

          lists[index].status = "D";
        }
        console.log("lists");
        console.log(lists);
        // setAnswers(lists);
        setAnswers1(lists);
      }
    }
  };

  const changeHandler = (e, index) => {
    const { name, value } = e.target; //gadja name koji vec postoji i value koji se trenutno upisuje
    const list = [...answers1]; //select sve iz liste
    list[index].answer_text = value;
    // list[index][name] = value;//nadje element sa tim nazivom pod tim indeksom tek tad mu dodeli value
    // list[index] = value;//nadje element sa tim nazivom pod tim indeksom tek tad mu dodeli value
    //setAnswers(list);//ide u state array
    // console.log(list);
    setAnswers1(list); //ide u state array
  };
  
  const addQuestionHandler = () => {
    if (maxAnswers !== 0) {
      if (answers1.length > 0 && questionInputRef.current !== null) {
        let arrayProm123 = [];
        let Max123 = 0;
        let promMax123 = 0;
        let questionnaireProm = {};
        let empl = { ma: [] };
        if (isValidYesNo) {
          answers1.map((ans, i) => {
            if (ans.status === "D") {
              empl.ma.push({
                q_id: ans.q_id,
                seq_number_question: counter,
                answer_id: ans.answer_id,
                answer_text: ans.answer_text,
                ans_type: type[i],
                status: "D",
              });
            }else if (ans.status === "W") {
              empl.ma.push({
                q_id: ans.q_id,
                seq_number_question: counter,
                answer_id: ans.answer_id,
                answer_text: ans.answer_text,
                ans_type: type[i],
                status: "U",
              });
            } else {
              empl.ma.push({
                q_id: ans.q_id,
                seq_number_question: counter,
                answer_id: ans.answer_id,
                answer_text: ans.answer_text,
                ans_type: type[i],
                status: "U",
              });
            }
          });
          questionnaireProm = {
            question_id: questionId,
            question_text: questionInputRef.current.value,
            // true_answers: answersCorrecto,
            max_ans: maxAnsRef.current.value,
            status: statusQuestion,
            //   seq_number: seqNumber,
            seq_number: counter,
            ma: empl.ma,
          };
        } else {
          answers1.map((ans, i) => {
            if (ans.answer_id.length === 0) {
              serverData.map((q) => arrayProm123.push(q.seq_number));
              if (arrayProm123.length === 0) {
                Max123 = promMax123 + 1;
                setSeqNumber((prevNumber) => [...prevNumber, Max]);
              } else {
                promMax123 = Math.max(...arrayProm123);
                Max123 = promMax123 + 1;
                setSeqNumber((prevNumber) => [...prevNumber, Max]);
              }

              empl.ma.push({
                q_id: ans.q_id,
                seq_number_question: Max123,
                answer_id: ans.answer_id,
                answer_text: ans.answer_text,
                ans_type: type[i],
                status: "",
              });
            } else if (ans.status != "D") {
              empl.ma.push({
                q_id: ans.q_id,
                seq_number_question: Max123,
                answer_id: ans.answer_id,
                answer_text: ans.answer_text,
                ans_type: type[i],
                status: "U",
              });
            } else if (ans.status === "D") {
              empl.ma.push({
                q_id: ans.q_id,
                seq_number_question: seqNumber,
                answer_id: ans.answer_id,
                answer_text: ans.answer_text,
                ans_type: type[i],
                status: "D",
              });
            }
          });

          let arrayProm = [];
          let Max = 0;
          let promMax = 0;
          if (questionId.length === 0) {
            if (serverData.length > 0) {
              serverData.map((q) => arrayProm.push(q.seq_number));
              promMax = Math.max(...arrayProm);
              console.log("promMax ", promMax);
              Max = promMax + 1;
              setSeqNumber((prevNumber) => [...prevNumber, Max]);
            } else {
              Max = 1;
              setSeqNumber((prevNumber) => [...prevNumber, Max]);
            }
          }
          questionnaireProm = {
            question_id: questionId,
            question_text: questionInputRef.current.value,
            // true_answers: answersCorrecto,
            max_ans: maxAnsRef.current.value,
            status: statusQuestion,
            //   seq_number: seqNumber,
            seq_number: Max,
            ma: empl.ma,
          };
        }

        if (questionId != "" || isValidYesNo) {
          let ids = [...serverData]; // create the copy of state array
          ids[indexq] = questionnaireProm; //new value
          setServerData(ids);
        } else {
          setServerData((prevState) => [...prevState, questionnaireProm]);
        }
        console.log("serverData" + serverData);
        console.log(questionnaireProm);
        setAnswers1([
          {
            answer_id: "",
            answer_text: "",
            ans_type: "",
            status: "",
            q_id: "",
          },
        ]); //ok
        setCounter("");
        // questionnaireProm = {};
        setCheckedUsersIds([]);
        setResponses([]);
        setType([]);
        setProgramType("");
        setStatusQuestion("");
        setQuestionId("");
        questionInputRef.current.value = "";
        setCheckic(true);
        maxAnsRef.current.value = 0;
        setIsValidYesNo(false);
        setMaxAnswers(0);
        setReset((prevState) => !prevState);
      } else {
        console.log("nema");
      }
    }
  };
  const incrementCount = (e) => {
    e.preventDefault();
    // setMaxAnswers(maxAnsRef.current.value);
    if (parseInt(maxAnsRef.current.value) < 99) {
      console.log("dasdas " + maxAnsRef.current.value);
      setMaxAnswers(parseInt(maxAnsRef.current.value) + 1);
    }
  };
  const decrementCount = (e) => {
    e.preventDefault();
    if (maxAnswers <= 0) {
      console.log("JE L USO");
      setMaxAnswers(0);
    } else {
      setMaxAnswers(maxAnswers - 1);
    }
  };
  const validateCounter = (e) => {
    e.preventDefault();

    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      if (parseInt(e.target.value) < 99 || e.target.value === "") {
        setMaxAnswers(e.target.value);
      }
      // this.setState({value: e.target.value})
    }
  };

  const addSelect = (e) => {
    e.preventDefault();

    let selectValues = {};
    // const types = e.target.elements;
    const selectFields = e.target.elements;
    const selectFields2 = e.target.elements;
    for (let i = 0; i < selectFields.length; i++) {
      if (selectFields[i].nodeName === "SELECT") {
        selectValues = {
          ...selectValues,
          [selectFields[i].name]: selectFields[i].value,
        };
      }
    }
    setSelectOptionValues(selectValues);
  };
  useEffect(() => {
    for (var key in selectOptionValues) {
      if (selectOptionValues.hasOwnProperty(key)) {
        type.push(selectOptionValues[key]);
      }
    }
    addQuestionHandler();
  }, [selectOptionValues]);

  const removeQuestionHandler = (e, index) => {
    e.preventDefault();
    let id = e.target.id;
    console.log("id " + id);
    let lists = [...serverData];
    let removeQuestion = lists.at(index);
    if (removeQuestion.question_id != "") {
      lists[index].status = "D";
    } else {
      lists.splice(index, 1);
    }
    setServerData(lists);
  };

  const editQuestionHandler = (e, index, seqNumber, check) => {
    e.preventDefault();
    setIndexQ(index);
    let id = e.target.id;
    let pitanje = "";
    let pitanjeId = "";
    let brojOdgovora = "";
    let status = "";
    let answer = [];
    let number = 0;
    setIsValidYesNo(check);

    setModeQuestion(1);
    setCounter(seqNumber);

    serverData.map((quest) => {
      console.log(quest);
      console.log(quest.seq_number);
      console.log(seqNumber);
      if (quest.question_id === id && id != "") {
        pitanje = quest.question_text;
        pitanjeId = quest.question_id;
        brojOdgovora = quest.max_ans;
        number = quest.seq_number;
        status = "U";

        answer.push(quest.ma.filter((q) => q.q_id.toLowerCase().includes(id)));
      } else if (quest.seq_number === seqNumber) {
        console.log("question_text 123 " + quest.question_text);

        pitanje = quest.question_text;
        pitanjeId = quest.question_id;
        brojOdgovora = quest.max_ans;
        number = quest.seq_number;
        status = "";
        answer.push(
          quest.ma.filter((q) => q.seq_number_question === seqNumber)
        ); //can't include 'cause it's a number
      }
    });
    let answerInput = [];
    setStatusQuestion(status);
    setSeqNumber((prevNumber) => [...prevNumber, number]);
    setAnswers1(answer[0]);
    setQuestionId(pitanjeId);
    setMaxAnswers(brojOdgovora);
    questionInputRef.current.value = pitanje;
    setReset((ans) => !ans);
  };
  const resetHandler = () => {
    questionInputRef.current.value = "";
    setMaxAnswers(0);
    setAnswers1([
      {
        answer_id: "",
        answer_text: "",
        ans_type: "",
        status: "",
        seq_number_question: "",
        q_id: "",
      },
    ]); //ok
    setPollName("");
    setPollId("");
    qInputRefic.current.value = "";
    setServerData([]);
    setIsValidYesNo([]);
    setReset((ans) => !ans);
    setMode(0);
    setSeqNumber([]);
  };

  const modalFormHandler = () => {
    setModalForm(false);
    
  }
  const modalFormErrorHandler = () => {
    setModalFormError(false);
    
  }
  const approvedFormHandler = (approve) => {
    setModalForm(false);
    if(approve){
      socket?.emit(
        "delete_poll",
        { p_id_poll: sendIdPoll },
        function (dataFromServer) {
          console.log("dataFromServer delete_poll");
          console.log(dataFromServer);
          if (dataFromServer === "ok") {
            console.log("Uspesno ste obrisali anketu");
            setCheckRemove(false);
          }else if (dataFromServer === "nok"){
            setModalFormError(true);
            
            setCheckRemove(false);
          }
        }
      );
      refreshPolls();
    }
  }

  return (
    <Sidebar>
      {visible && (
        <div>
          <div className={styles.container}>
            {/* zavrsen boxPreview sa delete i edit pozivanjem*/}
            <div className={styles.boxPreview}>
              <input
                type="text"
                required
                className={styles.searchPoll}
                id="poll"
                name="poll"
                placeholder="Unesite pretragu..."
                autoComplete="off"
                // onChange={(e) => setQuery(e.target.value)}
                onChange={(e) => (setQuery(e.target.value) || e.target.value.length >= 3 ? setShow(true) : setShow(false))}
              />
              <button className={`${show === true ? styles.clearinput : styles.clearinputhide}`} type="button" onClick={clearHandlerGroup}></button>
              <div className={styles.boxforUsers}>
                {quests ? (
                  quests
                    .filter((q) => q.name.toLowerCase().includes(query.toLowerCase()))
                    .map((q) => (
                      <div key={q.data_id} className={styles.forgetBtnsPoll}>
                        <div className={styles.plots}>{q.name}</div>
                        <div className={styles.btns}>
                          <button
                            className={styles.btnAdminView}
                            id={q.data_id}
                            onClick={editPollHandler}
                          >
                            <img src={previewImg} className={styles.previewicon} onClick={editPollHandler} id={q.data_id}/>
                          </button>
                          <button
                            className={styles.btnAdminRemove1}
                            id={q.data_id}
                            onClick={openHandler}
                          >
                            <img src={trashImg} className={styles.trash1icon} onClick={openHandler} id={q.data_id}/>
                          </button>
                        </div>
                      </div>
                    ))
                ) : (
                  <p>Nema anketa ccc</p>
                )}
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.content}>
                <LayoutBox>

                <form
                  action="#"
                  method="post"
                  id="addforma"
                  onSubmit={addSelect}
                >
                  <div className={styles.titleOfForm}>
                    <img src={GIRLogo} className={styles.log} alt="" />
                    <h2>Anketa</h2>
                  </div>
                  {mode == 1 ? (
                    <input
                      type="text"
                      required
                      ref={qInputRefic}
                      value={pollName}
                      className={styles["input-box"]}
                      id={pollId}
                      placeholder="Unesite naziv ankete..."
                      onChange={inputChangeHandlerQuestion}
                      autoComplete="off"
                    />
                  ) : (
                    <input
                      type="text"
                      required
                      ref={qInputRefic}
                      className={styles["input-box"]}
                      id="grupa"
                      name="grupa"
                      placeholder="Unesite naziv ankete..."
                      onChange={inputChangeHandlerQuestion}
                      autoComplete="off"
                    />
                  )}
                  <div className={`${styles.yesNo} `}>
                    
                    <textarea
                      type="text"
                      rows={50}
                      cols={96}
                      id={questionId}
                      ref={questionInputRef}
                      onChange={inputChangeHandlerQuestions}
                      className={styles["input-box-textarea"]}
                      placeholder="Unesite pitanje..."
                    />
                    <div className={styles.questions}>
                      <label htmlFor="maxBroj">
                        Unesite maksimalni broj odgovora:
                      </label>
                      <button onClick={decrementCount} className={styles.minus}>
                        -
                      </button>

                      <input
                        type="text"
                        pattern="[0-9]"
                        ref={maxAnsRef}
                        onChange={validateCounter}
                        value={maxAnswers}
                        min="0"
                        max="99"
                        className={styles["input-box-maxAnswer"]}
                      />

                      <button onClick={incrementCount} className={styles.plus}>
                        +
                      </button>
                    </div>

                    {mode == 0 ? (
                      <div>
                        {answers1.map((ans, index) => (
                          <div className={styles.responses} key={index}>
                            <SelectOption
                              type={ans?.ans_type ?? 0}
                              reset={reset}
                              key={index}
                              name={index}
                            />
                            <input
                              type="text"
                              id={ans.answer_id}
                              name="answer"
                              placeholder="Unesite odgovor..."
                              className={styles["input-box-input"]}
                              value={ans.answer_text}
                              autoComplete="off"
                              onChange={(e) => changeHandler(e, index)}
                            />

                            <button
                              type="button"
                              className={styles.plus}
                              onClick={addHandler}
                            >
                              +
                            </button>
                            <button
                              type="button"
                              className={styles.minus}
                              onClick={() => removeHandler(index)}
                            >
                              -
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>
                        {answers1 ? (
                          answers1.map((ans, index) => (
                            <div
                              className={`${
                                ans.status === "D"
                                  ? styles.remove
                                  : styles.responses
                              }`}
                              key={index}
                            >
                              <SelectOption
                                type={ans.ans_type ? ans.ans_type : 0}
                                reset={reset}
                                key={index}
                                name={index}
                              />
                              <input
                                type="text"
                                id={ans.answer_id}
                                name="answer"
                                placeholder="Unesite odgovor..."
                                className={styles["input-box-input"]}
                                value={ans.answer_text}
                                autoComplete="off"
                                onChange={(e) => changeHandler(e, index)}
                              />

                              <button
                                type="button"
                                className={styles.plus}
                                onClick={addHandler}
                              >
                                +
                              </button>
                              <button
                                type="button"
                                className={styles.minus}
                                onClick={() => removeHandler(index)}
                              >
                                -
                              </button>
                            </div>
                          ))
                        ) : (
                          <p>Nema nista</p>
                        )}
                      </div>
                    )}
                    <button type="submit" id="add" className={styles.add}>
                      Sačuvaj pitanje
                    </button>
                  </div>
                </form>

                <form action="#" method="post" onSubmit={submitHandler}>
                  <div className={styles.QuestionnaireDiv}>
                    {serverData ? (
                      serverData.map((quest, index) => (
                        <div
                          className={`${
                            quest.status === "D"
                              ? styles.remove
                              : styles.boxOfQuestion
                          }`}
                          key={index}
                        >
                          <div className={styles.content}>
                            <div className={styles.design}>
                            <div className={styles.firstPart}>
                              <div className={styles.Question}>
                                {quest.question_text}
                              </div>
                              {quest.ma.map((ans, index) => (
                                <div className={styles.forget} key={index}>
                                  <span
                                    className={`${
                                      ans.status === "D"
                                        ? styles.remove
                                        : styles.answerOfQuestion
                                    }`}
                                  >
                                    {
                                      ans.status != "D" && (
                                        <p
                                          id={
                                            ans.answer_id ? ans.answer_id : ""
                                          }
                                          name={ans.status}
                                        >
                                          {ans.answer_text
                                            ? ans.answer_text
                                            : ""}
                                        </p>
                                      )
                                    }
                                  </span>
                                </div>
                              ))}
                              
                            </div>
                            <div className={styles.btns2}>
                                <div
                                  className={styles.btnAdminEdit}
                                  id={quest.question_id}
                                  onClick={(e) =>
                                    editQuestionHandler(
                                      e,
                                      index,
                                      quest.seq_number,
                                      true
                                    )
                                  }
                                >
                                  <img src={editImg} className={styles.editicon}  onClick={(e) =>
                                    editQuestionHandler(
                                      e,
                                      index,
                                      quest.seq_number,
                                      true
                                    )
                                  }  id={quest.question_id} />
                                </div>
                                <div
                                  className={styles.btnAdminRemove}
                                  id={quest.question_id}
                                  onClick={(e) =>
                                    removeQuestionHandler(e, index)
                                  }
                                >
                                  <img src={trashImg} className={styles.editicon} onClick={(e) =>
                                    removeQuestionHandler(e, index)
                                  }  id={quest.question_id} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>nnn</p>
                    )}
                  </div>
                  <button className={styles.btnAdminSave} type="submit">
                    {mode === 0 ? "Sačuvaj" : "Sačuvaj promene"}
                  </button>
                  <button
                    className={styles.btnAdminReset}
                    onClick={resetHandler}
                    type="reset"
                  >
                    Restart
                  </button>
                </form>
                </LayoutBox>
              </div>
            </div>
          </div>
        </div>
      )}
   
        {modalForm && 
        <BackdropGroup
          onConfirm={modalFormHandler}
          onApprove={approvedFormHandler}
          check={true}
          title="Da li želite da obrišite anketu?" 
          />
      }
        {modalFormError && 
        <BackdropGroup
          onConfirm={modalFormErrorHandler}
          onApprove={approvedFormHandler}
          check={false}
          title="Korisnik je već odgovorio na ovu anketu!" 
          />
      }
    </Sidebar>
  );
};
export default CreateSurvey;
