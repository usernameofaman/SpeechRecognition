import React, { useState, useEffect } from 'react';
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

  const [allQuestionsAnswers, setAllQuestionsAnswers] = useState([])


  useEffect(() => {
    getQuestionAnswer();
  }, [])

  const getQuestionAnswer = async () => {
    const res = await SettingsService.getQuestionAnswer()
    if (res && res[0] && res[0].questionAnswers) {
      setAllQuestionsAnswers(res[0].questionAnswers)
    }
    console.log(res)
  }


  const handleQuestionChange = (item, e) => {
    let allQA = { ...allQuestionsAnswers }
    let values = allQA[item];
    delete allQA[item]
    allQA[e.target.value.replace("$","")] = values;
    setAllQuestionsAnswers(allQA)
  };


  const handleAnswersChange = (event) => {
    // Split the input value by newline or any other separator you are using
    const newAnswers = event.target.value.split('\n').map((answer) => answer.trim());
    setAnswersValue(newAnswers);
  };


  const addAnswerField = (item) => {
    let questionsAnswers = { ...allQuestionsAnswers };
    console.log(questionsAnswers)
    console.log(questionsAnswers[item])
    let values = questionsAnswers[item]
    values.push("")
    questionsAnswers[item] = values;
    setAllQuestionsAnswers(questionsAnswers)
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
      questionAnswers: allQuestionsAnswers
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


  const handleAnswers = (e, item , index) => {
    const allQA = {...allQuestionsAnswers};
    let values = allQA[item];
    values[index] = e.target.value;

    allQA[item] = values
    setAllQuestionsAnswers(allQA)
  }


  const addRemoveRow = (e, item) => {
    if (e.target.name === "ADD") {
      let questionsAnswers = { ...allQuestionsAnswers };
      questionsAnswers["$"] = [""]
      setAllQuestionsAnswers(questionsAnswers)
    }
    if (e.target.name === "REMOVE") {
      let questionsAnswers = { ...allQuestionsAnswers };
      delete questionsAnswers[item]
      setAllQuestionsAnswers(questionsAnswers)
    }
  }

  return (
    <div>
      {Object.keys(allQuestionsAnswers).map((item) => (
        <div style={{ display: 'flex', marginTop: "10px"}}>

          <TextField
            label="Question"
            variant="outlined"
            value={item}
            onChange={(e) => handleQuestionChange(item, e)}
          />
          {allQuestionsAnswers[item].map((answer, index) => (
            <div style={{ display: 'flex', flexDirection: "column", alignItems: "center" }} key={index}>
              <TextField
                sx={{ ml: 1 }}
                label="Answer"
                variant="outlined"
                value={answer}
                onChange={(e) => {
                  handleAnswers(e, item, index)
                }}
              />
              {index > 0 && (
                <Button variant='outlined' sx={{ mt: 1 }} onClick={() => removeAnswerField(index)}>
                  <RemoveIcon />
                </Button>
              )}
            </div>
          ))}
          <Button variant='outlined' sx={{ ml: 1 }} onClick={() => addAnswerField(item)}>
            <AddIcon />
          </Button>
          <div style={{ marginLeft:"10px", display: 'flex', flexDirection: "column", alignItems: "center" }}>
            <Button fullWidth size="small" variant='outlined' name="ADD" onClick={(e) => addRemoveRow(e, item)}>{`Add Row`}</Button>
            <Button size="small" variant='outlined' name="REMOVE" onClick={(e) => addRemoveRow(e, item)}>Remove Row</Button>
          </div>
        </div>
      ))}

      <Button sx={{ mt: 3 }} variant='contained' onClick={handleAddQuestion}>
        Save <SaveIcon />
      </Button>
    </div>
  );
}
