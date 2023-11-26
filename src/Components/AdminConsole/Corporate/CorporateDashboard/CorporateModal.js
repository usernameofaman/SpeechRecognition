import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import { CorporateService } from '../../../../services';
import { showErrorMessage, showSuccessMessage } from '../../../../managers/utility';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const CorporateModal = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [numberOfLicense, setNumberOfLicense] = useState('');
  const [sessionPerLicense, setSessionPerLicense] = useState('');
  const [showPin, setShowPin] = useState(false);

  const handleAddCorporate = async () => {
    try {
      const response = await CorporateService.addCorporateUser({
        name: name,
        email: email,
        password: password,
        numberOfLicense: numberOfLicense,
        sessionPerLicense: sessionPerLicense
      });
      if (response._id) {
        showSuccessMessage("Corporate User Added Successfully")
        console.log('Response from addCorporateUser:', response);
        onClose()
      } else {
        showErrorMessage(response.error || response.message || "Unable To Add")
      }
    } catch (error) {
      console.error('Error adding corporate user:', error);
      showErrorMessage("User Not Added, An Error Occured !")
    }
  };
  
  const handleToggleVisibility = () => {
    setShowPin((prevShowPin) => !prevShowPin);
  };


  return (
    <Modal open={isOpen} onClose={onClose} BackdropProps={{
      onClick: null
    }}>


      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Add Corporate
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          name='name'
        />
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          margin="normal"
          name='email'
        />
        <TextField
          label="Password"
          type={showPin ? 'text' : 'password'}
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          name='password'
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
        <TextField
          label="Number of Licenses"
          fullWidth
          type="number"
          value={numberOfLicense}
          onChange={(e) => setNumberOfLicense(parseInt(e.target.value.replace(/\D/g, '')))}
          margin="normal"
          name='numberOfLicense'
        />
        <TextField
          label="Sessions Per License"
          fullWidth
          type="number"
          value={sessionPerLicense}
          onChange={(e) => setSessionPerLicense(parseInt(e.target.value.replace(/\D/g, '')))}
          margin="normal"
          name='sessionPerLicense'
        />
        <Button variant="contained" color="primary" onClick={handleAddCorporate}>
          Add
        </Button>

      </Box>
    </Modal>
  );
};

export default CorporateModal;
