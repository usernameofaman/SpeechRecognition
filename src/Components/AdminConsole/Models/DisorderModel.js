import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import AutoCompleteLot from "./disorderQuestionSelector";
import { DisorderService, QuestionsService } from "../../../services";

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
  addRowToDisorderYellowQuestions,
  removeRowToDisorderYellowQuestions,
  addRowToDisordervoiletQuestions,
  removeRowToDisordervoiletQuestions,
  addRowToDisorderMaroonQuestions,
  removeRowToDisorderMaroonQuestions,
  setModalDataDisorder,
}) {
  ;
  ;

  useEffect(() => {
    getAllQuestionsData()
  }, [])


  const [possibleAnswers, setPossibleAnswers] = useState([])
  const getAllQuestionsData = async () => {
    const questionsAll = await QuestionsService.getAllQuestionsData();

    const extractInfo = (question) => {
      const { text: questionText, possibleAnswers } = question;

      // Create a separate object for each possible answer
      const extractedObjects = possibleAnswers.map((answer) => ({
        questionText,
        possibleAnswerCode: answer.code,
        possibleAnswerText: answer.text,
      }));

      return extractedObjects;
    };
    // Apply the function to each question in the array
    const newArray = questionsAll.map(extractInfo);
    const mergedArray = [].concat(...newArray);

    setPossibleAnswers(mergedArray)
  }



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
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", borderBottom: "3px dotted cfcfcf" }}>
          <Typography id="modal-modal-title-disorder" variant="h6" component="h2">
            Disorder Modal
          </Typography>
          <Button variant="contained" onClick={createMode ? handleAddDisorder : handleEditDisorder}>
            {isEditable ? "Save" : "Edit"}
          </Button>
          <Button
            edge="end"
            color="inherit"
            aria-label="close"
            onClick={closeAddDisorderModal}
          >
            <CloseIcon />
          </Button>
        </div>
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
          label="Which Lot it belongs to?"
          variant="outlined"
          disabled={!isEditable}
          onChange={handleDisorderChange}
          name="lotId"
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          value={modalDataDisorder?.lotId}
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
          modalDataDisorder.redQuestions.map((answer, aIndex) => (
            <div style={{ display: "flex", width: "100%" }}>
              <AutoCompleteLot
                setModalDataDisorder={setModalDataDisorder}
                modalDataDisorder={modalDataDisorder}
                data={answer}
                disabled={!isEditable}
                possibleAnswers={possibleAnswers}
                setData={setModalDataDisorder}
                name="red"
              />
              <Button onClick={() => addRowToDisorderRedQuestions()}>
                Add
              </Button>
              <Button onClick={() => removeRowToDisorderRedQuestions(aIndex)}>
                Remove
              </Button>
            </div>
          ))}

        <TextField
          label="Blue Required"
          variant="outlined"
          disabled={!isEditable}
          onChange={handleDisorderChange}
          name="blueRequired"
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          value={modalDataDisorder?.blueRequired}
        />
        {modalDataDisorder.blueQuestions &&
          modalDataDisorder.blueQuestions.map((answer, aIndex) => (
            <div style={{ display: "flex", width: "100%" }}>
              <AutoCompleteLot
                setModalDataDisorder={setModalDataDisorder}
                modalDataDisorder={modalDataDisorder}
                data={answer}
                disabled={!isEditable}
                possibleAnswers={possibleAnswers}
                setData={setModalDataDisorder}
                name="blue"
              />
              <Button onClick={() => addRowToDisorderBlueQuestions()}>
                Add
              </Button>
              <Button onClick={() => removeRowToDisorderBlueQuestions(aIndex)}>
                Remove
              </Button>
            </div>
          ))}

        <TextField
          label="Black Required"
          variant="outlined"
          disabled={!isEditable}
          onChange={handleDisorderChange}
          name="blackRequired"
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          value={modalDataDisorder?.blackRequired}
        />
        {modalDataDisorder.blackQuestions &&
          modalDataDisorder.blackQuestions.map((answer, aIndex) => (
            <div style={{ display: "flex", width: "100%" }}>
              <AutoCompleteLot
                setModalDataDisorder={setModalDataDisorder}
                modalDataDisorder={modalDataDisorder}
                data={answer}
                disabled={!isEditable}
                possibleAnswers={possibleAnswers}
                setData={setModalDataDisorder}
                name="black"
              />
              <Button onClick={() => addRowToDisorderBlackQuestions()}>
                Add
              </Button>
              <Button onClick={() => removeRowToDisorderBlackQuestions(aIndex)}>
                Remove
              </Button>
            </div>
          ))}
        <TextField
          label="Green Required"
          variant="outlined"
          disabled={!isEditable}
          onChange={handleDisorderChange}
          name="greenRequired"
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          value={modalDataDisorder?.greenRequired}
        />

        {modalDataDisorder.greenQuestions &&
          modalDataDisorder.greenQuestions.map((answer, aIndex) => (
            <div style={{ display: "flex", width: "100%" }}>
              <AutoCompleteLot
                setModalDataDisorder={setModalDataDisorder}
                modalDataDisorder={modalDataDisorder}
                data={answer}
                disabled={!isEditable}
                possibleAnswers={possibleAnswers}
                setData={setModalDataDisorder}
                name="green"
              />
              <Button onClick={() => addRowToDisorderGreenQuestions()}>
                Add
              </Button>
              <Button onClick={() => removeRowToDisorderGreenQuestions(aIndex)}>
                Remove
              </Button>
            </div>
          ))}
        <TextField
          label="Yellow Required"
          variant="outlined"
          disabled={!isEditable}
          onChange={handleDisorderChange}
          name="yellowRequired"
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          value={modalDataDisorder?.yellowRequired}
        />

        {modalDataDisorder.yellowQuestions &&
          modalDataDisorder.yellowQuestions.map((answer, aIndex) => (
            <div style={{ display: "flex", width: "100%" }}>
              <AutoCompleteLot
                setModalDataDisorder={setModalDataDisorder}
                modalDataDisorder={modalDataDisorder}
                data={answer}
                disabled={!isEditable}
                possibleAnswers={possibleAnswers}
                setData={setModalDataDisorder}
                name="yellow"
              />
              <Button onClick={() => addRowToDisorderYellowQuestions()}>
                Add
              </Button>
              <Button onClick={() => removeRowToDisorderYellowQuestions(aIndex)}>
                Remove
              </Button>
            </div>
          ))}

        <TextField
          label="voilet Required"
          variant="outlined"
          disabled={!isEditable}
          onChange={handleDisorderChange}
          name="voiletRequired"
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          value={modalDataDisorder?.voiletRequired}
        />
        {modalDataDisorder.voiletQuestions &&
          modalDataDisorder.voiletQuestions.map((answer, aIndex) => (
            <div style={{ display: "flex", width: "100%" }}>
              <AutoCompleteLot
                setModalDataDisorder={setModalDataDisorder}
                modalDataDisorder={modalDataDisorder}
                data={answer}
                disabled={!isEditable}
                possibleAnswers={possibleAnswers}
                setData={setModalDataDisorder}
                name="voilet"
              />
              <Button onClick={() => addRowToDisordervoiletQuestions()}>
                Add
              </Button>
              <Button onClick={() => removeRowToDisordervoiletQuestions(aIndex)}>
                Remove
              </Button>
            </div>
          ))}
        <TextField
          label="Maroon Required"
          variant="outlined"
          disabled={!isEditable}
          onChange={handleDisorderChange}
          name="blackRequired"
          fullWidth
          margin="normal"
          sx={{ mt: 2 }}
          value={modalDataDisorder?.maroonRequired}
        />

        {modalDataDisorder.maroonQuestions &&
          modalDataDisorder.maroonQuestions.map((answer, aIndex) => (
            <div style={{ display: "flex", width: "100%" }}>
              <AutoCompleteLot
                setModalDataDisorder={setModalDataDisorder}
                modalDataDisorder={modalDataDisorder}
                data={answer}
                disabled={!isEditable}
                possibleAnswers={possibleAnswers}
                setData={setModalDataDisorder}
                name="maroon"
              />
              <Button onClick={() => addRowToDisorderMaroonQuestions()}>
                Add
              </Button>
              <Button onClick={() => removeRowToDisorderMaroonQuestions(aIndex)}>
                Remove
              </Button>
            </div>
          ))}

        {/* {modalDataDisorder.redQuestions &&
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
          ))} */}

      </Box>
    </Modal>
  );
}

