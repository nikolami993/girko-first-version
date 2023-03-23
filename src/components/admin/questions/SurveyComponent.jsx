

import React from "react";
import {StylesManager, Model} from "survey-core";
import {Survey} from "survey-react-ui";
import "survey-core/defaultV2.css";
// import "./index.css";
import {json} from "./json"
import { useState } from "react";
import { useEffect } from "react";
StylesManager.applyTheme("defaultV2");
function SurveyComponent({socket}) {
   
    const [name, setName] = useState("");
    const [count, setCount] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [polls, setPolls] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [responses, setResponses] = useState([]);
    const [responses2, setResponses2] = useState([]);
    const [isShown, setIsShown] = useState(false);
    const [selected, setSelected] = useState("");


    useEffect(() => {
        socket?.emit("get_poll_questions_and_answers", { poll_id: '98a60b49-6a7a-11ed-ae4d-000c29c980ba' }, function (dataFromServer) {
            setQuestions([...new Set(dataFromServer.map(item => item.pitanje))]);
            setPolls([...new Set(dataFromServer.map(item => item.anketa))]);
            setAnswers([...new Map(dataFromServer.map(item => [item['odgovor'], item])).values()]);
        });
    }, []);
//   const survey = new Model(answers);
  const survey = new Model(json);
//   survey.showProgressBar = 'bottom';
  
  return (<Survey model={survey}/>);
}
export default SurveyComponent;

