import React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

export default function QuestionModal({
  isModalOpenQuestions,
  closeModal,
  modalDataQuestions,
  isEditable,
  handleQuestionChange,
  handleAddQuestion,
  handleEditClickQuestion,
  createMode,
  closeAddQuestionModal,
  addRowToPossibleAnswers,
  removeRowToPossibleAnswers,
  handlePossibleAnswers,
  openModal,
}) {
  console.log("modalDQ:", modalDataQuestions);
  return (
    <Modal
      BackdropProps={{
        onClick: null, // Disable backdrop click
      }}
      open={isModalOpenQuestions}
      onClose={closeModal}
      aria-labelledby="modal-modal-title-questions"
      aria-describedby="modal-modal-description-questions"
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
        <Typography
          id="modal-modal-title-questions"
          variant="h6"
          component="h2"
        >
          Questions Modal
        </Typography>

        <Button
          edge="end"
          color="inherit"
          aria-label="close"
          onClick={closeAddQuestionModal}
        >
          <CloseIcon />
        </Button>

        <TextField
          label="Text"
          variant="outlined"
          disabled={!isEditable}
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          name="text"
          value={modalDataQuestions.text}
          onChange={handleQuestionChange}
        />

        <TextField
          label="Code"
          variant="outlined"
          disabled={!isEditable}
          onChange={handleQuestionChange}
          name="code"
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          value={modalDataQuestions.code}
        />

        <TextField
          label="Color"
          variant="outlined"
          disabled={!isEditable}
          onChange={handleQuestionChange}
          name="color"
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          value={modalDataQuestions.color}
        />

        <TextField
          label="Instructions"
          variant="outlined"
          disabled={!isEditable}
          onChange={handleQuestionChange}
          name="instructions"
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          value={modalDataQuestions.instructions}
        />

        <TextField
          label="Type"
          variant="outlined"
          disabled={!isEditable}
          onChange={handleQuestionChange}
          name="type"
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          value={modalDataQuestions.type}
        />

        <TextField
          label="Media URL"
          variant="outlined"
          disabled={!isEditable}
          onChange={handleQuestionChange}
          name="mediaUrl"
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          value={modalDataQuestions.mediaUrl}
        />

        <TextField
          label="Alternative Question"
          variant="outlined"
          disabled={!isEditable}
          onChange={handleQuestionChange}
          name="alternateQuestion"
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          value={modalDataQuestions.alternateQuestion}
        />

        <TextField
          label="Question Logic"
          variant="outlined"
          disabled={!isEditable}
          onChange={handleQuestionChange}
          name="questionLogic"
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          value={modalDataQuestions.questionLogic}
        />

        <TextField
          label="Summary"
          variant="outlined"
          disabled={!isEditable}
          onChange={handleQuestionChange}
          name="summary"
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          value={modalDataQuestions.summary}
        />

        <TextField
          label="Timer"
          variant="outlined"
          disabled={!isEditable}
          onChange={handleQuestionChange}
          name="timer"
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          value={modalDataQuestions.timer}
        />

        <FormLabel id="demo-controlled-radio-buttons-group">
          hasCustomPrompt
        </FormLabel>
        <RadioGroup
          name="hasCustomPrompt"
          value={modalDataQuestions.hasCustomPrompt ? "true" : "false"}
          onChange={handleQuestionChange}
          disabled={!isEditable}
        >
          <FormControlLabel value="true" control={<Radio />} label="true" />
          <FormControlLabel value="false" control={<Radio />} label="false" />
        </RadioGroup>

        <TextField
          label="CustomPrompt"
          variant="outlined"
          disabled={!isEditable}
          onChange={handleQuestionChange}
          name="customPrompt"
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          value={modalDataQuestions.customPrompt}
        />

        {modalDataQuestions.possibleAnswers &&
          modalDataQuestions.possibleAnswers.map((answer, aIndex) => (
            <div style={{ display: "flex" }}>
              <TextField
                style={{ marginRight: 4 }}
                label="Possible Answers - Code"
                variant="outlined"
                disabled={!isEditable}
                onChange={(e) => {
                  handlePossibleAnswers(e, aIndex);
                }}
                name="possibleAnswersCode"
                fullWidth
                margin="normal"
                sx={{ mt: 2 }}
                value={answer.code || ""}
              />

              <TextField
                label="Possible Answers - Text"
                variant="outlined"
                disabled={!isEditable}
                onChange={(e) => {
                  handlePossibleAnswers(e, aIndex);
                }}
                name="possibleAnswersText"
                fullWidth
                margin="normal"
                sx={{ mt: 2 }}
                value={answer.text || ""}
              />
              <Button onClick={() => addRowToPossibleAnswers()}>Add</Button>
              <Button onClick={() => removeRowToPossibleAnswers(aIndex)}>
                Remove
              </Button>
            </div>
          ))}

        <Button
          onClick={createMode ? handleAddQuestion : handleEditClickQuestion}
        >
          {isEditable ? "Save" : "Edit"}
        </Button>

        {/* <Button >
        Delete
      </Button> */}
      </Box>
    </Modal>
  );
}
