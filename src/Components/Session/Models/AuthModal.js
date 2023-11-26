import React, { useState } from 'react';
import { Button, Modal, TextField, Typography, IconButton } from '@mui/material';
import AuthUserService from '../../../services/authUser';
import { showErrorMessage, showSuccessMessage } from '../../../managers/utility';
import CloseIcon from '@mui/icons-material/Close';
import { decodeToken } from 'react-jwt'
import { useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const LoginForm = ({ open, onClose }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginAs, setLoginAs] = useState('Corporate');
  const [showPin, setShowPin] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await AuthUserService.loginUser({
        email: email,
        password: password,
        loginAs: loginAs.toUpperCase()
      });
      if (response.token) {
        showSuccessMessage("Login Success")
        localStorage.setItem('loginToken', response.token)
        let decodedToken = decodeToken(response.token)
        localStorage.setItem('userDetails', JSON.stringify(decodedToken))
        if (decodedToken.type === "CORPORATE") {
          navigate("/corporate")
        } else {
          window.location.reload()
        }
        onClose();
      } else {
        showErrorMessage(response.message)
      }
    } catch (error) {
      console.error('Error during login:', error);
      showErrorMessage('Error during login');
    }
  };

  const handleToggleVisibility = () => {
    setShowPin((prevShowPin) => !prevShowPin);
  };


  // const handleRegister = async () => {
  //   try {
  //     const response = await AuthUserService.registerNewUser({
  //       name: name,
  //       email: email,
  //       password: password,
  //     });
  //     showSuccessMessage("Registration Successful")
  //     onClose();
  //   } catch (error) {
  //     console.error('Error registering user:', error);
  //     showErrorMessage('Error registering user')
  //   }
  // };


  // const handleOpenRegisterModal = () => {
  //   setIsRegisterModalOpen(true);
  // };

  // const handleCloseRegisterModal = () => {
  //   setIsRegisterModalOpen(false);
  // };

  return (
    <div>
      <Modal open={open} onClose={onClose} BackdropProps={{
        onClick: null,
      }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', maxWidth: '400px', width: '100%' }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => onClose()}>X</Button>
          </div>
          <Typography variant="h5" gutterBottom>
            Login as {loginAs}
            <IconButton style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={onClose}>
              <CloseIcon />
            </IconButton>
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
          <div style={{
            display: "flex",
            justifyContent: "space-between"
          }}>
            <Button variant="contained" color="primary" onClick={handleLogin} style={{ marginRight: '10px' }}>
              Login
            </Button>

            <span onClick={() => setLoginAs(loginAs === "Corporate" ? "Employee" : "Corporate")} style={{ backgroundColor: "#d7d7d7", borderRadius: "5px", padding: "0 10px", cursor: "pointer" }}>Login as {loginAs === "Corporate" ? "Employee" : "Corporate"}</span>
          </div>
        </div>
      </Modal>

      {/* Registration Modal Will added here if needed!*/}

    </div>
  );
};

export default LoginForm;
