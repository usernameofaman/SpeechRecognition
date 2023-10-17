import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from '@mui/icons-material/Save';
import SettingsService from '../../../services/settings';

export default function QuestionAnswerForm() {
  const [qaPairs, setQAPairs] = useState([{ question: '', answers: [''] }]);
  const [questionsAns, setQuestionsAns] = useState([]);

  const handleAddRow = () => {
    const newQAPairs = [...qaPairs];
    newQAPairs.push({ question: '', answers: [''] });
    setQAPairs(newQAPairs);
  };

  const handleRemoveRow = (qaIndex) => {
    const newQAPairs = [...qaPairs];
    newQAPairs.splice(qaIndex, 1);
    setQAPairs(newQAPairs);
  };

  const handleAddAnswer = (qaIndex) => {
    const newQAPairs = [...qaPairs];
    newQAPairs[qaIndex].answers.push('');
    setQAPairs(newQAPairs);
  };

  const handleRemoveAnswer = (qaIndex, answerIndex) => {
    const newQAPairs = [...qaPairs];
    newQAPairs[qaIndex].answers.splice(answerIndex, 1);
    setQAPairs(newQAPairs);
  };

  const [existingQuesAns, SetExistingQuesAns] = useState([])
  const getQnA = async () => {
    const questionsAnsaAll = await SettingsService.getQuestionAnswer();
    
    SetExistingQuesAns(existingQuesAns)
    }
  

  useEffect(() => {
getQnA()
}, []);

console.log("existingQuestionAns Data", existingQuesAns)

  const handleAddQuestion = async () => {
    const newQuestionData = {
      _id: {
        $oid: '6524aee1f523e3c3be4ba56f',
      },
      useLLM: false,
      questionAnswers: {
        ...existingQuesAns.questionAnswers, // Spread the existing questions and answers
        [qaPairs[qaPairs.length - 1].question]: qaPairs[qaPairs.length - 1].answers,
      },
    };
  
    try {
      const response = await SettingsService.addQuestionAnswer(newQuestionData);
      if (response.status === 200) {
        console.log('Question added successfully:', response.data);
        // Clear form fields or perform any other necessary actions
        const newQAPairs = [...qaPairs];
        newQAPairs[qaPairs.length - 1] = { question: '', answers: [''] };
        setQAPairs(newQAPairs);
        // Save the updated questionAnswers state
        SetExistingQuesAns(newQuestionData.questionAnswers);
      } else {
        console.error('Failed to add the question');
      }
    } catch (error) {
      console.error('Error adding the question:', error);
    }
  };
  
  

  return (
    <div>
      {qaPairs.map((qaPair, qaIndex) => (
        <div key={qaIndex}>
          <TextField
            label="Question"
            variant="outlined"
            value={qaPair.question}
            onChange={(e) => {
              const newQAPairs = [...qaPairs];
              newQAPairs[qaIndex].question = e.target.value;
              setQAPairs(newQAPairs);
            }}
          />
          {qaPair.answers.map((answer, answerIndex) => (
            <div key={answerIndex}>
              <TextField
                label="Answer"
                variant="outlined"
                value={answer}
                onChange={(e) => {
                  const newQAPairs = [...qaPairs];
                  newQAPairs[qaIndex].answers[answerIndex] = e.target.value;
                  setQAPairs(newQAPairs);
                }}
              />
              <Button onClick={() => handleRemoveAnswer(qaIndex, answerIndex)}>
                <RemoveIcon />
              </Button>
            </div>
          ))}
          <Button onClick={() => handleAddAnswer(qaIndex)}>Add Answer</Button>
          {qaPairs.length > 1 && (
            <Button onClick={() => handleRemoveRow(qaIndex)}>Remove Row</Button>
          )}
        </div>
      ))}
      <Button onClick={() => handleAddRow()}>Add Row</Button>
      <Button onClick={handleAddQuestion}>
        <SaveIcon />
      </Button>
    </div>
  );
}