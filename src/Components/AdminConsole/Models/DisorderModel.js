import React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

export default function DisorderModel({
  isModalOpenDisorder,
  closeModal,
  modalDataDisorder,
  isEditable,
  handleDisorderChange,
  handleAddDisorder,
  handleEditDisorder,
  createMode,
  closeAddDisorderModal,
  handleDisorderQuestions,
  addRowToDisorderRedQuestions,
  removeRowToDisorderRedQuestions,
  addRowToDisorderBlueQuestions,
  removeRowToDisorderBlueQuestions,
  addRowToDisorderBlackQuestions,
  removeRowToDisorderBlackQuestions,
  addRowToDisorderGreenQuestions,
  removeRowToDisorderGreenQuestions,
}) {
  console.log(modalDataDisorder.questions, "modalDataDisorder.ques consolelog");
  console.log(isEditable, "isEditable State||", createMode, "createMode");

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
          maxHeight: 500,
          overflow: "scroll",
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

        {modalDataDisorder.redQuestions &&
          modalDataDisorder.redQuestions.map((answer, qIndex) => (
            <div style={{ display: "flex" }}>
              <TextField
                style={{ marginRight: 4 }}
                label="redQuestions"
                variant="outlined"
                disabled={!isEditable}
                onChange={(e) => {
                  handleDisorderQuestions(e, qIndex, "redQuestions");
                }}
                name="redQuestions"
                fullWidth
                margin="normal"
                sx={{ mt: 2 }}
                value={answer || ""}
              />
              <Button onClick={() => addRowToDisorderRedQuestions()}>
                Add
              </Button>
              <Button onClick={() => removeRowToDisorderRedQuestions(qIndex)}>
                Remove
              </Button>
            </div>
          ))}

        {modalDataDisorder.blackQuestions &&
          modalDataDisorder.blackQuestions.map((answer, qIndex) => (
            <div style={{ display: "flex" }}>
              <TextField
                style={{ marginRight: 4 }}
                label="blackQuestions"
                variant="outlined"
                disabled={!isEditable}
                onChange={(e) => {
                  handleDisorderQuestions(e, qIndex, "blackQuestions");
                }}
                name="blackQuestions"
                fullWidth
                margin="normal"
                sx={{ mt: 2 }}
                value={answer || ""}
              />
              <Button onClick={() => addRowToDisorderBlackQuestions()}>
                Add
              </Button>
              <Button onClick={() => addRowToDisorderBlackQuestions(qIndex)}>
                Remove
              </Button>
            </div>
          ))}

        {modalDataDisorder.blueQuestions &&
          modalDataDisorder.blueQuestions.map((answer, qIndex) => (
            <div style={{ display: "flex" }}>
              <TextField
                style={{ marginRight: 4 }}
                label="blueQuestions"
                variant="outlined"
                disabled={!isEditable}
                onChange={(e) => {
                  handleDisorderQuestions(e, qIndex, "blueQuestions");
                }}
                name="blueQuestions"
                fullWidth
                margin="normal"
                sx={{ mt: 2 }}
                value={answer || ""}
              />
              <Button onClick={() => addRowToDisorderBlueQuestions()}>
                Add
              </Button>
              <Button onClick={() => removeRowToDisorderBlueQuestions(qIndex)}>
                Remove
              </Button>
            </div>
          ))}

        {modalDataDisorder.greenQuestions &&
          modalDataDisorder.greenQuestions.map((answer, qIndex) => (
            <div style={{ display: "flex" }}>
              <TextField
                style={{ marginRight: 4 }}
                label="greenQuestions"
                variant="outlined"
                disabled={!isEditable}
                onChange={(e) => {
                  handleDisorderQuestions(e, qIndex, "greenQuestions");
                }}
                name="greenQuestions"
                fullWidth
                margin="normal"
                sx={{ mt: 2 }}
                value={answer || ""}
              />
              <Button onClick={() => addRowToDisorderGreenQuestions()}>
                Add
              </Button>
              <Button onClick={() => removeRowToDisorderGreenQuestions(qIndex)}>
                Remove
              </Button>
            </div>
          ))}

        <Button onClick={createMode ? handleAddDisorder : handleEditDisorder}>
          {isEditable ? "Save" : "Edit"}
        </Button>
      </Box>
    </Modal>
  );
}
