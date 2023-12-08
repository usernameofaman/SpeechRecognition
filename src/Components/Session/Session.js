import React, { useEffect, useState, useCallback, useRef } from "react";
import Typewriter from "typewriter-effect";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { CorporateService, QuestionsService } from "../../services";
import { useTimer } from "react-timer-hook";
import { showErrorMessage, showSuccessMessage } from "../../managers/utility";
import '../../App.css'

import {
  detectLanguage,
  translateToEnglish,
} from "./GoogleTranslate/GoogleTranslate";
import "../../App.css";
import { useNavigate } from "react-router-dom";

export default function Session({ useLLM, inputMode }) {
  // const navigate = useNavigate()
  const [question, setQuestion] = useState("");
  const [instructions, setInstructions] = useState("");
  const [apiData, setAPIData] = useState({});
  const [currentLot, setCurrentLot] = useState(0);
  const [answers, setAnswers] = useState(null);
  const [disorderCounts, setDisorderCounts] = useState(null);
  const [submitInProcess, setSubmitInProcess] = useState(false);
  const [listenerState, setListenerState] = useState("NOT_STARTED");
  const [controlsVisible, setControlsVisible] = useState(false)
  const [final, setFinal] = useState([]);
  const [progressBar, setProgressBar] = useState({
    percentage: 3,
    countPerLot: 0,
    prevLot: currentLot,
  });

  const [userData, setUserData] = useState({})

  //Timer Duration
  const [timerDuration, setTimerDuration] = useState(5);

  const [audioElement, setAudioElement] = useState(new Audio());

  const {
    seconds,
    start,
    pause,
    restart,
    isRunning: isTimerRunning,
  } = MyTimer({ expiryTimestamp: Date.now() + 0 * 1000 });


  useEffect(() => {
    getUserDetails()
  }, []);

  useEffect(() => {
    if (userData._id && question === "")
      getQuestions();
  }, [userData]);


  useEffect(() => {
    setProgressBar((prev) => {
      let newPercentage = (100 / 11) * (parseInt(currentLot) + 1);
      if (prev.countPerLot > 4) newPercentage += 100 / 22;
      return {
        prevLot: currentLot,
        percentage: newPercentage,
        countPerLot: prev.currentLot === currentLot ? prev.countPerLot + 1 : 0,
      };
    });
  }, [currentLot]);




  useEffect(() => {
    if (!isTimerRunning && listenerState === "STARTED") {
      setListenerState("ENDED");
      SpeechRecognition.stopListening();
      startWarningMessage()
    }
  }, [isTimerRunning]);


  const [hasWarningProvided, setHasWarningProvided] = useState(false)
  const [didUserStopSubmission, setDidUserStopSubmission] = useState(false)
  const [preventAutoSubmitTimerId, setPreventAutoSubmitTimerId] = useState(null)

  const startWarningMessage = () => {
    if (!hasWarningProvided) {
      if (!((apiData.question.code === "201" || apiData.question.code === "204" || apiData.question.code === "206") && patientAnswer === "")) {
        let restartDuration = Date.now() + 3000;
        restart(restartDuration)
        let timerId = setTimeout(submitQuestion, 3000)
        setPreventAutoSubmitTimerId(timerId)
        setHasWarningProvided(true)
      } else submitQuestion()
    }
  }

  const getUserDetails = async () => {
    let userData = localStorage.getItem('userDetails')
    if (userData) userData = JSON.parse(userData)
    const userDetails = await CorporateService.getCorporateEmployeeDetails(userData._id);
    setUserData(userDetails)
    localStorage.setItem('userDetails', JSON.stringify(userDetails))
  }


  const readInstructions = async () => {
    let restartDuration = 1000
    restart(restartDuration);
    nowReadQuestion()
  };

  const nowReadQuestion = async () => {
    let currentQuestionDuration = 1;
    setAudioElement(async (prev) => {
      try {
        currentQuestionDuration = await getAudioDuration(prev, prev.src);
        prev.play()
      } catch (e) {
        let placeHolderAudio = new Audio('https://demoplayground4093662547.z20.web.core.windows.net/us-en/placeholder.mp3')
        placeHolderAudio.play()
        console.log("Audio Error")
      }

      currentQuestionDuration = parseInt(Math.ceil(currentQuestionDuration)) * 1000
      setTimerDuration((prevTimer) => {
        let gapAfterQuestionSpeaks = 3000;
        let restartDuration = Date.now() + gapAfterQuestionSpeaks + currentQuestionDuration + prevTimer * 1000;
        console.log("Expiry is", restartDuration - Date.now())
        setTimeout(() => {
          restart(restartDuration);
          startListening();
        }, gapAfterQuestionSpeaks + currentQuestionDuration)
        return prevTimer
      })
      return prev
    })
  }

  const getAudioDuration = (audio, url) => {
    return new Promise((resolve, reject) => {
      audio.addEventListener('loadedmetadata', () => {
        resolve(audio.duration);
      });

      audio.addEventListener('error', (error) => {
        console.log(apiData)
        // showErrorMessage("Audio not found for")
        reject(100);
      });

      audio.src = url;
    });
  };


  const [patientAnswer, setPatientAnswer] = useState("");
  const [patientAnswerBox, setPatientAnswerBox] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    enableFieldAndFocus()
  }, [patientAnswerBox])


  const startListening = () => {
    setControlsVisible(true)
    setListenerState("STARTED");
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const {
    transcript,
    browserSupportsSpeechRecognition,
    listening,
    resetTranscript,
  } = useSpeechRecognition();

  // useEffect(() => {
  //     setPatientAnswer(transcript)
  //     // detectLanguage(transcript)
  //     // TRANSLATE - Here user's voice input as text comes in transcript
  //     // 5 Words tak hi API CALL hogi, if More than 5 words
  // }, [transcript])

  useEffect(() => {
    // const words = transcript.split(" ");
    setPatientAnswer(transcript);
    // if (words.length <= 5 && transcript !== "") {
    //   detectLanguage(transcript);
    // }
  }, [transcript]);

  const getQuestions = async () => {
    let sId = localStorage.getItem("sessionId");
    const data = await QuestionsService.getQuestions({
      sessionId: sId,
      refetch: true,
      userId: userData._id,
      userType: userData.type
    });
    if (data.question) {
      setQuestion(data.question.text);
      try {
        setAudioElement(new Audio(`https://demoplayground4093662547.z20.web.core.windows.net/us-en/Code${data.question.code}.mp3`))
      } catch (e) { console.log("Sdf") }
      setTimerDuration(data.question.timer === "HIGH" ? 45 : data.question.timer === "MEDIUM" ? 30 : data.question.timer === "LOW" ? 10 : 5)
      setInstructions(data.question.instructions);
      readInstructions(data.question);
      setAPIData(data);
    } else {
      if (data.message) showErrorMessage(data.message);
    }
    if (data.sessionId) {
      localStorage.setItem("sessionId", data.sessionId);
    }
  };


  const submitQuestion = async (skip) => {
    setHasWarningProvided(false)
    setSubmitInProcess(true);
    resetTranscript();
    if (!skip && (apiData.question.code === "201" || apiData.question.code === "204" || apiData.question.code === "206") && patientAnswer === "") {
      showErrorMessage("Answer Is Required Please Type");
      setPatientAnswerBox(true)
      // enableFieldAndFocus()
      setSubmitInProcess(false);
      return;
    }
    let sId = localStorage.getItem("sessionId");
    if (!sId) {
    }

    let translatedText
    const reqData = {
      currentQuestionCode: apiData.question?.code,
      textResponse: translatedText ? translatedText : patientAnswer,
      sessionId: sId,
      answers: answers,
      disorderCounts: disorderCounts,
      lot: currentLot,
      useLLM: useLLM,
      userId: userData._id
    };

    const data = await QuestionsService.getQuestions(reqData);
    if (data.question) {
      setControlsVisible(false)
      setPatientAnswer("");
      setQuestion(data.question.text);
      try {
        setAudioElement(new Audio(`https://demoplayground4093662547.z20.web.core.windows.net/us-en/Code${data.question.code}.mp3`))
      } catch (e) { console.log("Audio Error") }
      setTimerDuration(data.question.timer === "HIGH" ? 45 : data.question.timer === "MEDIUM" ? 30 : data.question.timer === "LOW" ? 10 : 5)
      setInstructions(data.question.instructions);
      setAPIData(data);
      setAnswers(data.answers);
      setDisorderCounts(data.disorderCounts);
      setSubmitInProcess(false);
      setCurrentLot(data.lot);
      readInstructions(data.question);
    } else {
      if (data.final) {
        setFinal(data.final);
        setSubmitInProcess(false);
      }
      if (data.message) showErrorMessage(data.message);
    }

    if (data.message === "All Lots are completed") {
      showSuccessMessage("Thank you")
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  function createBoldText(instructions) {

    return (
      <div dangerouslySetInnerHTML={{ __html: instructions }} />
    );
  }

  const enableFieldAndFocus = () => {
    setTimeout(inputRef.current.focus(), 500)
  };



  return (
    <>
      <div id="startSession1">
        <div className="container my-3">
          <div className="row">
            <div className="col-md-12">
              <div className="card shadow-sm ">
                <div className="card-body p-4" id="submit-form">
                  <div className="" style={{ minHeight: "76px" }}>
                    {instructions === "NULL" ? (
                      ""
                    ) : (
                      <>
                        <h5 className="mb-2 text-info">Instruction</h5>
                        <p
                          className="border border-info p-2 rounded"
                          id="chat1"
                        >
                          <div>
                            {createBoldText(instructions)}
                          </div>

                        </p>
                      </>
                    )}
                  </div>
                  <div className="">
                    <h5 className="mb-2 text-warning">Question</h5>
                    <div id="typewriter">
                      <p
                        id="text"
                        className="border border-warning p-2 rounded"
                      >
                        <Typewriter
                          onInit={(typewriter) => {
                            if (question !== "") {
                              typewriter.typeString(question).start();
                            }
                          }}
                          key={question}
                          options={{
                            delay: 8,
                            cursor: "",
                          }}
                        />
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-10">
                      <div className="">
                        <h5 className="mb-2 text-primary">
                          Answer
                          <small>
                            <span id="speakshow">
                              (Try to Speak out your response){" "}
                              {listening ? (
                                <span>
                                  <i class="fa fa-circle text-danger Blink"></i>{" "}
                                  Listening
                                </span>
                              ) : (
                                ""
                              )}
                            </span>
                            {hasWarningProvided &&
                              <span className="Blink text-danger">
                                &nbsp; &nbsp; Your answer is about to be submitted in 3 seconds – press edit to change
                              </span>
                            }
                            <span id="textshow" style={{ display: "none" }}>
                              (Type your response below)
                            </span>
                          </small>
                        </h5>
                        <div style={{ minHeight: "50px" }} className="form-control border-primary p-2 rounded mb-0 bg-white" id="chat3" readOnly>
                          <textarea
                            onChange={(e) => setPatientAnswer(e.target.value)}
                            disabled={
                              inputMode === "VOICE" && !patientAnswerBox
                            }
                            ref={inputRef}
                            cols="120"
                            style={{ maxWidth: "100%" }}
                            rows={3}
                            className="patient-answer-box"
                            value={patientAnswer}
                          />
                        </div>
                        <div className="py-2 text-end">
                          <button
                            type="button"
                            className={`btn btn-success btn-sm`}
                            id="loader"
                            style={{ display: submitInProcess ? "block" : "none" }}
                          >
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Processing...
                          </button>
                          {/* Buttons div */}
                          <div className={`animated ${controlsVisible ? 'expanded' : ''}`}>
                            <button
                              type="button"
                              style={{ marginRight: 3 }}
                              className="btn btn-primary btn-sm"
                              id="editButton"
                              onClick={() => {
                                setPatientAnswerBox(!patientAnswerBox)
                                SpeechRecognition.stopListening();
                                if (hasWarningProvided) {
                                  clearTimeout(preventAutoSubmitTimerId)
                                  setDidUserStopSubmission(true)
                                  setHasWarningProvided(false)
                                }
                              }}
                            >
                              Edit
                            </button>
                            <button
                              style={{ marginRight: 3 }}
                              onClick={submitQuestion}
                              // disabled={isTimerRunning}
                              type="button"
                              className="btn btn-success btn-sm"
                              id="submit-button"
                            >
                              Submit
                            </button>

                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                setHasWarningProvided(false)
                                submitQuestion(true)
                              }
                              }
                            >
                              Skip
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <h5 className="mb-2 text-dark">Timer</h5>
                      <div
                        className="text-center shadow-sm pb-2 border-dark border rounded"
                        style={{ minHeight: "96px" }}
                      >
                        <div id="timer" className="fw-bold lead">
                          {seconds}
                        </div>
                        <div className="d-flex align-items-center justify-content-evenly pt-1">
                          <button
                            id="startButton"
                            style={{
                              display:
                                listenerState === "ENDED" &&
                                  patientAnswer === ""
                                  ? "block"
                                  : "none",
                            }}
                            className="py-0 btn btn-sm btn-primary"
                          >
                            <i className="fa-solid fa-play"></i>
                          </button>
                          <button
                            id="stopButton"
                            className="py-0 btn btn-sm btn-danger"
                            style={{
                              display:
                                listenerState === "STARTED" ? "block" : "none",
                            }}
                          >
                            <i className="fa-solid fa-stop"></i>
                          </button>
                          <button
                            id="addTimeButton"
                            className="py-0 btn btn-sm btn-dark"
                            style={{ display: "none" }}
                          >
                            <i className="fa-solid fa-stopwatch-20"></i>
                          </button>
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
                            <div
                              className="progress-bar progress-bar-striped progress-bar-animated"
                              role="progressbar"
                              aria-valuenow="16"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{ width: `${progressBar.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="row gx-1 text-center text-white flex-nowrap overflow-auto pb-2  issuebox">
                        {final.map((disorder) => (
                          <div className="col">
                            <div className="card bg-success">
                              <div className="card-body">
                                <h6
                                  className="card-subtitle"
                                  style={{
                                    color: "white",
                                    fontWeight: 600,
                                    fontSize: "20px",
                                  }}
                                >
                                  {disorder}
                                </h6>
                                <p className="card-text">&nbsp;</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
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
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("Timer Ended"),
  });

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
  };
}