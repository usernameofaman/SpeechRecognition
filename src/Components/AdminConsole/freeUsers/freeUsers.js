import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveIcon from "@mui/icons-material/Save";
import SettingsService from "../../../services/settings";
import { showErrorMessage, showSuccessMessage } from "../../../managers/utility";

export default function FreeUsers() {
  const [lotNumber, setLotNumber] = useState([
    { lotNumber: [""] },
  ]);

  useEffect(() => {
    getFreeUsers();
  }, []);

  const getFreeUsers = async () => {
    const res = await SettingsService.getFreeUsers();
    if (res && res[0] && res[0].freeUsers) {
      setLotNumber(res[0].freeUsers);
    }
    console.log(res);
  };



  const handleLotChange = (event, index, lotIndex) => {
    let tempLot = [...lotNumber];
    const selectedIndex = tempLot[index];
    const newLotNum = selectedIndex.lotNumber;
    newLotNum[lotIndex] = event.target.value;

    selectedIndex.lotNumber = newLotNum;
    tempLot[index] = selectedIndex;
    setLotNumber(tempLot);
  };

  const addAnswerField = (index) => {
    const updatedLotNumber = [...lotNumber];
    updatedLotNumber[index].lotNumber.push("");
    setLotNumber(updatedLotNumber);
  };

  const removeAnswerField = (index, answerIndex) => {
    const updatedLotNumber = [...lotNumber];
    updatedLotNumber[index].lotNumber.splice(answerIndex, 1);
    setLotNumber(updatedLotNumber);
  };

//   const addRemoveRow = (action, index) => {
//     if (action === "ADD") {
//       setQuestionsAnswers((prevState) => [
//         ...prevState,
//         { question: "", answers: [""] },
//       ]);
//     } else if (action === "REMOVE") {
//       const updatedQuestionsAnswers = [...questionsAnswers];
//       updatedQuestionsAnswers.splice(index, 1);
//       setQuestionsAnswers(updatedQuestionsAnswers);
//     }
//   };

  const handleAddQuestion = async () => {
    const newFreeUserData = {
      _id: {
        $oid: "6524aee1f523e3c3be4ba56f",
      },
      useLLM: false,
      freeUsers : lotNumber
    };
    try {
      const response = await SettingsService.addFreeUsers(newFreeUserData);
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


  return (
    <div>
      {lotNumber.map((qa, index) => (
        <div key={index} style={{ display: "flex", marginTop: "10px" }}>
          
          {qa.lotNumber.map((answer, lotIndex) => (
            <div
              key={lotIndex}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                sx={{ ml: 1 }}
                label="LotNumber"
                variant="outlined"
                value={answer}
                onChange={(e) => handleLotChange(e, index, lotIndex)}
              />
              {lotIndex > 0 && (
                <Button
                  variant="outlined"
                  sx={{ mt: 1 }}
                  onClick={() => removeAnswerField(index, lotIndex)}
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
          {/* <div
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
          </div> */}
        </div>
      ))}

      <Button sx={{ mt: 3 }} variant="contained" onClick={handleAddQuestion}>
        Save <SaveIcon />
      </Button>
    </div>
  );
}
