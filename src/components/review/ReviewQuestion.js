import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import "../review/ReviewQuestion.css";
import GIRLogo from "../../img/logo.png";
import UserApi from "../../context/UserApi";
import FormQuestion from "./form/FormQuestion";
import { FaUsers } from "react-icons/fa";
import BackdropGroup from "../admin/groups/BackdropGroup";
import Spinner from "../UI/Spinner";

const ReviewQuestion = ({ socket }) => {
  const [checkedUsersIds, setCheckedUsersIds] = useState([]);
  // const [serverData, setServerData] = useState([{que_id:"",ans_id:""}]);
  const [serverData, setServerData] = useState([]);
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [polls, setPolls] = useState([]);
  const [answers1, setAnswers1] = useState({});
  const [responses, setResponses] = useState([]);
  const [responses2, setResponses2] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [selected, setSelected] = useState("");
  const [input, setInput] = useState(0);
  const [quests, setQuests] = useState([]);
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [selectOptionValues, setSelectOptionValues] = useState([]);
  const [selectOptionIds, setSelectOptionIds] = useState({});
  const [itWorks, setItWorks] = useState(false);
  const [itWorksId, setItWorksId] = useState("");
  const [itText, setItText] = useState([]);
  const ansRef = useRef();
  const [converts, setConverts] = useState({});

  useEffect(() => {
    if (quests.length > 0) {
      setIsLoading(false);
      console.log("SADASDASDA");
    }
  }, [quests]);
  const populatePollItem = () => {
    socket?.emit(
      "get_poll_questions_and_answers",
      { poll_id: id },
      function (dataFromServer) {
        setTimeout(() => {
          if (dataFromServer.length > 0) {
            console.log(dataFromServer);
            setIsLoading(false);
            
            setQuests(JSON.parse(dataFromServer));
          }
        }, 2000);
      }
    );
  };
  useEffect(() => {
    populatePollItem();
  }, []);

  useEffect(() => {
    console.log("quests");
    console.log(quests);
  }, [quests])
  


  function plusSlides() {
    console.log(count, questions.length);
    if (count < quests.qa.length - 1) {
      setCount((count) => count + 1);
    }
    console.log("kolima ima responses " + responses.length);
  }
  function minusSlides() {
    console.log(count, questions.length);
    if (count > 0) {
      setCount((count) => count - 1);
    }
    console.log("kolima ima responses " + responses.length);
  }

  const [openModalPoll, setOpenModalPoll] = useState(false);
  function sendQuestionaire() {
    setOpenModalPoll(false);

    socket?.emit("add_poll_user_answer", converts, function (dataFromServer) {
      // socket?.emit("add_poll_user_answer", { p_user_id:window.name,ans_text: questionnaire }, function (dataFromServer) {
      console.log(dataFromServer);
      if (dataFromServer === "ok") {
        let message = "Uspešno snimljena anketa";
        console.log(message);
        setName(message);

        setTimeout(() => {
          setName("");
        }, 2000);
        populatePollItem();
        //   navigate("/anketa/" + id);
        setConverts({});
      }
    });
  }
  const modalHandler = () => {
    let check = 0;

    for (let index = 0; index < quests.qa.length; index++) {
      if (quests.qa[index].answered) {
        check++;
      }
    }
    if (check !== quests.qa.length) {
      setOpenModalPoll(true);
    }
  };

  const read = (e) => {
    e.preventDefault();
    const form = e.target;
    const formElements = form.elements;

    const convert = {
      p_user_id: quests.user_id,
      answers: [],
    };

    function getFreeFormAnswer(elements, id) {
      for (let i = 0; i < elements.length; i++) {
        const elem = elements[i];
        if (elem.type === "text" && elem.dataset.answerId === id) {
          return elem.value;
        }
      }
      return "NULL";
    }

    if (form.length > 0) {
      for (let i = 0; i < form.length; i++) {
        const elem = formElements[i];
        if (elem.dataset.checked == null){

        if (elem.type === "radio" && elem.checked) {
          convert.answers.push({
            p_answer_id: elem.dataset.answerId,
            p_answer_text:
              elem.dataset.answerType === "2"
                ? getFreeFormAnswer(formElements, elem.dataset.answerId)
                : elem.value,
          });
        }else if(elem.type === "checkbox" && elem.checked){
          convert.answers.push({
            p_answer_id: elem.dataset.answerId,
            // p_answer_id: checkedUsersIds[i],
            p_answer_text:elem.value
          });
        }
      }
    }

    }

    console.log(convert);
    setConverts(convert);
    if (convert.answers.length > 0){
      modalHandler();
    }else{
      setOpenModalPoll(true);
    }

  };

  const onChangeQuestionAnswer = (e, id) => {
    console.log(document.getElementById(id));
    document.getElementById(id).checked = true;
  };
  useEffect(() => {
    console.log("checkedUsersIds");
    console.log(checkedUsersIds);
  }, [checkedUsersIds])
  
  const checkUsers = (e,maxAnswer,ans_question_id) => {
    let promArray = [...serverData];
    // console.log("cekirano je"+e.target.checked)
    if (e.target.checked) {
      if (promArray.length === 0){
        for (let index = 0; index < quests.qa.length; index++) {
          const element = quests.qa[index].question_id;
          if(ans_question_id === element){
            let prom = quests.qa[index].answers.find((ans) => ans.answer_id == e.target.id);
            setCheckedUsersIds([...checkedUsersIds, prom.answer_id]);
            promArray = [{que_id:prom.question_id,ans_id:prom.answer_id}];
      
            setServerData(promArray);
          }
        }
      }else{
      let arrau = promArray.filter((prom)=>(prom.que_id.includes(ans_question_id)));
      
      if (arrau.length < maxAnswer) {
        for (let index = 0; index < quests.qa.length; index++) {
          const element = quests.qa[index].question_id;
          if(ans_question_id === element){
            let prom = quests.qa[index].answers.find((ans) => ans.answer_id == e.target.id);
            setCheckedUsersIds([...checkedUsersIds, prom.answer_id]);
            promArray = [...serverData, {que_id:prom.question_id,ans_id:prom.answer_id}];
    
            setServerData(promArray);
          }
        }
      }
    }
    } else {
      setCheckedUsersIds(checkedUsersIds.filter((user) => user != e.target.id));
      promArray.splice(serverData.indexOf(e.target.id), 1);
      setServerData(promArray);
    }
  };
  const modalFormHandler = () => {
     setOpenModalPoll(false);
  }
  return (
    <div className="containerReview">
      {isLoading ? (
        // <section>
        //   <p>Molimo sačekajte...</p>
        // </section>
        <Spinner style="containerloader"/>
      ) : (
        <div className="boxContainerReview">
          <div className="row">
            <div className="col-sm-12 title_logo">
              <img className="logoCompany" src={GIRLogo} />
              <h4 className="survey_title">Anketa</h4>
            </div>
          </div>
          <form onSubmit={read}>
             {/* {quests.map(question) => (
              
            )} 
            {quests.qa.map((question,i) =>
             {question.answers.map((ans,j) =>
             {count === i ?
             {count == i ? 
              <div className={(question.answered && count === i) ? "leftAlignHide" : "leftAlign"}>
               <div className={`${(count === i && question.answered) || (count !== i && question.answered) ? "leftAlignHide" : "leftAlign"}`}>
               <div className={`leftAlign ${count !== i ?  "leftAlignHide": ""}`}> 
               <div className={count === i && question.answered ? "leftAlignHide" : "leftAlign"}> */}
               {name ? null:
               <div className="leftAlign">
            {/* {name ? null : ( //ovo nece trebati ako proveravam sta je odgovoreno visible and hide na osnovu odgovorenih pitanja */}
            
              <div className="row">
                <div className="col-sm-12">
                  {/* <button className="nextbtn"  onClick={modalHandler}></button> */}
                  <button className="nextbtn" type="submit">Sačuvaj</button>
                  {/* <button className="nextbtn" onClick={submitHandler}>Sačuvaj</button> */}

                  {/* {openModalPoll && <ModalPoll closeModalPoll={setOpenModalPoll} />} */}
                {/* </div> */}
                {/* <div className="col-sm-6 rightAlign"> */}
                  {/* <button type="button" className="quitbtn">Odustani</button> */}
                </div>
              </div>
             
            {/* )} */}
            </div>
            }
             {/* : ""}
           : ""} */}
             {/* )} */}
             {/* )} */}
             {!name ?
            <div className="row">
              <div className="col-sm-12 survey_title_margin">
                <h5 className="survey_name" id={quests.poll_id}>
                  {quests.poll}
                  <p className="rightPagination">
                    {count + 1} / {quests.qa.length}
                  </p>
                </h5>
              </div>
            </div>
            :null}
            {name ? (
              <p className="survey_name">{name}</p> /////////////////////////////////////////
            ) : (
              <div className="row">
                <div className="col-sm-12 cssForColumn">
                  <div className="boxContainerForAnswersAndQuestions">
                    <div className="row">
                      <div className="col-sm-12">
                        {quests.qa.map((question, index) => (
                          <div
                            className={`divQuestionAnswer ${
                              count !== index ? "mySlides" : ""
                            }`}
                          >
                            {/* // <div className={name} > */}
                            <div
                              className={`${
                                question.answered ? "disabledDiv" : "row"
                              }`}
                            >
                              <div className="col-sm-12">
                                <h5
                                  className="Question"
                                  id={question.question_id}
                                >
                                  {question.question_text}
                                </h5>
                              </div>
                            </div>
                            <div
                              className={`${
                                question.answered ? "disabledDiv" : ""
                              }`}
                            >
                              {question.answers.map((ans, aindex) => (
                                <div key={aindex}>
                                  {ans.question_text ===
                                  question.question_text ? (
                                    <div
                                      className={`${
                                        quests.user_id ===
                                          ans.poll_user_answer_user_id &&
                                        ans.poll_user_answer_id !== null
                                          ? "row ansSpace"
                                          : "row radioinputs_space"
                                      }`}
                                    >
                                      <div className="col-sm-1 radioinputsmargin">
                                        {/* <input type="radio" name="fav_language"></input> */}
                                        {
                                          ans.poll_user_answer_id != null ? (
                                            <input
                                              type={
                                                question.max_ans > 1
                                                  ? "checkbox"
                                                  : "radio"
                                              }
                                              id={ans.answer_id}
                                              name={`${question.question_id}`}
                                              value={
                                                ans.poll_user_answer_text
                                                  ? ans.poll_user_answer_text
                                                  : ans.answer_text
                                              }
                                              data-position={ans.answer_type}
                                              data-checked={ans.poll_user_answer_id}
                                              title={ans.answer_type}
                                              defaultChecked
                                              // {(ans.answer_text == 'ok' ? {onClick: () => {inputChangeHandler()}}:'')}
                                              // onClick={ans.answer_text === 'ok'?InputAppearHandler():''}
                                              // onClick={ans.answer_text === 'ok'?alert('tacno'):alert('netacno')}
                                            />
                                          ) : (
                                            <div>
                                              {question.max_ans > 1 && (
                                                    <input
                                                      type="checkbox"
                                                      id={ans.answer_id}
                                                      name={`${question.question_id}`}
                                                      value={
                                                        ans.poll_user_answer_text
                                                          ? ans.poll_user_answer_text
                                                          : ans.answer_text
                                                      }
                                                      data-answer-id={ans.answer_id}
                                                      onChange={(e) =>
                                                        checkUsers(e,question.max_ans,ans.question_id)
                                                      }
                                                      checked={checkedUsersIds.includes(ans.answer_id)}
                                                    />
                                              )}

                                              {question.max_ans === 1 && (
                                                <input
                                                  type="radio"
                                                  id={ans.answer_id}
                                                  name={`${question.question_id}`}
                                                  data-answer-id={ans.answer_id}
                                                  data-answer-type={
                                                    ans.answer_type
                                                  } //1 ili 2
                                                  value={
                                                    ans.poll_user_answer_text
                                                      ? ans.poll_user_answer_text
                                                      : ans.answer_text
                                                  }
                                                  data-position={
                                                    ans.answer_type
                                                  }
                                                  title={ans.answer_type}
                                                />
                                              )}
                                            </div>
                                          )

                                        }
                                       
                                      </div>
                                      <div
                                        id="myDIV"
                                        className="col-sm-11 mediaforthiscolumn"
                                      >
                                        {ans.answer_type === 2 ? (
                                          <input
                                            type="text"
                                            className={`textboxforanswer`}
                                            name={`${question.question_id}`}
                                            data-answer-id={ans.answer_id}
                                            autoComplete="off"
                                            onFocus={(e) => {
                                              onChangeQuestionAnswer(
                                                e,
                                                ans.answer_id
                                              );
                                            }}
                                            placeholder={
                                              ans.poll_user_answer_text
                                                ? ans.poll_user_answer_text
                                                : ans.answer_text
                                            }
                                          />
                                        ) : (
                                          <h6 id="enterAnswer">
                                            {ans.poll_user_answer_text
                                              ? ans.poll_user_answer_text
                                              : ans.answer_text}
                                          </h6>
                                        )}
                                      </div>
                                    </div>
                                  ) : null}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>

          {name ? null : (
            <div className="row">
              {count > 0 ? (
                <div className="col-sm-6 leftbtn">
                  <button className="nextbtn" onClick={minusSlides}>
                    &laquo;Prethodno
                  </button>
                </div>
              ) : (
                <div className="col-sm-6"></div>
              )}
              {count < quests.qa.length - 1 && (
                <div className="col-sm-6 rightbtn">
                  <button className="nextbtn" onClick={plusSlides}>
                    Sledeće &raquo;
                  </button>
                </div>
              )}
            </div>
          )}

          {/* {count > 0
                ? <div className='row'>
                    <div className='col-sm-12'>
                        <button className="prevBtn" onClick={minusSlides} >Prethodno &raquo;</button>
                    </div>
                </div>
                :<div className='row'>
                    
               
                     </div>} */}
        </div>
      )}
      {/* <div className='row'>
                <div className='col-sm-12'>
                     <button className="confirmbtn" onClick={() => {
                        setOpenModalPoll(true);
                     }}>Snimi</button>
                     
                </div>
            </div> */}
      {/* {openModalPoll && <ModalPoll closeModalPoll={setOpenModalPoll} />} */}
      {openModalPoll && converts.answers.length > 0 ? (
       
        <BackdropGroup
          onConfirm={modalFormHandler}
          onApprove={sendQuestionaire}
          check={true} 
          title="Da li ste sigurni da li želite da sačuvate anketu?"
        />
      ) : openModalPoll && converts.answers.length === 0 ?  (
        <BackdropGroup
          onConfirm={modalFormHandler}
          onApprove={sendQuestionaire}
          check={false} 
          title="Niste odgovorili ni na jedno pitanje"
        />)
        : null
      }
       {/* {openModalPoll && (
        <ModalPoll
          closeModalPoll={setOpenModalPoll}
          continueToSend={sendQuestionaire}
        />
      )} */}
    </div>
  );
};

export default ReviewQuestion;
