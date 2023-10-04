import React from 'react'
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close"



export default function DisorderModel({ isModalOpenDisorder, closeModal, modalDataDisorder, isEditable, handleDisorderChange, handleAddDisorder, handleEditDisorder, createMode, closeAddDisorderModal}) {
    return (
        <Modal
        BackdropProps={{
            onClick: null, // Disable backdrop click
          }}
            open={isModalOpenDisorder}
            onClose={closeModal}
            aria-labelledby="modal-modal-title-disorder"
            aria-describedby="modal-modal-description-disorder"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 900,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    textAlign: "center",
                }}
            >
                <Typography id="modal-modal-title-disorder" variant="h6" component="h2">
                    Disorder Modal
                </Typography>
                <Button
            edge="end"
            color="inherit"
            aria-label="close"
            onClick={closeAddDisorderModal}
          >
            <CloseIcon />
          </Button>
                <TextField
                    label="Name"
                    variant="outlined"
                    disabled={!isEditable}
                    onChange={handleDisorderChange}
                    name="name"
                    fullWidth
                    margin="normal"
                    sx={{ mt: 2 }}
                    value={modalDataDisorder?.name}
                />
                 <TextField
                    label="ICD Code"
                    variant="outlined"
                    disabled={!isEditable}
                    onChange={handleDisorderChange}
                    name="ICDCode"
                    fullWidth
                    margin="normal"
                    sx={{ mt: 2 }}
                    value={modalDataDisorder?.ICDCode}
                />
                <TextField
                    label="Red Required"
                    variant="outlined"
                    disabled={!isEditable}
                    onChange={handleDisorderChange}
                    name="redRequired"
                    fullWidth
                    margin="normal"
                    sx={{ mt: 2 }}
                    value={modalDataDisorder?.redRequired}
                />
                 <Button
            onClick={createMode ? handleAddDisorder : handleEditDisorder}
          >
            {isEditable ? "Save" : "Edit"}
          </Button>

            </Box>
        </Modal>
    )
}
