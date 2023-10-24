import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveIcon from "@mui/icons-material/Save";
import SettingsService from "../../../services/settings";
import { showErrorMessage, showSuccessMessage } from "../../../managers/utility";

export default function QuestionAnswerForm() {
  const [questionsAnswers, setQuestionsAnswers] = useState([
    { question: "", answers: [""] },
  ]);

  useEffect(() => {
    getQuestionAnswer();
  }, []);

  const getQuestionAnswer = async () => {
    const res = await SettingsService.getQuestionAnswer();
    if (res && res[0] && res[0].questionAnswers) {
      setQuestionsAnswers(res[0].questionAnswers);
    }
    console.log(res);
  };

  const handleQuestionChange = (index, e) => {
    const updatedQuestionsAnswers = [...questionsAnswers];
    updatedQuestionsAnswers[index].question = e.target.value.replace("$", "");
    setQuestionsAnswers(updatedQuestionsAnswers);
  };

  const handleAnswersChange = (event, index, answerIndex) => {
    let tempQA = [...questionsAnswers];
    const selectedIndex = tempQA[index];
    const newAnswers = selectedIndex.answers;
    newAnswers[answerIndex] = event.target.value;

    selectedIndex.answers = newAnswers;
    tempQA[index] = selectedIndex;
    setQuestionsAnswers(tempQA);
  };

  const addAnswerField = (index) => {
    const updatedQuestionsAnswers = [...questionsAnswers];
    updatedQuestionsAnswers[index].answers.push("");
    setQuestionsAnswers(updatedQuestionsAnswers);
  };

  const removeAnswerField = (index, answerIndex) => {
    const updatedQuestionsAnswers = [...questionsAnswers];
    updatedQuestionsAnswers[index].answers.splice(answerIndex, 1);
    setQuestionsAnswers(updatedQuestionsAnswers);
  };

  const addRemoveRow = (action, index) => {
    if (action === "ADD") {
      setQuestionsAnswers((prevState) => [
        ...prevState,
        { question: "", answers: [""] },
      ]);
    } else if (action === "REMOVE") {
      const updatedQuestionsAnswers = [...questionsAnswers];
      updatedQuestionsAnswers.splice(index, 1);
      setQuestionsAnswers(updatedQuestionsAnswers);
    }
  };

  const handleAddQuestion = async () => {
    const newQuestionData = {
      _id: {
        $oid: "6524aee1f523e3c3be4ba56f",
      },
      useLLM: false,
      questionAnswers: questionsAnswers,
    };
    try {
      const response = await SettingsService.addQuestionAnswer(newQuestionData);
      if (response._id) {
        showSuccessMessage("Saved")
        console.log("Question added successfully:", response.data);
        // Clear form fields or perform any other necessary actions
      } else {
        showErrorMessage("Failed to add the question");
      }
    } catch (error) {
      console.error("Error adding the question:", error);
    }
  };

  console.log(questionsAnswers);

  return (
    <div>
      {questionsAnswers.map((qa, index) => (
        <div key={index} style={{ display: "flex", marginTop: "10px" }}>
          <TextField
            label="Question"
            variant="outlined"
            value={qa.question}
            onChange={(e) => handleQuestionChange(index, e)}
          />
          {qa.answers.map((answer, answerIndex) => (
            <div
              key={answerIndex}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                sx={{ ml: 1 }}
                label="Answer"
                variant="outlined"
                value={answer}
                onChange={(e) => handleAnswersChange(e, index, answerIndex)}
              />
              {answerIndex > 0 && (
                <Button
                  variant="outlined"
                  sx={{ mt: 1 }}
                  onClick={() => removeAnswerField(index, answerIndex)}
                >
                  <RemoveIcon />
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outlined"
            sx={{ ml: 1 }}
            onClick={() => addAnswerField(index)}
          >
            <AddIcon />
          </Button>
          <div
            style={{
              marginLeft: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              fullWidth
              size="small"
              variant="outlined"
              onClick={() => addRemoveRow("ADD", index)}
            >{`Add Row`}</Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => addRemoveRow("REMOVE", index)}
            >
              Remove Row
            </Button>
          </div>
        </div>
      ))}

      <Button sx={{ mt: 3 }} variant="contained" onClick={handleAddQuestion}>
        Save <SaveIcon />
      </Button>
    </div>
  );
}
