import React, { useEffect, useState, useCallback } from "react";
import Typewriter from "typewriter-effect";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { QuestionsService } from "../services";
import { useTimer } from "react-timer-hook";
import { showErrorMessage } from "../managers/utility";
import {
  detectLanguage,
  translateToEnglish,
} from "./GoogleTranslate/GoogleTranslate";
import "../App.css";

export default function Session({ voice, useLLM, inputMode }) {
  const [questionWriter, setQuestionWriter] = useState(null);
  const [question, setQuestion] = useState("");
  // const [instructions, setInstructions] = useState("Try to be brief and factual. If you do not know exact age, does not matter, give appx number as the age. Example: I am 45 years old or Patient is about 34 years old.");
  const [instructions, setInstructions] = useState("");
  const [instructionWriter, setInstructionWriter] = useState(null);
  const [apiData, setAPIData] = useState({});
  const [currentLot, setCurrentLot] = useState(0);
  const [answers, setAnswers] = useState(null);
  const [disorderCounts, setDisorderCounts] = useState(null);
  const [submitInProcess, setSubmitInProcess] = useState(false);
  const [listenerState, setListenerState] = useState("NOT_STARTED");
  const [final, setFinal] = useState([]);
  const [progressBar, setProgressBar] = useState({
    percentage: 3,
    countPerLot: 0,
    prevLot: currentLot,
  });

  //Timer Duration
  const [timerDuration, setTimerDuration] = useState(5);
  const [midDelay, setMidDelay] = useState(5);

  console.log(
    "listenerState",
    listenerState,
    "submitInProcess",
    submitInProcess,
    "disorderCounts",
    disorderCounts,
    "answers",
    answers,
    "currentLot",
    currentLot,
    "instructions",
    instructions
  );

  const {
    seconds,
    start,
    pause,
    restart,
    isRunning: isTimerRunning,
  } = MyTimer({ expiryTimestamp: Date.now() + 0 * 1000 });
  useEffect(() => {
    getQuestions();
  }, []);
  useEffect(() => {
    setProgressBar((prev) => {
      console.log("PERRR", prev.percentage);
      let newPercentage = (100 / 11) * (parseInt(currentLot) + 1);
      console.log("PERRR NEW PER", newPercentage);
      if (prev.countPerLot > 4) newPercentage += 100 / 22;
      console.log("PERRR NEW PER", newPercentage);
      return {
        prevLot: currentLot,
        percentage: newPercentage,
        countPerLot: prev.currentLot === currentLot ? prev.countPerLot + 1 : 0,
      };
    });
  }, [currentLot]);

  const readInstructions = async (question) => {
    let text = question.instructions;
    let length = text.split(" ").length;
    let timeTakenToSpeak = length / 2.83;
    let restartDuration =
      Date.now() + (midDelay * 1000 + timeTakenToSpeak * 1000);
    if (question.instructions && question.instructions !== "NULL")
      restart(restartDuration);
    setTimeout(
      nowReadQuestion,
      (question.instructions && question.instructions !== "NULL"
        ? midDelay
        : 0) *
        1000 +
        timeTakenToSpeak * 1000
    );
    speak({
      text:
        question.instructions && question.instructions !== "NULL"
          ? question.instructions
          : "",
      onEnd: () => {
        console.log("Done Reading Instruction");
      },
    });
  };

  const nowReadQuestion = async () => {
    setQuestion((prev) => {
      console.log(prev);
      speak({
        text: prev,
        onEnd: () => {
          let restartDuration = Date.now() + timerDuration * 1000;
          restart(restartDuration);
          startListening();
        },
      });
      return prev;
    });
  };

  const speak = ({ text, onEnd }) => {
    const speakObj = new SpeechSynthesisUtterance();
    speakObj.text = text;
    speakObj.voice = voice;
    speakObj.onend = () => {
      if (onEnd) {
        console.log("On End Check", onEnd);
        onEnd();
      }
      clearInterval(resumeInterval);
    };

    // Start/resume the speech
    window.speechSynthesis.speak(speakObj);

    // Set up an interval to periodically pause and resume
    const resumeInterval = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        clearInterval(resumeInterval);
      } else {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 14000);
  };

  useEffect(() => {
    if (!isTimerRunning && listenerState === "STARTED") {
      setListenerState("ENDED");
      SpeechRecognition.stopListening();
    }
  }, [isTimerRunning]);

  const [patientAnswer, setPatientAnswer] = useState("");
  const [patientAnswerBox, setPatientAnswerBox] = useState(false);

  const startListening = () => {
    setListenerState("STARTED");
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const {
    transcript,
    browserSupportsSpeechRecognition,
    listening,
    resetTranscript,
  } = useSpeechRecognition();
  console.log("Here is transcript", transcript);

  // useEffect(() => {
  //     setPatientAnswer(transcript)
  //     // detectLanguage(transcript)
  //     // TRANSLATE - Here user's voice input as text comes in transcript
  //     // 5 Words tak hi API CALL hogi, if More than 5 words
  // }, [transcript])

  useEffect(() => {
    const words = transcript.split(" ");
    if (words.length <= 5 && transcript.trim() !== "") {
      setPatientAnswer(transcript);
      detectLanguage(transcript);
    }
  }, [transcript]);

  const getQuestions = async () => {
    let sId = localStorage.getItem("sessionId");

    const data = await QuestionsService.getQuestions({
      sessionId: sId,
      refetch: true,
    });
    if (data.question) {
      setQuestion(data.question.text);
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

  const submitQuestion = async () => {
    setSubmitInProcess(true);
    resetTranscript();
    if (patientAnswer === "") {
      showErrorMessage("Answer Is Required");
      setSubmitInProcess(false);
      return;
    }
    let sId = localStorage.getItem("sessionId");
    if (!sId) {
    }

    const detectedLanguage = detectLanguage(patientAnswer); // Implement the detectLanguage function

    if (detectedLanguage !== "en") {
      // If the detected language is not English, translate to English
      try {
        const translatedText = await translateToEnglish(patientAnswer);
        if (translatedText) {
          setPatientAnswer(translatedText);
        } else {
          showErrorMessage("Translation to English failed");
          setSubmitInProcess(false);
          return;
        }
      } catch (error) {
        console.error("Translation error: ", error);
        showErrorMessage("Translation to English failed");
        setSubmitInProcess(false);
        return;
      }
    }

    const reqData = {
      currentQuestionCode: apiData.question?.code,
      textResponse: patientAnswer,
      sessionId: sId,
      answers: answers,
      disorderCounts: disorderCounts,
      lot: currentLot,
      useLLM: useLLM,
    };
    const data = await QuestionsService.getQuestions(reqData);
    if (data.question) {
      setPatientAnswer("");
      setQuestion(data.question.text);
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
      speak({
        text: "Thank you for answering all of the questions.",
        onEnd: () => console.log("Done with all questions"),
      });
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

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
                          <Typewriter
                            onInit={(typewriter) => {
                              setInstructionWriter(typewriter);
                              typewriter.typeString(instructions).start();
                            }}
                            key={instructions}
                            options={{
                              delay: 8,
                              cursor: "",
                            }}
                          />
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
                              setQuestionWriter(typewriter);
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
                            <span id="textshow" style={{ display: "none" }}>
                              (Type your response below)
                            </span>
                          </small>
                        </h5>
                        {/* Todo - Text area */}
                        <div
                          style={{ minHeight: "50px" }}
                          className="form-control border-primary p-2 rounded mb-0 bg-white"
                          id="chat3"
                          readOnly
                        >
                          <textarea
                            onChange={(e) => setPatientAnswer(e.target.value)}
                            disabled={
                              inputMode === "VOICE" && !patientAnswerBox
                            }
                            cols="120"
                            style={{ maxWidth: "100%" }}
                            rows={3}
                            className="patient-answer-box"
                            value={patientAnswer}
                          />
                        </div>
                        <div className="py-2 text-end">
                          {submitInProcess ? (
                            <button
                              type="button"
                              className="btn btn-success btn-sm"
                              id="loader"
                              style={{ display: "" }}
                            >
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Processing...
                            </button>
                          ) : (
                            <>
                              <button
                                type="button"
                                style={{ marginRight: 3 }}
                                className="btn btn-primary btn-sm"
                                id="editButton"
                                onClick={() =>
                                  setPatientAnswerBox(!patientAnswerBox)
                                }
                              >
                                Edit
                              </button>
                              <button
                                style={{ marginRight: 3 }}
                                onClick={submitQuestion}
                                disabled={isTimerRunning}
                                type="button"
                                className="btn btn-success btn-sm"
                                id="submit-button"
                              >
                                Submit
                              </button>

                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                              >
                                Discard
                              </button>
                            </>
                          )}
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
                            {console.log(progressBar.percentage)}
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

                        {/* <div className="col">
                                                    <div className="card bg-success">
                                                        <div className="card-body">
                                                            <h6 className="card-subtitle">Dementia</h6>
                                                            <p className="card-text">&nbsp;</p>
                                                        </div>
                                                    </div>
                                                </div> */}
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
