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
import QuestionModal from "./Models/QuestionModal";
import LotModal from "./Models/LotModal";
import DeleteDialog from "./Models/deleteDialog";
import { QuestionsService } from "../../services";
import { LotService } from "../../services";
import { DisorderService } from "../../services";

function DataTable({ activeTab, allQuestionsData, allLots, allDisorderData }) {
  // State for Questions
  const [isModalOpenQuestions, setIsModalOpenQuestions] = useState(false);
  const [modalDataQuestions, setModalDataQuestions] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [questionRadiovalue, setQuestionRadioValue] = React.useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRowQuestion, setSelectedRowQuestion] = useState(null);

   ;
  

  // State for LOTS
  const [selectedRowLots, setSelectedRowLots] = useState(null);
  const [isModalOpenLots, setIsModalOpenLots] = useState(false);
  const [modalDataLots, setModalDataLots] = useState({});

  // State for Disorder
  const [selectedRowDisorder, setSelectedRowDisorder] = useState(null);
  const [isModalOpenDisorder, setIsModalOpenDisorder] = useState(false);
  const [modalDataDisorder, setModalDataDisorder] = useState({});


  const handleDeleteClick = (index) => {
    
    setSelectedRowLots(allLots[index])
    setOpenDeleteDialog(true);
    setSelectedRowQuestion(allQuestionsData[index])
    setOpenDeleteDialog(true)
    setSelectedRowDisorder(allDisorderData[index])
    setOpenDeleteDialog(true)
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleQuestionChange = (e) => {
     ;
    setQuestionRadioValue(e.target.value);
    setModalDataQuestions({
      ...modalDataQuestions,
      [e.target.name]: e.target.value,
    });
  };

  const handleLotChange = (e) => {
     ;
    setModalDataLots({
      ...modalDataLots,
      [e.target.name]: e.target.value,
    });
  };

  const handlePossibleAnswers = (e, aIndex) => {
    let state = { ...modalDataQuestions };
    let answers = state.possibleAnswers;
    let currentAnswer = answers[aIndex];

    if (e.target.name === "possibleAnswersCode") {
      currentAnswer.code = e.target.value;
    } else {
      currentAnswer.text = e.target.value;
    }

    answers[aIndex] = currentAnswer;
    state.possibleAnswers = answers;
    setModalDataQuestions(state);
  };

  const addRowToPossibleAnswers = () => {
    let state = { ...modalDataQuestions };
    let answers = state.possibleAnswers;
    answers.push({ code: "", text: "" });
    state.possibleAnswers = answers;
    setModalDataQuestions(state);
  };

  const removeRowToPossibleAnswers = (index) => {
    let state = { ...modalDataQuestions };
    let answers = state.possibleAnswers;
    answers.splice(index, 1);
    state.possibleAnswers = answers;
    setModalDataQuestions(state);
  };

  const addRowToLotQuestions = () => {
    let state = { ...modalDataLots };
    let answers = state.questions;
    answers.push("");
    state.questions = answers;
    setModalDataLots(state);
  };

  const removeRowToLotQuestions = (index) => {
    let state = { ...modalDataLots };
    let answers = state.questions;
    answers.splice(index, 1);
    state.questions = answers;
    setModalDataLots(state);
  };

  const handleDisorderQuestions = (e, qIndex, category) => {
    const updatedModalDataDisorder = { ...modalDataDisorder };

    if (category === "redQuestions") {
      updatedModalDataDisorder.redQuestions = [
        ...modalDataDisorder.redQuestions,
      ];
      updatedModalDataDisorder.redQuestions[qIndex] = e.target.value;
    } else if (category === "blackQuestions") {
      updatedModalDataDisorder.blackQuestions = [
        ...modalDataDisorder.blackQuestions,
      ];
      updatedModalDataDisorder.blackQuestions[qIndex] = e.target.value;
    } else if (category === "blueQuestions") {
      updatedModalDataDisorder.blueQuestions = [
        ...modalDataDisorder.blueQuestions,
      ];
      updatedModalDataDisorder.blueQuestions[qIndex] = e.target.value;
    } else if (category === "greenQuestions") {
      updatedModalDataDisorder.greenQuestions = [
        ...modalDataDisorder.greenQuestions,
      ];
      updatedModalDataDisorder.greenQuestions[qIndex] = e.target.value;
    } else if (category === "yellowQuestions") {
      updatedModalDataDisorder.yellowQuestions = [
        ...modalDataDisorder.yellowQuestions,
      ];
      updatedModalDataDisorder.yellowQuestions[qIndex] = e.target.value;
    } else if (category === "violetQuestions") {
      updatedModalDataDisorder.violetQuestions = [
        ...modalDataDisorder.violetQuestions,
      ];
      updatedModalDataDisorder.violetQuestions[qIndex] = e.target.value;
    } else if (category === "maroonQuestions") {
      updatedModalDataDisorder.maroonQuestions = [
        ...modalDataDisorder.maroonQuestions,
      ];
      updatedModalDataDisorder.maroonQuestions[qIndex] = e.target.value;
    }
    

    setModalDataDisorder(updatedModalDataDisorder);
  };

  const addRowToDisorderRedQuestions = () => {
    let state = { ...modalDataDisorder };
    let answers = state.redQuestions;
    answers.push("");
    state.redQuestions = answers;
    setModalDataDisorder(state);
  };

  const addRowToDisorderBlackQuestions = () => {
    let state = { ...modalDataDisorder };
    let answers = state.blackQuestions;
    answers.push("");
    state.blackQuestionsblueQuestions = answers;
    setModalDataDisorder(state);
  };
  const addRowToDisorderBlueQuestions = () => {
    let state = { ...modalDataDisorder };
    let answers = state.blueQuestions;
    answers.push("");
    state.blueQuestions = answers;
    setModalDataDisorder(state);
  };
  const addRowToDisorderGreenQuestions = () => {
    let state = { ...modalDataDisorder };
    let answers = state.greenQuestions;
    answers.push("");
    state.greenQuestions = answers;
    setModalDataDisorder(state);
  };
  const addRowToDisorderYellowQuestions = () => {
    let state = { ...modalDataDisorder };
    let answers = state.yellowQuestions;
    answers.push("");
    state.yellowQuestions = answers;
    setModalDataDisorder(state);
  };
  const addRowToDisorderVioletQuestions = () => {
    let state = { ...modalDataDisorder };
    let answers = state.violetQuestions;
    answers.push("");
    state.violetQuestions = answers;
    setModalDataDisorder(state);
  };
  const addRowToDisorderMaroonQuestions = () => {
    let state = { ...modalDataDisorder };
    let answers = state.maroonQuestions;
    answers.push("");
    state.maroonQuestions = answers;
    setModalDataDisorder(state);
  };
  const removeRowToDisorderRedQuestions = (index) => {
    let state = { ...modalDataDisorder };
    let answers = state.redQuestions;
    answers.splice(index, 1);
    state.redQuestions = answers;
    setModalDataDisorder(state);
  };

  const removeRowToDisorderBlackQuestions = (index) => {
    let state = { ...modalDataDisorder };
    let answers = state.BlackQuestions;
    answers.splice(index, 1);
    state.BlackQuestions = answers;
    setModalDataDisorder(state);
  };
  const removeRowToDisorderBlueQuestions = (index) => {
    let state = { ...modalDataDisorder };
    let answers = state.blueQuestions;
    answers.splice(index, 1);
    state.blueQuestions = answers;
    setModalDataDisorder(state);
  };
  const removeRowToDisorderGreenQuestions = (index) => {
    let state = { ...modalDataDisorder };
    let answers = state.greenQuestions;
    answers.splice(index, 1);
    state.greenQuestions = answers;
    setModalDataDisorder(state);
  };
  const removeRowToDisorderYellowQuestions = (index) => {
    let state = { ...modalDataDisorder };
    let answers = state.yellowQuestions;
    answers.splice(index, 1);
    state.yellowQuestions = answers;
    setModalDataDisorder(state);
  };
  const removeRowToDisorderVioletQuestions = (index) => {
    let state = { ...modalDataDisorder };
    let answers = state.violetQuestions;
    answers.splice(index, 1);
    state.violetQuestions = answers;
    setModalDataDisorder(state);
  };
  const removeRowToDisorderMaroonQuestions = (index) => {
    let state = { ...modalDataDisorder };
    let answers = state.maroonQuestions;
    answers.splice(index, 1);
    state.maroonQuestions = answers;
    setModalDataDisorder(state);
  };
  const handleDisorderChange = (e) => {
     ;
    setModalDataDisorder({
      ...modalDataDisorder,
      [e.target.name]: e.target.value,
    });
  };

  const deleteQuestion = async () => {
    const response = await QuestionsService.deleteQuestion(selectedRowQuestion);
    if (response.message === "Question deleted successfully") {
      window.alert("Successfully Deleted");
    } else {
      window.alert("API Failed");
    }
    setOpenDeleteDialog(false);
  };

  const deleteLot = async () => {
    const response = await LotService.deleteLot(selectedRowLots);

    if (response.message === "Lot deleted successfully") {
      window.alert("Successfully Deleted");
    } else {
      window.alert("API Failed");
    }
    setOpenDeleteDialog(false);

  };

  const deleteDisorder = async () => {
    const response = await DisorderService.deleteDisorder(selectedRowDisorder);

    if (response.message === "Disorder deleted successfully") {
      window.alert("Successfully Deleted");
    } else {
      window.alert("API Failed");
    }
    setOpenDeleteDialog(false);

  };


  const handleEditClickQuestion = async () => {
    if (isEditable) {
      let requestData = { ...modalDataQuestions };
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

  const handleEditClickLot = async () => {
    if (isEditable) {
      let requestData = { ...modalDataLots };
       ;
      const response = await LotService.updateLot(requestData);
       ;
      if (response._id) {
        setIsEditable(false); // Disable edit mode after saving
      } else {
        window.alert("API Failed");
      }
    } else {
      setIsEditable(true); // Enable edit mode
    }
  };

  const startAddQuestion = () => {
    setModalDataQuestions({  timer : "MEDIUM" ,possibleAnswers: [{ text: "", code: "" }] });
    setCreateMode(true);
    setModalDataLots({ questions: [""] });
    setCreateMode(true);
    setModalDataDisorder({
      redQuestions: [""],
      blueQuestions: [" "],
      blackQuestions: [""],
      greenQuestions: [""],
      yellowQuestions: [""],
      voiletQuestions: [""],
      maroonQuestions: [""]
    });
    setCreateMode(true);

    if (activeTab === "Questions") {
      setIsModalOpenQuestions(true);
      setIsEditable(true);
    } else if (activeTab === "LOTS") {
      // Open Lot Modal (modify as needed)
      setIsModalOpenLots(true);
      setIsEditable(true);
    } else if (activeTab === "Disorder") {
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
     ;
  };

  const handleAddDisorder = async () => {
    let requestData = { ...modalDataDisorder };
    const response = await DisorderService.addDisorder(requestData);
     ;
  };

  const handleEditDisorder = async () => {
    if (isEditable) {
      let requestData = { ...modalDataDisorder };
      const response = await DisorderService.updateDisorder(requestData);

      if (response._id) {
        setIsEditable(false); // Disable edit mode after saving
      } else {
        window.alert("API Failed");
      }
    } else {
      setIsEditable(true); // Enable edit mode
    }
  };

  // Function to open the modal
  const openModal = (index) => {
    if (activeTab === "Questions") {
       ;
      setModalDataQuestions(allQuestionsData[index]);
      setIsModalOpenQuestions(true);
    } else if (activeTab === "LOTS") {
       ;
      // setSelectedRowLots(index);
      setModalDataLots(allLots[index]);
      setIsModalOpenLots(true);
    } else if (activeTab === "Disorder") {
      // setSelectedRowDisorder(index);
       
      let newObject = allDisorderData[index]
      const modifiedObject = Object.keys(newObject).reduce((acc, key) => {
        if (Array.isArray(newObject[key]) && newObject[key].length === 0) {
          acc[key] = [''];
        } else {
          acc[key] = newObject[key];
        }
        return acc;
      }, {});
  
      setModalDataDisorder(modifiedObject);
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
                    <Button
                      onClick={() => handleDeleteClick(index)}
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
                  <TableCell>
                    <Button
                      onClick={() => handleDeleteClick(index)}
                      aria-label="Delete"
                      color="secondary" // Customize the color as needed
                    >
                      <DeleteIcon />
                    </Button>
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
                  <TableCell>
                    <Button
                      onClick={() => handleDeleteClick(index)}
                      aria-label="Delete"
                      color="secondary" // Customize the color as needed
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Disorder Modal */}
      <DisorderModel
      setModalDataDisorder={setModalDataDisorder}
        isModalOpenDisorder={isModalOpenDisorder}
        closeModal={closeModal}
        modalDataDisorder={modalDataDisorder}
        handleDisorderChange={handleDisorderChange}
        isEditable={isEditable}
        handleAddDisorder={handleAddDisorder}
        handleEditDisorder={handleEditDisorder}
        createMode={createMode}
        closeAddDisorderModal={closeAddDisorderModal}
        handleDisorderQuestions={handleDisorderQuestions}
        addRowToDisorderRedQuestions={addRowToDisorderRedQuestions}
        removeRowToDisorderRedQuestions={removeRowToDisorderRedQuestions}
        addRowToDisorderBlueQuestions={addRowToDisorderBlueQuestions}
        removeRowToDisorderBlueQuestions={removeRowToDisorderBlueQuestions}
        addRowToDisorderBlackQuestions={addRowToDisorderBlackQuestions}
        removeRowToDisorderBlackQuestions={removeRowToDisorderBlackQuestions}
        addRowToDisorderGreenQuestions={addRowToDisorderGreenQuestions}
        removeRowToDisorderGreenQuestions={removeRowToDisorderGreenQuestions}
      />

      {/* Question Modal */}
      <QuestionModal
        isModalOpenQuestions={isModalOpenQuestions}
        closeModal={closeModal}
        modalDataQuestions={modalDataQuestions}
        handleQuestionChange={handleQuestionChange}
        isEditable={isEditable}
        handleAddQuestion={handleAddQuestion}
        handleEditClickQuestion={handleEditClickQuestion}
        createMode={createMode}
        closeAddQuestionModal={closeAddQuestionModal}
        startAddQuestion={startAddQuestion}
        openModal={openModal}
        addRowToPossibleAnswers={addRowToPossibleAnswers}
        removeRowToPossibleAnswers={removeRowToPossibleAnswers}
        handlePossibleAnswers={handlePossibleAnswers}
      />

      {/* Lot Modal */}
      <LotModal
        isModalOpenLots={isModalOpenLots}
        closeModal={closeModal}
        modalDataLots={modalDataLots}
        handleLotChange={handleLotChange}
        isEditable={isEditable}
        handleEditClickLot={handleEditClickLot}
        createMode={createMode}
        closeAddLotModal={closeAddLotModal}
        addRowToLotQuestions={addRowToLotQuestions}
        removeRowToLotQuestions={removeRowToLotQuestions}
        setModalDataLots={setModalDataLots}
      />

      <DeleteDialog
        openDeleteDialog={openDeleteDialog}
        closeDeleteDialog={handleCloseDeleteDialog}
        deleteQuestion={deleteQuestion}
        deleteLot={deleteLot}
        deleteDisorder={deleteDisorder}
        activeTab={activeTab}
      />
    </div>
  );
}

export default DataTable;

