import React, { useEffect, useState, useCallback } from 'react'
import Typewriter from 'typewriter-effect';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {
    useSpeechSynthesis,
} from 'react-speech-kit';
import { QuestionsService } from '../services';
import { useTimer } from 'react-timer-hook';

export default function Session() {
    const [questionWriter, setQuestionWriter] = useState(null);
    const [question, setQuestion] = useState("");
    const [instructions, setInstructions] = useState("Try to be brief and factual. If you do not know exact age, does not matter, give appx number as the age. Example: I am 45 years old or Patient is about 34 years old.");
    const [instructionWriter, setInstructionWriter] = useState(null);
    const [apiData, setAPIDate] = useState({})

    //Timer Duration
    const [timerDuration, setTimerDuration] = useState(10);

    const { seconds, start, pause, restart, isRunning: isTimerRunning } = MyTimer({ expiryTimestamp: Date.now() + (timerDuration * 1000) });
    useEffect(() => {
        getQuestions();
        pause()
    }, []);

    useEffect(() => {
        if (isTimerRunning) {
        } else {
            SpeechRecognition.stopListening()
        }
    }, [isTimerRunning])


    const getQuestions = async () => {
        const data = await QuestionsService.getQuestions();
        if (data.question) {
            setQuestion(data.question.text);
            setAPIDate(data)
        }
        if (data.sessionId) {
            localStorage.setItem("sessionId", data.sessionId)
        }
    };

    const submitQuestion = async () => {
        resetTranscript()
        if (patientAnswer === "") {
            return
        }
        let sId = localStorage.getItem('sessionId');
        if (!sId) {
            window.alert("No Id Found");
        }
        const reqData = {
            currentQuestionCode: apiData.question.code,
            textResponse: patientAnswer,
            sessionId: sId
        }
        const data = await QuestionsService.getQuestions(reqData);
        if (data.question) {
            setPatientAnswer("")
            setQuestion(data.question.text);
            setAPIDate(data)
            // setTimeout(() => {
            //     restart(Date.now() + (timerDuration * 1000))
            // }, 2000)
        }
    };



    const { voices } = useSpeechSynthesis();

    const speak = ({ text, onEnd }) => {
        const speakObj = new SpeechSynthesisUtterance()
        speakObj.text = text;
        speakObj.voice = voices.filter(function (voice) {
            return voice.name == "Google UK English Female"
        })[0];
        speakObj.onend = onEnd
        window.speechSynthesis.speak(speakObj)
    }


    const [patientAnswer, setPatientAnswer] = useState();
    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })
    }

    const { transcript, browserSupportsSpeechRecognition, listening, resetTranscript } = useSpeechRecognition();
    useEffect(() => {
        setPatientAnswer(transcript)
    }, [transcript])




    if (!browserSupportsSpeechRecognition) {
        return null
    }



    return (
        <>
            <div id="startSession1">
                <div className="container my-3">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card shadow-sm ">
                                <div className="card-body p-4" id="submit-form">
                                    <div className="">
                                        <h5 className="mb-2 text-info">Instruction</h5>
                                        <p className="border border-info p-2 rounded" id="chat1">
                                            <Typewriter
                                                onInit={(typewriter) => {
                                                    setInstructionWriter(typewriter)
                                                    typewriter.typeString(instructions)
                                                        .start()
                                                }}
                                                options={{
                                                    delay: 8,
                                                    cursor: ""
                                                }}
                                            />
                                        </p>
                                    </div>
                                    <div className="">
                                        <h5 className="mb-2 text-warning">Question</h5>
                                        <div id="typewriter">
                                            <p id="text" className="border border-warning p-2 rounded">
                                                <Typewriter
                                                    onInit={(typewriter) => {
                                                        if (question !== "") {

                                                            setQuestionWriter(typewriter)
                                                            console.log("In Process", question)
                                                            typewriter.typeString(question)
                                                                .start().callFunction(() => {
                                                                    speak({
                                                                        text: question,
                                                                        onEnd: () => {
                                                                            restart(Date.now() + (timerDuration * 1000))
                                                                            startListening();
                                                                        }
                                                                    })
                                                                })
                                                        }
                                                    }}
                                                    key={question}
                                                    options={{
                                                        delay: 8,
                                                        cursor: ""
                                                    }}
                                                />
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-10">
                                            <div className="">
                                                <h5 className="mb-2 text-primary">Answer
                                                    <small>
                                                        <span id="speakshow">(Try to Speak out your response)</span>
                                                        <span id="textshow" style={{ display: "none" }}>(Type your response
                                                            below)</span>
                                                    </small>
                                                </h5>
                                                {/* Todo - Text area */}
                                                <div style={{ minHeight: "50px" }} className="form-control border-primary p-2 rounded mb-0 bg-white"
                                                    id="chat3" readOnly>
                                                    <span id="textshow">{patientAnswer}</span>
                                                </div>
                                                <div className="py-2 text-end">
                                                    <button type="button" className="btn btn-primary btn-sm"
                                                        id="editButton">Edit</button>
                                                    <button onClick={submitQuestion} disabled={isTimerRunning} type="button" className="btn btn-success btn-sm" id="submit-button">
                                                        Submit
                                                    </button>
                                                    <button type="button" className="btn btn-success btn-sm" id="loader"
                                                        style={{ display: "none" }}>
                                                        <span className="spinner-border spinner-border-sm" role="status"
                                                            aria-hidden="true"></span>
                                                        Processing...
                                                    </button>
                                                    <button type="button" className="btn btn-danger btn-sm">Discard</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <h5 className="mb-2 text-dark">Timer</h5>
                                            <div className="text-center shadow-sm pb-2 border-dark border rounded">
                                                <div id="timer" className="fw-bold lead">{seconds}</div>
                                                <div className="d-flex align-items-center justify-content-evenly pt-1">
                                                    <button id="startButton" className="py-0 btn btn-sm btn-primary"
                                                    >
                                                        <i className="fa-solid fa-play"></i></button>
                                                    <button id="stopButton" className="py-0 btn btn-sm btn-danger"
                                                        style={{ display: "none" }}
                                                    >
                                                        <i
                                                            className="fa-solid fa-stop"></i></button>
                                                    <button id="addTimeButton" className="py-0 btn btn-sm btn-dark"
                                                        style={{ display: "none" }}
                                                    ><i
                                                        className="fa-solid fa-stopwatch-20"></i></button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card shadow-sm ">
                                <div className="card-body">
                                    <div className="row d-flex justify-content-between align-items-center">
                                        <div className="col-md-12">
                                            <div className="row mb-2">
                                                <div className="col-12">
                                                    <div className="progress" style={{ height: "4px" }}>
                                                        <div className="progress-bar progress-bar-striped progress-bar-animated"
                                                            role="progressbar" aria-valuenow="16" aria-valuemin="0"
                                                            aria-valuemax="100" style={{ width: "16%" }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="row gx-1 text-center text-white flex-nowrap overflow-auto pb-2  issuebox">
                                                <div className="col">
                                                    <div className="card bg-success">
                                                        <div className="card-body">
                                                            <h6 className="card-subtitle">Dementia</h6>
                                                            <p className="card-text">&nbsp;</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card bg-primary">
                                                        <div className="card-body">
                                                            <h6 className="card-subtitle">Anxiety</h6>
                                                            <p className="card-text">&nbsp;</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card bg-secondary">
                                                        <div className="card-body">
                                                            <h6 className="card-subtitle">Depression</h6>
                                                            <p className="card-text">&nbsp;</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card bg-secondary">
                                                        <div className="card-body">
                                                            <h6 className="card-subtitle">Psychotic</h6>
                                                            <p className="card-text">&nbsp;</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card bg-secondary">
                                                        <div className="card-body">
                                                            <h6 className="card-subtitle">Lorem</h6>
                                                            <p className="card-text">&nbsp;</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card bg-secondary">
                                                        <div className="card-body">
                                                            <h6 className="card-subtitle">Attention</h6>
                                                            <p className="card-text">&nbsp;</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <MyTimer expiryTimestamp={Date.now() + 10000} /> */}
        </>
    )
}


function MyTimer({ expiryTimestamp }) {
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


    return {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    }
}
