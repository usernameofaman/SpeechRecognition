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
import { FormControl, MenuItem, Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import { QuestionsService } from "../../../services";
import "../../../styles.css"

export default function QuestionModal({
  isModalOpenQuestions,
  closeModal,
  selectedQuestion,
  isEditable,
  createMode,
  closeAddQuestionModal,
  setIsEditable,
  setSelectedQuestion
}) {

  const handleAddQuestion = async () => {
    let requestData = { ...selectedQuestion };
    const response = await QuestionsService.addQuestion(requestData);
    if (response._id) {
      closeModal();
      window.alert("Question Added")
    } else {
      window.alert("Error while adding question")
    }
  };


  const handleQuestionChange = (e) => {
    setSelectedQuestion({
      ...selectedQuestion,
      [e.target.name]: e.target.value,
    });
  };



  const handleEditClickQuestion = async () => {
    if (isEditable) {
      let requestData = { ...selectedQuestion };
      const response = await QuestionsService.updateQuestion(requestData);
      if (response._id) {
        setIsEditable(false); // Disable edit mode after saving
      } else {
        window.alert("API Failed");
      }
    } else {
      setIsEditable(true); // Enable edit mode
    }
  };



  const addRowToPossibleAnswers = () => {
    let state = { ...selectedQuestion };
    let answers = state.possibleAnswers;
    answers.push({ code: "", text: "" });
    state.possibleAnswers = answers;
    setSelectedQuestion(state);
  };

  const removeRowToPossibleAnswers = (index) => {
    let state = { ...selectedQuestion };
    let answers = state.possibleAnswers;
    answers.splice(index, 1);
    state.possibleAnswers = answers;
    setSelectedQuestion(state);
  };


  const handlePossibleAnswers = (e, aIndex) => {
    let state = { ...selectedQuestion };
    let answers = state.possibleAnswers;
    let currentAnswer = answers[aIndex];

    if (e.target.name === "possibleAnswersCode") {
      currentAnswer.code = e.target.value;
    } else {
      currentAnswer.text = e.target.value;
    }

    answers[aIndex] = currentAnswer;
    state.possibleAnswers = answers;
    setSelectedQuestion(state);
  };


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
          '&::-webkit-scrollbar': {
            width: '12px', // Adjust as needed
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#000',
            width: '8px', // Adjust as needed
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
            width: '8px', // Adjust as needed
          },
        }}
      >
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", borderBottom: "3px dotted cfcfcf" }}>

          <Typography
            id="modal-modal-title-questions"
            variant="h6"
            component="h2"
          >
            Questions Modal
          </Typography>
          <Button
            variant="contained"
            onClick={createMode ? handleAddQuestion : handleEditClickQuestion}
          >
            {isEditable ? "Save" : "Edit"}
          </Button>
          <Button
            edge="end"
            color="inherit"
            aria-label="close"
            onClick={closeAddQuestionModal}
          >
            <CloseIcon />
          </Button>
        </div>

        <TextField
          label="Text"
          variant="outlined"
          disabled={!isEditable}
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          name="text"
          value={selectedQuestion.text}
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
          value={selectedQuestion.code}
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
          value={selectedQuestion.instructions}
        />

        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            name="type"
            value={selectedQuestion.type}
            label="Type"
            onChange={handleQuestionChange}
          >
            <MenuItem value={"TEXT"}>TEXT</MenuItem>
            <MenuItem value={"VIDEO"}>VIDEO</MenuItem>
            <MenuItem value={"IMAGE"}>IMAGE</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Media URL"
          variant="outlined"
          disabled={!isEditable}
          onChange={handleQuestionChange}
          name="mediaUrl"
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          value={selectedQuestion.mediaUrl}
        />

        <FormControl fullWidth>
          <InputLabel>LLM Used</InputLabel>
          <Select
            name="llmUsed"
            value={selectedQuestion.llmUsed}
            label="LLM Used"
            onChange={handleQuestionChange}
          >
            <MenuItem value={"SMALL"}>Small</MenuItem>
            <MenuItem value={"LARGE"}>Large</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Alternative Question"
          variant="outlined"
          disabled={!isEditable}
          onChange={handleQuestionChange}
          name="alternateQuestion"
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          value={selectedQuestion.alternateQuestion}
        />

<TextField
          label="Alternate Prompt"
          variant="outlined"
          disabled={!isEditable || !selectedQuestion.alternateQuestion }
          onChange={handleQuestionChange}
          name="alternatePrompt"
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          value={selectedQuestion.alternatePrompt}
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
          value={selectedQuestion.questionLogic}
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
          value={selectedQuestion.summary}
        />


        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Timer</InputLabel>
          <Select
            value={selectedQuestion.timer}
            label="Timer"
            name="timer"
            onChange={handleQuestionChange}
          >
            <MenuItem value={"LOW"}>Low</MenuItem>
            <MenuItem value={"MEDIUM"}>Medium</MenuItem>
            <MenuItem value={"HIGH"}>High</MenuItem>
          </Select>
        </FormControl>

        <FormLabel id="demo-controlled-radio-buttons-group">
          Does this question require custom prompt ?
        </FormLabel>
        <RadioGroup
          name="hasCustomPrompt"
          value={selectedQuestion.hasCustomPrompt === "true" ? "true" : "false"}
          onChange={handleQuestionChange}
          disabled={!isEditable}
        >
          <FormControlLabel value="true" control={<Radio />} label="Yes" />
          <FormControlLabel value="false" control={<Radio />} label="No" />
        </RadioGroup>
        {selectedQuestion.hasCustomPrompt === "true" &&
          <TextField
            label="CustomPrompt"
            variant="outlined"
            disabled={!isEditable}
            onChange={handleQuestionChange}
            name="customPrompt"
            fullWidth
            margin="normal"
            sx={{ mt: 2 }}
            value={selectedQuestion.customPrompt}
          />}
        Note : Please remove any item that does not have a value
        {selectedQuestion.possibleAnswers &&
          selectedQuestion.possibleAnswers.map((answer, aIndex) => (
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
        {/* <Button >
        Delete
      </Button> */}
      </Box>
    </Modal>
  );
}
