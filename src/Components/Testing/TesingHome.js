import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../custom.css'
import Session from './TestingSession';
import React, { useEffect } from 'react';
import { SettingsService } from '../../services';
import { FormControlLabel, FormGroup, Switch, Button } from '@mui/material';

const App = () => {

    const [sessionStarted, setSessionStarted] = React.useState(false)

    const [useLLM, setUseLLM] = React.useState(false)
    const [inputMode, setInputMode] = React.useState("VOICE")

    useEffect(() => {
        getCurrentSetting()
    }, []);


    const getCurrentSetting = async () => {
        const setting = await SettingsService.getSettings()
        if (setting && setting._id) {
            setUseLLM(setting.useLLM);
        }
    }

    const toggleUseLLM = async (value) => {
        const updateToggle = await SettingsService.updateSettings({ useLLM: value })
        if (updateToggle && updateToggle.matchedCount) {
            getCurrentSetting()
        }
    }

    return (
        <>
            <header>
                <nav className="navbar navbar-light bg-white shadow-sm">
                    <div className="container">
                        <div className="sessiondrawer">
                            <a className="btn btn-primary me-3" data-bs-toggle="offcanvas" href="#sessiondrawer" role="button"
                                aria-controls="sessiondrawer">
                                <i className=" fa-solid fa-sliders"></i>
                            </a>


                            <div className="offcanvas offcanvas-start" tabIndex="1" id="sessiondrawer"
                                aria-labelledby="sessiondrawerLabel">
                                <div className="offcanvas-header">
                                    <h5 className="offcanvas-title" id="sessiondrawerLabel">Sessions</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                                        aria-label="Close"></button>
                                </div>
                                <div className="offcanvas-body">
                                    <ul className="navbar-nav flex-column ms-auto mb-2 mb-md-0">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Start Session</a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">My Sessions</a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Resume Session</a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">
                                                <div className=" d-flex justify-content-between align-items-center">
                                                    <span>My Wallet </span>
                                                    <div><i className="fa-solid fa-wallet"></i>
                                                        <span className="ms-1 priceing">$30.56</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                    </ul>

                                    <div className="offcanvas-header px-0">
                                        <h5 className="offcanvas-title" id="sessiondrawerLabel">Quick Links</h5>
                                    </div>

                                    <ul className="navbar-nav flex-column ms-auto mb-2 mb-md-0">
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">My Protocal</a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Language</a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Menu</a>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <a className="navbar-brand" href="#"><img src="/images/aipsychi.png" alt="Logo" className="img-fluid" /></a>
                        <div className="d-flex ms-auto">
                            <div className="d-flex align-items-center customSwitch mb-3 mb-md-0">
                                <div className="form-check form-switch form-switch-xl" id="togglecheckbox" style={{ display: "none" }}>
                                    <input className="form-check-input " type="checkbox" id="flexSwitchCheckChecked" checked />
                                </div>
                            </div>
                            <ul className="navbar-nav ms-0 ms-sm-3">
                                <li className="nav-item">
                                    <FormGroup>
                                        <FormControlLabel onChange={() => toggleUseLLM(!useLLM)} control={<Switch checked={useLLM} />} label="Use LLM" />
                                    </FormGroup>
                                </li>
                            </ul>
                            <ul className="navbar-nav ms-0 ms-sm-3">
                                <li className="nav-item">
                                    <Button onClick={() => {
                                        localStorage.removeItem("sessionId");
                                        window.location.reload()
                                    }}>
                                        Reset
                                    </Button>
                                </li>
                            </ul>
                            <ul className="navbar-nav ms-0 ms-sm-3">
                                <li className="nav-item">
                                    <FormGroup>
                                        <FormControlLabel onChange={() => setInputMode(inputMode === "VOICE" ? "TYPE" : "VOICE")} control={<Switch checked={inputMode === "VOICE"} />} label={inputMode === "VOICE" ? "Speak" : "Type"} />
                                    </FormGroup>
                                </li>
                            </ul>
                            <ul className="navbar-nav ms-0 ms-sm-3">
                                <li className="nav-item">
                                    <div className="p-2"><i className="fa-solid fa-wallet"></i>
                                        <span className="ms-1 priceing">$30.56</span>
                                    </div>
                                </li>
                            </ul>
                            <form className="userprofile ms-0 ms-sm-3">
                                <div className="dropdown">
                                    <button className="btn btn-warning dropdown-toggle d-flex align-items-center" type="button"
                                        id="userprofilemenu" data-bs-toggle="dropdown" aria-expanded="true">
                                        <img className="img-fluid rounded-circle"
                                            src="https://cdn4.sharechat.com/img_378239_1efadecf_1664979374920_sc.jpg?tenant=sc&amp;referrer=pwa-sharechat-service&amp;f=920_sc.jpg"
                                            alt="user img" /><span className="d-none d-md-flex">Username</span>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-md-start"
                                        aria-labelledby="userprofilemenu">
                                        <li><a className="dropdown-item" href="#">My Profile</a></li>
                                        <li><a className="dropdown-item" href="#">Settings</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li><a className="dropdown-item" href="#">Logout</a></li>
                                    </ul>
                                </div>
                            </form>
                        </div>
                    </div>
                </nav>
            </header>


            {false ? <div id="launchContent">
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="bnrheading">
                                <h2>Test <b className="fw-bold text-warning">Mode</b> <b
                                    className="fw-bold text-primary">Maya</b></h2>
                                <h6 className="text-secondary lead fs-5"> This is just a test page to check all the functionalites of this app
                                    <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#launchModal"
                                        className="text-decoration-none">Know
                                        More..</a>
                                </h6>

                                <button onClick={() => setSessionStarted(true)} className="btn btn-outline-primary text-uppercase mt-4 py-3 px-4 shadow-sm" type="button"
                                    id="switchButton">
                                    <span className="d-none d-sm-inline-block">Start Session</span>
                                    <i className="fas fa-arrow-right ms-2"></i>
                                </button>
                            </div>
                        </div>
                        <div className="col-md-5 ms-md-auto d-flex align-items-end">
                            <img src="/images/maya.png" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div> : <VoiceLoader useLLM={useLLM} inputMode={inputMode} />}

            <div className="modal fade show" id="launchModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen-md-down modal-xl">
                    <div className="modal-content border-0">
                        <div className="modal-body p-0">
                            <button type="button"
                                className="btn-close position-absolute top-0 start-100 translate-middle bg-white rounded-pill p-2 btn-sm"
                                data-bs-dismiss="modal" aria-label="Close"></button>
                            <div id="aboutMaya">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-6" id="aboutMaya_leftBG">
                                            <img src="/images/launch_ai_img.jpg" className="img-fluid invisible" />
                                        </div>
                                        <div className="col-lg-6 p-5">
                                            <div className="guidline">
                                                <h2 className="fw-bold text-uppercase">I am not a <b
                                                    className="fw-bold text-primary">human</b>
                                                </h2>
                                                <h2
                                                    className="fw-bold text-uppercase">
                                                    <h6 className="text-secondary lead fs-5">But have learned many things about human,
                                                        how they
                                                        interact, how they speak and how do they think. </h6>

                                                    <p className="pt-3">Still there are certain limitations in my interactions and those
                                                        are explained
                                                        in tab on
                                                        right hand top corner “My Protocols.” Summary of that is as follows:</p>
                                                    <ul className="p-0">
                                                        <li>Recharge wallet tab will put money in your account.</li>
                                                        <li>When you are ready, press one of the buttons below, pressing a new
                                                            session will take you
                                                            to
                                                            a new session screen.
                                                            Pressing resume session will take you to last unfinished session of
                                                            yours. At a given
                                                            time
                                                            with one ID, you can have
                                                            only one unfinished session like if you already have a unfinished
                                                            session and start a
                                                            new
                                                            session but leave that too in
                                                            unfinished state, I will mark your previous session as completed. Your
                                                            current session
                                                            can
                                                            be resumed later.</li>
                                                        <li>Once you go to next screen, Maya will start asking questions.</li>
                                                        <li>You can select to interact in speech or text mode. You may toggle as
                                                            many times as you
                                                            like.
                                                        </li>
                                                        <li>It has a timer with Green, yellow and Red options.</li>
                                                        <li>Every question has a specified time and timer will be on for that time.
                                                            If you finish
                                                            early
                                                            you may press green button
                                                            for submit, else answer will be automatically submitted in expiry of the
                                                            timer.</li>
                                                        <li>If you need more time, press yellow button, each press will add 10
                                                            seconds.</li>
                                                        <li>If you need a break, press red button, it will stop nest question. On
                                                            pressing green
                                                            button
                                                            it will resume the session
                                                            from whatever point it was paused.</li>
                                                        <li>At times I might ask the same question again. Pardon me for that in
                                                            advance.</li>
                                                    </ul>
                                                </h2>
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
};

export default App;


function VoiceLoader({ useLLM , inputMode }) {
    const [voicesLoaded, setVoicesLoaded] = useState(true);

    useEffect(() => {
        // if ('speechSynthesis' in window) {
        //     window.speechSynthesis.onvoiceschanged = function () {
        //         let voices = window.speechSynthesis.getVoices();
        //         let voice = voices.filter(function (voice) {
        //             return voice.name == "Google हिन्दी"
        //         })[0];
        //         setVoicesLoaded(voice)
        //     };
        // }
    }, []);



    return (
        <div>
            {voicesLoaded ? <Session useLLM={useLLM} voice={voicesLoaded} inputMode={inputMode} /> : <p>Loading voices...</p>}
        </div>
    );
}

