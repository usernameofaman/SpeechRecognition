import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../custom.css'
import Session from './Session';
import React, { useEffect } from 'react';
import { CorporateService, SettingsService } from '../../services';
import { FormControlLabel, FormGroup, Switch, Button } from '@mui/material';
import { showErrorMessage } from '../../managers/utility';
import LoginForm from './Models/AuthModal';
import Profile from './Models/ProfilePopper'
import { decodeToken } from 'react-jwt'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const App = () => {
    const navigate = useNavigate();

    const [sessionStarted, setSessionStarted] = React.useState(false)

    const [useLLM, setUseLLM] = React.useState(false)
    const [inputMode, setInputMode] = React.useState("VOICE")

    const [userData, setUserData] = React.useState({})


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const verifyJWT = async () => {
        let details = localStorage.getItem('userDetails') || ""
        if (details) {
            if (details.type && details.type === "CORPORATE")
                navigate('/corporate')
        }
    }

    const getUserDetails = async () => {
        let userData = localStorage.getItem('userDetails')
        if (userData) userData = JSON.parse(userData)
        if (userData && userData._id) {
            const userDetails = await CorporateService.getCorporateEmployeeDetails(userData?._id);
            setUserData(userDetails)
            localStorage.setItem('userDetails', JSON.stringify(userDetails))
        }

    }

    useEffect(() => {
        getUserDetails()
        getCurrentSetting()
        verifyJWT()
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

    const [viewLoginModal, setViewLoginModal] = useState(false)

    const checkLoginBeforeSession = () => {
        let token = localStorage.getItem('loginToken')
        let sessionId = localStorage.getItem('sessionId')
        if (token) {
            getUserDetails()
            if (sessionId) {
                setOpen(true)
            } else {
                setSessionStarted(true)
            }
        }
        else {
            setViewLoginModal(true)
            showErrorMessage("Please Log in first")
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


                            <Profile userData={userData} setViewLoginModal={setViewLoginModal} viewLoginModal={viewLoginModal} >
                                {userData?.remainingSession >= 0 ? <span style={{ fontSize: '13px' }} className="additional-text">Remaining Sessions : {userData?.remainingSession}</span> : ""}
                            </Profile>
                        </div>
                    </div>
                </nav>
            </header>
            {viewLoginModal && (
                <LoginForm
                    open={viewLoginModal}
                    onClose={() => {
                        setViewLoginModal(false)
                    }}
                />
            )}


            {!sessionStarted ? <div id="launchContent">
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="bnrheading">
                                <h2>Welcome <b className="fw-bold text-warning">{userData?.name}</b> to the amazing world of <b
                                    className="fw-bold text-primary">Maya</b></h2>
                                <h6 className="text-secondary lead fs-5">Maya is here to help you live a better life by help finding
                                    the trends and tendencies about You. We will try to map these to the mental health disorder
                                    possibilities so that you can lead a better life.
                                    <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#launchModal"
                                        className="text-decoration-none">Know
                                        More..</a>
                                </h6>

                                <button onClick={() => checkLoginBeforeSession()} className="btn btn-outline-primary text-uppercase mt-4 py-3 px-4 shadow-sm" type="button"
                                    id="switchButton">
                                    <span className="d-none d-sm-inline-block">Start Session</span>

                                    <i className="fas fa-arrow-right ms-2"></i>
                                    <br />
                                    {userData?.remainingSession >= 0 ? <span style={{ fontSize: '13px' }} className="additional-text" onClick={handleOpen}>Remaining Sessions : {userData?.remainingSession}</span> : ""}

                                </button>

                                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                                    <Box sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: 400,
                                        bgcolor: 'background.paper',
                                        boxShadow: 24,
                                        borderRadius: "5px",
                                        p: 4,
                                    }}>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            <Typography>You have a ongoing session running... <br></br>Do you want to continue or restart ?</Typography>
                                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "20px" }}>
                                                <Button variant="contained" onClick={() => setSessionStarted(true)}>Continue</Button>
                                                <Button variant="outlined" onClick={() => { localStorage.removeItem("sessionId"); setSessionStarted(true) }}>
                                                    Restart
                                                </Button>
                                            </div>
                                        </Typography>
                                    </Box>
                                </Modal>

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


function VoiceLoader({ useLLM, inputMode }) {
    const [voicesLoaded, setVoicesLoaded] = useState(false);

    useEffect(() => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.onvoiceschanged = function () {
                let voices = window.speechSynthesis.getVoices();
                let voice = voices.filter(function (voice) {
                    return voice.name == "Google हिन्दी"
                })[0];
                setVoicesLoaded(voice)
            };
        }

    }, []);



    return (
        <div>
            {voicesLoaded ? <Session useLLM={useLLM} voice={voicesLoaded} inputMode={inputMode} /> : <p>Loading voices...</p>}
        </div>
    );
}

