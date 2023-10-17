import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from '@mui/icons-material/Save';
import SettingsService from '../../../services/settings';

export default function QuestionAnswerForm() {
  const [answersValue, setAnswersValue] = useState(['']);
  const [questionValue, setQuestionValue] = useState(''); // State for the question
  const [questionData, setQuestionData] = useState(null);

  const handleQuestionChange = (event) => {
    setQuestionValue(event.target.value);
  };


  const handleAnswersChange = (event) => {
    // Split the input value by newline or any other separator you are using
    const newAnswers = event.target.value.split('\n').map((answer) => answer.trim());
    setAnswersValue(newAnswers);
  };

  console.log("QuestionValue", questionValue);
  console.log("answerValue", answersValue)

  const addAnswerField = () => {
    const newAnswerFields = [...answersValue, ''];
    setAnswersValue(newAnswerFields);
  };

  const removeAnswerField = (index) => {
    const newAnswerFields = [...answersValue];
    newAnswerFields.splice(index, 1);
    setAnswersValue(newAnswerFields);
  };

  const handleAddQuestion = async () => {
    // Create the question data object
    const newQuestionData = {
      _id: {
        $oid: '6524aee1f523e3c3be4ba56f',
      },
      useLLM: false,
      questionAnswers: {
        [questionValue.toString()]: answersValue,
      },
    };
 console.log(newQuestionData, "this is newRequestData")
    try {
      const response = await SettingsService.addQuestionAnswer(newQuestionData);
      if (response.status === 200) {
        console.log('Question added successfully:', response.data);
        // Clear form fields or perform any other necessary actions
        setQuestionValue('');
        setAnswersValue(['']);
      } else {
        console.error('Failed to add the question');
      }
    } catch (error) {
      console.error('Error adding the question:', error);
    }

    console.log(newQuestionData);

    // Reset the form
    setQuestionValue('');
  };

  return (
    <div>
      <TextField
        label="Question"
        variant="outlined"
        value={questionValue}
        onChange={handleQuestionChange}
      />
      <div style={{ display: 'flex' }}>
        {answersValue.map((answer, index) => (
          <div key={index}>
            <TextField
              label="Answer"
              variant="outlined"
              value={answer}
              onChange={(e) => {
                const newAnswerFields = [...answersValue];
                newAnswerFields[index] = e.target.value;
                setAnswersValue(newAnswerFields);
              }}
            />
            {index > 0 && (
              <Button onClick={() => removeAnswerField(index)}>
                <RemoveIcon />
              </Button>
            )}
          </div>
        ))}
        <Button onClick={addAnswerField}>
          <AddIcon />
        </Button>
      </div>
      <Button onClick={handleAddQuestion}>
        <SaveIcon />
      </Button>
    </div>
  );
}
