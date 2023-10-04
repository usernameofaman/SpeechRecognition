import React from 'react'
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";


export default function DisorderModel({ isModalOpenDisorder, closeModal, modalDataDisorder }) {
    return (
        <Modal
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
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    sx={{ mt: 2 }}
                    value={modalDataDisorder?.name}
                />
                <TextField
                    label="Red Required"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    sx={{ mt: 2 }}
                    value={modalDataDisorder?.redRequired}
                />

            </Box>
        </Modal>
    )
}
