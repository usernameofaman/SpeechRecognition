import React, { useState } from "react";
import {
  Button,
  Modal,
  TextField,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

import AuthUserService from "../../../services/authUser";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../managers/utility";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import UserLogin from "./UserLogin";
import SignUp from "./SignUp";

const LoginForm = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loginAs, setLoginAs] = useState("Corporate");
  const [showPin, setShowPin] = useState(false);
  const [otp, setOtp] = useState("");
  const [state, setState] = useState("Login User");  //for toggle login or forgot form


  const handleLogin = async () => {
    try {
      const response = await AuthUserService.loginCorporateEmployee({
        email: email,
        password: password,
        loginAs: loginAs.toUpperCase(),
      });
      if (response.token) {
        showSuccessMessage("Login Success");
        localStorage.setItem("loginToken", response.token);
        let decodedToken = decodeToken(response.token);
        localStorage.setItem("userDetails", JSON.stringify(decodedToken));
        if (decodedToken.type === "CORPORATE") {
          navigate("/corporate");
        } else {
          window.location.reload();
        }
        onClose();
      } else {
        showErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      showErrorMessage("Error during login");
    }
  };

  //for open forgot password form
  const forgotPassword = () => {
    setState("Forget Password");
  };

  const changeState = () => {
    setState("Login");
  }

  const loginState = () => {
    setState("Login User");
  }
  //for reset password or forgot password
  const resetPasswword = () => { };

  const handleToggleVisibility = () => {
    setShowPin((prevShowPin) => !prevShowPin);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      setLoginAs("Corporate");
    } else {
      setLoginAs("Employee");
    }
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const registerUser = () => {
    setState("signup");
  }

  const signUp = async () => {
    try {
      const response = await AuthUserService.registerNewUser({
        name: name,
        mobile: mobile,
        email: email,
        password: password,
      });
      if (response && response._id) {
        showSuccessMessage("Sign Up Successfully");
        localStorage.setItem("userDetails", JSON.stringify(response));
        navigate("/");
        onClose();
      } else if (response.error) {
        showErrorMessage(response.error)
      } else {
        showErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error during Sign Up", error);
      showErrorMessage("Error during Sign Up");
    }
  }


  const signIn = async () => {
    try {
      const response = await AuthUserService.loginUser({
        email: email,
        password: password,
        // loginAs: loginAs.toUpperCase(),
      });
      console.log(response)
      if (response && response.userDetails) {
        showSuccessMessage("Sign Up Successfully");
        localStorage.setItem("userDetails", JSON.stringify({ ...response.userDetails, type: "USER" }));
        window.location.reload();
        onClose();
      } else {
        showErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error during Sign Up", error);
      showErrorMessage("Error during Sign Up");
    }
  }


  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 0,
        }}
      >
        {/* Login Form start */}
        {
          state === "Login" ? (
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "8px",
                maxWidth: "450px",
                width: "100%",
              }}
            >
              <div style={{ textAlign: "right" }}>
                <ClearIcon style={{ textAlign: "right" }} color="primary" onClick={onClose} />
              </div>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    style={{ fontSize: "13px" }}
                    label="Login as Corporate Admin"
                    {...a11yProps(0)}
                  />
                  <Tab
                    style={{ fontSize: "13px" }}
                    label="Login as Employee"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>

              {/* <CustomTabPanel value={value} index={0}> */}
              <Typography variant="h5" gutterBottom>
                <IconButton
                  style={{ position: "absolute", top: "10px", right: "10px" }}
                  onClick={onClose}
                ></IconButton>
              </Typography>

              <TextField
                label={value === 0 ? "Corporate Email" : "Employee Email"}
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
              />
              <TextField
                sx={{ mb: 3 }}
                label="Password"
                type={showPin ? 'text' : 'password'}
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleToggleVisibility} edge="end">
                        {showPin ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <div
                style={{
                  padding: "0 0 15px 0",
                  color: "#1877f2",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
                onClick={forgotPassword}
              >
                Forgotten password?
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                  style={{ width: "100%", height: "50px", fontSize: "15px" }}
                >
                  Submit
                </Button>
              </div>
              <div style={{ color: "#1877f2", fontSize: "18px", fontWeight: "500", cursor: "pointer", textDecoration: "none", textAlign: "right" }} >
                <div onClick={loginState} style={{ marginTop: "20px", textAlign: "center" }}>
                  Login as User
                </div>
              </div>
            </div>
          ) : //login form end here

            //forgot form start here
            state === "Forget Password" ? (
              <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", maxWidth: "400px", width: "100%", }}>

                <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "space-between" }}>
                  <h3
                    style={{
                      color: "#1877f2",
                      textAlign: "center",
                      fontWeight: "500",
                      fontSize: "24px",
                    }}>
                    Forgot Password
                  </h3>
                  <ClearIcon color="primary"
                    onClick={onClose} />
                </Box>
                {/* <CustomTabPanel value={value} index={0}> */}
                <Typography variant="h5" gutterBottom>
                  <IconButton
                    style={{ position: "absolute", top: "10px", right: "10px" }}
                    onClick={onClose}
                  ></IconButton>
                </Typography>

                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                />
                <TextField
                  label="OTP"
                  type="number"
                  fullWidth
                  margin="normal"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.toLowerCase())}
                />

                <TextField
                  sx={{ mb: 3 }}
                  label="Password"
                  type={showPin ? 'text' : 'password'}
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleToggleVisibility} edge="end">
                          {showPin ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <div style={{}}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={resetPasswword}
                    style={{ width: "100%", height: "50px", fontSize: "15px" }}>
                    Submit
                  </Button>
                  <div style={{ color: "#1877f2", fontSize: "18px", fontWeight: "500", cursor: "pointer", textDecoration: "none", textAlign: "right" }} >
                    <hr></hr>
                    <div style={{ textAlign: "center" }} onClick={changeState}>
                      Go Back
                    </div>
                  </div>
                </div>
              </div>
            )
              //forgot form end here
              :
              state === "Login User" ?
                <UserLogin
                  password={password}
                  setPassword={setPassword}
                  InputAdornment={InputAdornment}
                  changeState={changeState}
                  registerUser={registerUser}
                  onClose={onClose}
                  email={email}
                  signIn={signIn}
                  showPin={showPin}
                  setEmail={setEmail}
                  handleToggleVisibility={handleToggleVisibility}
                />
                : state === "signup" ?
                  <SignUp
                    setName={setName}
                    password={password}
                    setPassword={setPassword}
                    InputAdornment={InputAdornment}
                    changeState={changeState}
                    loginState={loginState}
                    registerUser={registerUser}
                    onClose={onClose}
                    email={email}
                    signIn={signIn}
                    showPin={showPin}
                    setEmail={setEmail}
                    handleToggleVisibility={handleToggleVisibility}
                    signUp={signUp}
                    setMobile={setMobile}
                    mobile={mobile}
                    name={name}
                  />
                  : "Login User"
        }
      </Modal>
    </div>
  );
};
export default LoginForm;
