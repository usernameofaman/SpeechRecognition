import React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

export default function LotModal({
  isModalOpenLots,
  closeModal,
  modalDataLots,
  isEditable,
  handleLotChange,
  handleAddLot,
  handleEditClickLot,
  createMode,
  closeAddLotModal,
  addRowToLotQuestions,
  removeRowToLotQuestions,
  handleLotQuestions,
}) {
  console.log("createMode: ", createMode);
  return (
    <Modal
      BackdropProps={{
        onClick: null, // Disable backdrop click
      }}
      open={isModalOpenLots}
      onClose={closeModal}
      aria-labelledby="modal-modal-title-lots"
      aria-describedby="modal-modal-description-lots"
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
        <Typography id="modal-modal-title-lots" variant="h6" component="h2">
          LOTS Modal
        </Typography>
        <Button
          edge="end"
          color="inherit"
          aria-label="close"
          onClick={closeAddLotModal}
        >
          <CloseIcon />
        </Button>
        <TextField
          label="Lot Number"
          variant="outlined"
          disabled={!isEditable}
          onChange={handleLotChange}
          name="lotNumber"
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          value={modalDataLots?.lotNumber}
        />
        <TextField
          label="Name"
          variant="outlined"
          disabled={!isEditable}
          onChange={handleLotChange}
          name="name"
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          value={modalDataLots?.name}
        />

        {modalDataLots.questions &&
          modalDataLots.questions.map((answer, aIndex) => (
            <div style={{ display: "flex" }}>
              <TextField
                style={{ marginRight: 4 }}
                label="Code"
                variant="outlined"
                disabled={!isEditable}
                onChange={(e) => {
                  handleLotQuestions(e, aIndex);
                }}
                name="lotquesec"
                fullWidth
                margin="normal"
                sx={{ mt: 2 }}
                value={answer || ""}
              />

              <Button onClick={() => addRowToLotQuestions()}>Add</Button>
              <Button onClick={() => removeRowToLotQuestions(aIndex)}>
                Remove
              </Button>
            </div>
          ))}

        <Button onClick={createMode ? handleAddLot : handleEditClickLot}>
          {isEditable ? "Save" : "Edit"}
        </Button>
      </Box>
    </Modal>
  );
}
