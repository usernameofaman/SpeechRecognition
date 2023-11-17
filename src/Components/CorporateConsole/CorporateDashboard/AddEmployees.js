import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import { CorporateService } from '../../../services';
import { showErrorMessage, showSuccessMessage } from '../../../managers/utility';
import CloseIcon from '@mui/icons-material/Close';

const CorporateModal = ({ isOpen, onClose, corporateId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [numberOfLicense, setNumberOfLicense] = useState('');
  const [sessionPerLicense, setSessionPerLicense] = useState('');

  const handleAddCorporateEmployee = async () => {
    try {
      const response = await CorporateService.addCorporateEmployee({
        name: name,
        email: email,
        password: password,
        corporateId : corporateId
      });
      if (response._id) {
        showSuccessMessage("Corporate User Added Successfully")
        console.log('Response from addCorporateUser:', response);
        setName("")
        setEmail("")
        setPassword("")
        onClose()
      } else {
        showErrorMessage(response.error || response.message || "Unable To Add")

      }
    } catch (error) {
      console.error('Error adding corporate user:', error);
      showErrorMessage("User Not Added, An Error Occured !")
    }
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
          Add Employee
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
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          name='email'
        />
        <TextField
          label="Password"
          type="text"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          name='password'
        />
        <Button variant="contained" color="primary" onClick={handleAddCorporateEmployee}>
          Add
        </Button>

      </Box>
    </Modal>
  );
};

export default CorporateModal;
