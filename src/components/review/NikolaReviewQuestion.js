import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import React from 'react'
import "../review/ReviewQuestion.css";
import GIRLogo from "../../img/logo.png";
const ReviewQuestion = ({ socket }) => {
    const { id } = useParams();
    const [name, setName] = useState([]);
    const [count, setCount] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [polls, setPolls] = useState([]);
    const [answers, setAnswers] = useState([]);
    // const [socket, setSocket] = useState(null);
    let navigate = useNavigate();

    // useEffect(()=>{
    //   setSocket(io("http://girkvweb1.gir.local:8081"));
    // },[]);
    const [isShown, setIsShown] = useState(false);
    // const handleClick = event => {
    //     for (let index = 1; index < questions.length; index++) {
    //          setIsShown(questions[index]);

    //     }

    //   };
    // function initDisplay($btn, $display, array) {
    //     var i = 0;
    //     $btn.addEventListener('click', function() {
    //       $display.innerHTML = array[i++];
    //       if (i >= array.length) i = 0;
    //     });
    //   }
    //   initDisplay(document.querySelector('.nextbtn'),document.querySelector('.Question'),questions)

    useEffect(() => {
        // let proba_pol_id = 'ac0c5b89-6990-11ed-ae4d-000c29c980ba';

        socket?.emit("get_poll_questions_and_answers", { poll_id: id }, function (dataFromServer) {
            console.log(dataFromServer);
            // setQuestions(dataFromServer);

            setQuestions([...new Set(dataFromServer.map(item => item.pitanje))]);
                setPolls([...new Set(dataFromServer.map(item => item.anketa))]);
            // setAnswers([...new Set(dataFromServer.map(item => item.odgovor))]);

            setAnswers([...new Map(dataFromServer.map(item => [item['odgovor'], item])).values()]);

        })
    }, []);



    return (
        <div className="containerReview">
            <div className="boxContainerReview">
                <div className="row">
                    <div className="col-sm-12 naslov_logo">
                        <img className="logoKompanije" src={GIRLogo} />
                        <h4 className="naslovAnkete">Anketa</h4>
                    </div>
                </div>
                {polls.map((poll) => (
                    <div className="row">
                        <div className="col-sm-12 nazivanketemargin">
                            <h5 className="nazivankete">{poll}</h5>
                        </div>
                    </div>
                ))}
                <div className="row">
                    <div className="col-sm-12 cssForColumn">
                        <div className="boxContainerForAnswersAndQuestions">
                            <div className="row">
                            <div className="col-sm-12">
                
                    {questions ? questions.map((q) => (
                        <div>
                            <h5 className="nazivankete">{q}</h5>
                            <div>
                                {answers.map((ans) => (
                                    <div>
                                        {ans.pitanje === q ?
                                            <div className="row radioinputirazmak">
                                                <div className="col-sm-1 radioinputimargin">
                                                    <input type="radio" name="fav_language"></input>
                                                </div>
                                                <div className="col-sm-11 medijazaovukolonu">
                                                    <h6>{ans.odgovor}</h6>
                                                </div>
                                            </div>
                                            : null}
                                    </div>
                                ))}


                            </div>

                        </div>
                    )) : null}

                </div>
                </div>
                </div>
                </div>
                </div>
            </div>
        </div>

    );
}

export default ReviewQuestion;
