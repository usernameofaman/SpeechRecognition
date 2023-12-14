import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import LlmService from "../../../../services/llmAns";
import { showErrorMessage, showSuccessMessage } from "../../../../managers/utility";

export default function LLMAnswerForm() {
  const [questionsAnswers, setQuestionsAnswers] = useState([
    { question: "", answers: [""] },
  ]);

  useEffect(() => {
    getLLMQuestionAnswer();
  }, []);

  const getLLMQuestionAnswer = async () => {
    const res = await LlmService.getLLMQuestionAnswer();
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

  const addRemoveRow = (action, index) => {
    if (action === "ADD") {
      setQuestionsAnswers((prevState) => {
        const updatedQuestionsAnswers = [...prevState];
        updatedQuestionsAnswers.splice(index + 1, 0, { question: "", answers: [""] });
        return updatedQuestionsAnswers;
      });
    } else if (action === "REMOVE") {
      if (questionsAnswers.length > 1) {
        setQuestionsAnswers((prevState) => {
          const updatedQuestionsAnswers = [...prevState];
          updatedQuestionsAnswers.splice(index, 1);
          return updatedQuestionsAnswers;
        });
      }
    }
  };
  

  const handleSaveQuestion = async () => {
    const newQuestionData = {
      _id: {
        $oid: "6524aee1f523e3c3be4ba56f",
      },
      useLLM: false,
      questionAnswers: questionsAnswers,
    };
    try {
      const response = await LlmService.addLLMQuestionAnswer(newQuestionData);
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
    <div style={{width:"100%"}}>
      <Button sx={{ mt: 3 }} variant="contained" onClick={handleSaveQuestion}>
        Save <SaveIcon />
      </Button>
    </div>
      {questionsAnswers.map((qa, index) => (
        <div key={index} style={{ display: "flex", marginTop: "10px", width:"100%"}}>
          <TextField
            label="Question"
            variant="outlined"
            value={qa.question}
            style={{width:"15%"}}
            onChange={(e) => handleQuestionChange(index, e)}
          />
          {qa.answers.map((answer, answerIndex) => (
            <div
              key={answerIndex}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width:"70%"
              }}
            >
              <TextField
                sx={{ ml: 1}}
                label="Answer"
                variant="outlined"
                value={answer}
                style={{width:"100%"}}
                onChange={(e) => handleAnswersChange(e, index, answerIndex)}
              />
         </div>
          ))}
          <div
            style={{
              marginLeft: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width:"12%"
            }}
          >
            <Button
              fullWidth
              size="small"
              variant="outlined"
              style={{margin:"2px"}}
              onClick={() => addRemoveRow("ADD", index)}
            >{`Add Row`}</Button>
            <Button
              fullWidth
              size="small"
              variant="outlined"
              onClick={() => addRemoveRow("REMOVE", index)}
            >
              Remove Row
            </Button>
          </div>
        </div>
      ))}

    </div>
  );
}
