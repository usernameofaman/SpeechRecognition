import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import DisorderModel from "./Models/DisorderModel";
import DeleteDialog from "./Models/deleteDialog";
import { QuestionsService } from "../../services";
import { LotService } from "../../services";
import { DisorderService } from "../../services";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

function DataTable({ activeTab, allQuestionsData, allLots, allDisorderData }) {
  // State for Questions
  const [isModalOpenQuestions, setIsModalOpenQuestions] = useState(false);
  const [modalDataQuestions, setModalDataQuestions] =
    useState(allQuestionsData);
  const [isEditable, setIsEditable] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [questionRadiovalue, setQuestionRadioValue] = React.useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  console.log("createMode", createMode);

  // State for LOTS
  const [selectedRowLots, setSelectedRowLots] = useState(null);
  const [isModalOpenLots, setIsModalOpenLots] = useState(false);
  const [modalDataLots, setModalDataLots] = useState({});

  // State for Disorder
  const [selectedRowDisorder, setSelectedRowDisorder] = useState(null);
  const [isModalOpenDisorder, setIsModalOpenDisorder] = useState(false);
  const [modalDataDisorder, setModalDataDisorder] = useState({});

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleQuestionChange = (e) => {
    console.log(modalDataQuestions);
    setQuestionRadioValue(e.target.value);
    setModalDataQuestions({
      ...modalDataQuestions,
      [e.target.name]: e.target.value,
    });
  };

  const handlePossibleAnswers = (e, aIndex) => {
    let state = { ...modalDataQuestions };
    let answers = state.possibleAnswers;
    let currentAnswer = answers[aIndex];

    if (e.target.name === "possibleAnswersCode") {
      currentAnswer.code = e.target.value
    } else {
      currentAnswer.text = e.target.value
    }

    answers[aIndex] = currentAnswer;
    state.possibleAnswers = answers;
    setModalDataQuestions(state)

    console.log(currentAnswer);
  }

  const handleLotChange = (e) => {
    console.log(modalDataLots);
    setModalDataLots({
      ...modalDataLots,
      [e.target.name]: e.target.value,
    });
  };

  const handleDisorderChange = (e) => {
    console.log(modalDataDisorder);
    setModalDataDisorder({
      ...modalDataDisorder,
      [e.target.name]: e.target.value,
    });
  };

  const deleteQuestion = async () => {

    let requestData = { ...modalDataQuestions };
    console.log("reqD :", requestData._id);
    const response = await QuestionsService.deleteQuestion(requestData);
    console.log("resD :", response);

    if (response._id) {
      window.alert("Successfully Deleted");
    } else {
      window.alert("API Failed");
    }

  }

  //Aman's Code

  // const handleEditClickQuestion = async () => {
  //   if (createMode) {
  //     let requestData = { ...modalDataQuestions };
  //     console.log("reqD :", requestData);
  //     const response = await QuestionsService.updateQuestion(requestData);
  //     console.log("resD :", response);

  //     if (response._id) {
  //     } else {
  //       window.alert("API Failed");
  //     }
  //   } else {
  //     setIsEditable(!isEditable);
  //   }
  // };

  //Updated with GPT
  const handleEditClickQuestion = async () => {
    if (isEditable) {
      let requestData = { ...modalDataQuestions };
      console.log("reqD :", requestData._id);
      const response = await QuestionsService.updateQuestion(requestData);
      console.log("resD :", response);

      if (response._id) {
        setIsEditable(false); // Disable edit mode after saving
      } else {
        window.alert("API Failed");
      }
    } else {
      setIsEditable(true); // Enable edit mode
    }
  };



  // const startAddQuestion = () => {
  //   setModalDataQuestions({});
  //   setIsModalOpenQuestions(true);
  //   setIsEditable(true);
  //   setCreateMode(true);
  // };

  const startAddQuestion = () => {
    setModalDataQuestions({});
    setCreateMode(true);
    setModalDataLots({});
    setCreateMode(true);
    setModalDataDisorder({});
    setCreateMode(true);

    if (activeTab === 'Questions') {
      setIsModalOpenQuestions(true);
      setIsEditable(true);
    } else if (activeTab === 'LOTS') {
      // Open Lot Modal (modify as needed)
      setIsModalOpenLots(true);
      setIsEditable(true);
    }
    else if (activeTab === 'Disorder') {
      // Open Lot Modal (modify as needed)
      setIsModalOpenDisorder(true);
      setIsEditable(true);
    }
    // Add more conditions for other tabs if needed
  };


  const closeAddQuestionModal = () => {
    setCreateMode(false);
    setIsEditable(false);
    setIsModalOpenQuestions(false);
  };
  const closeAddLotModal = () => {
    setCreateMode(false);
    setIsEditable(false);
    setIsModalOpenLots(false);
  };
  const closeAddDisorderModal = () => {
    setCreateMode(false);
    setIsEditable(false);
    setIsModalOpenDisorder(false);
  };

  const handleAddQuestion = async () => {
    let requestData = { ...modalDataQuestions };
    const response = await QuestionsService.addQuestion(requestData);
    console.log(response);
  };
  const handleAddLot = async () => {
    let requestData = { ...modalDataLots };
    const response = await LotService.addLot(requestData);
    console.log(response);
  };
  const handleAddDisorder = async () => {
    let requestData = { ...modalDataDisorder };
    const response = await DisorderService.addDisorder(requestData);
    console.log(response);
  };

  const handleEditLot = async () => {

  };

  const handleEditDisorder = async () => {

  };

  // Function to open the modal
  const openModal = (index) => {
    if (activeTab === "Questions") {
      console.log(index, allQuestionsData[index]);
      setModalDataQuestions(allQuestionsData[index]);
      setIsModalOpenQuestions(true);
    } else if (activeTab === "LOTS") {
      console.log(index, allLots[index]);
      // setSelectedRowLots(index);
      setModalDataLots(allLots[index]);
      setIsModalOpenLots(true);
    } else if (activeTab === "Disorder") {
      // setSelectedRowDisorder(index);
      setModalDataDisorder(allDisorderData[index]);
      setIsModalOpenDisorder(true);
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpenQuestions(false);
    setIsModalOpenLots(false);
    setIsModalOpenDisorder(false);
  };

  return (
    <div>
      <TableContainer>
        <Button variant="contained" onClick={startAddQuestion}>
          Add{" "}
        </Button>
        <Table>
          <TableHead>
            {/* Table headers */}
            {activeTab === "Questions" && (
              <TableRow>
                <TableCell>Text</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            )}
            {activeTab === "LOTS" && (
              <TableRow>
                <TableCell>LOT Number</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            )}
            {activeTab === "Disorder" && (
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Red Required</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {/* Table rows */}
            {activeTab === "Questions" &&
              allQuestionsData.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{item?.text}</TableCell>
                  <TableCell>{item?.code}</TableCell>
                  <TableCell>{item?.color}</TableCell>
                  <TableCell>
                    <Button onClick={() => openModal(index)}>Open Popup</Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteClick(index)}
                      aria-label="Delete"
                      color="secondary" // Customize the color as needed

                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>

                </TableRow>
              ))}
            {activeTab === "LOTS" &&
              allLots.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{item?.lotNumber}</TableCell>
                  <TableCell>{item?.name}</TableCell>
                  <TableCell>
                    <Button onClick={() => openModal(index)}>Open Popup</Button>
                  </TableCell>
                </TableRow>
              ))}
            {activeTab === "Disorder" &&
              allDisorderData.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{item?.name}</TableCell>
                  <TableCell>{item?.redRequired}</TableCell>
                  <TableCell>
                    <Button onClick={() => openModal(index)}>Open Popup</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modals */}
      {/* Questions Modal */}
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

          {
            modalDataQuestions.possibleAnswers && modalDataQuestions.possibleAnswers.map((answer, aIndex) => (
              <div style={{ display: "flex" }}>
                {console.log(answer)}
                <TextField
                  style={{ marginRight: 4 }}
                  label="Possible Answers - Code"
                  variant="outlined"
                  disabled={!isEditable}
                  onChange={(e) => { handlePossibleAnswers(e, aIndex) }}
                  name="possibleAnswersCode"
                  fullWidth
                  margin="normal"
                  sx={{ mt: 2 }}
                  value={
                    answer.code || ""
                  }
                />

                <TextField
                  label="Possible Answers - Text"
                  variant="outlined"
                  disabled={!isEditable}
                  onChange={(e) => { handlePossibleAnswers(e, aIndex) }}
                  name="possibleAnswersText"
                  fullWidth
                  margin="normal"
                  sx={{ mt: 2 }}
                  value={
                    answer.text || ""
                  }
                />
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

      {/* LOTS Modal */}
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
          <Button
            onClick={createMode ? handleAddLot : handleEditLot}
          >
            {isEditable ? "Save" : "Edit"}
          </Button>
        </Box>
      </Modal>

      {/* Disorder Modal */}
      <DisorderModel
        isModalOpenDisorder={isModalOpenDisorder}
        closeModal={closeModal}
        modalDataDisorder={modalDataDisorder}
        handleDisorderChange={handleDisorderChange}
        isEditable={isEditable}
        handleAddDisorder={handleAddDisorder}
        handleEditDisorder={handleEditDisorder}
        createMode={createMode}
        closeAddDisorderModal={closeAddDisorderModal}
      />
      <DeleteDialog
        openDeleteDialog={openDeleteDialog}
        closeDeleteDialog={handleCloseDeleteDialog}
        deleteQuestion={deleteQuestion}
      />
    </div>
  );
}

export default DataTable;
