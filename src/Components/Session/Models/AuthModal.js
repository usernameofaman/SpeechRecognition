import React, { useState } from 'react';
import { Button, Modal, TextField, Typography, IconButton } from '@mui/material';
import AuthUserService from '../../../services/authUser';
import { showErrorMessage, showSuccessMessage } from '../../../managers/utility';
import CloseIcon from '@mui/icons-material/Close';
import { decodeToken } from 'react-jwt'
import { useNavigate } from 'react-router-dom';


const LoginForm = ({ open, onClose }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [loginAs, setLoginAs] = useState("PASSWORD")
  const [name, setName] = useState('');

  const handleLogin = async () => {
    try {
      const response = await AuthUserService.loginUser({
        email: email,
        password: loginAs === "PIN" ? pin : password,
        loginAs
      });
      if (response.token) {
        showSuccessMessage("Login Success")
        localStorage.setItem('loginToken', response.token)
        let decodedToken = decodeToken(response.token)
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


  const handleRegister = async () => {
    try {
      const response = await AuthUserService.registerNewUser({
        name: name,
        email: email,
        password: password,
      });
      showSuccessMessage("Registration Successful")
      onClose();
    } catch (error) {
      console.error('Error registering user:', error);
      showErrorMessage('Error registering user')
    }
  };


  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

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
            Login
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
            onChange={(e) => setEmail(e.target.value)}
          />
          {loginAs === "PASSWORD" ?
            <TextField
              sx={{ mb: 3 }}
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> :
            <TextField
              sx={{ mb: 3 }}
              label="Pin"
              type="text"
              fullWidth
              margin="normal"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />}
          <Button variant="contained" color="primary" onClick={handleLogin} style={{ marginRight: '10px' }}>
            Login
          </Button>
          <Button variant="contained" color="primary" onClick={() => {
            loginAs === "PASSWORD" ? setLoginAs("PIN") : setLoginAs("PASSWORD")
          }} style={{ marginRight: '10px' }}>
            Login with Pin
          </Button>
          <Button variant="contained" color="secondary" onClick={handleOpenRegisterModal}>
            Register
          </Button>
        </div>
      </Modal>

      {/* Registration Modal */}
      <Modal BackdropProps={{
        onClick: null
      }} open={isRegisterModalOpen} onClose={handleCloseRegisterModal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', maxWidth: '400px', width: '100%' }}>
          <IconButton style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>
          <IconButton style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <TextField
            label="Name"
            type="name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={handleRegister}>
            Register
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default LoginForm;
