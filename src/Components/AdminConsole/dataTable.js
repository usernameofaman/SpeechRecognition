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
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DisorderModel from "./Models/DisorderModel";
import { QuestionsService } from "../../services";

function DataTable({ activeTab, allQuestionsData, allLots, allDisorderData }) {
  // State for Questions
  const [isModalOpenQuestions, setIsModalOpenQuestions] = useState(false);
  const [modalDataQuestions, setModalDataQuestions] = useState(allQuestionsData);
  const [isEditable, setIsEditable] = useState(false);
  const [createMode, setCreateMode] = useState(false)


  // State for LOTS
  const [selectedRowLots, setSelectedRowLots] = useState(null);
  const [isModalOpenLots, setIsModalOpenLots] = useState(false);
  const [modalDataLots, setModalDataLots] = useState({});

  // State for Disorder
  const [selectedRowDisorder, setSelectedRowDisorder] = useState(null);
  const [isModalOpenDisorder, setIsModalOpenDisorder] = useState(false);
  const [modalDataDisorder, setModalDataDisorder] = useState({});


  const handleChange = (e) => {
    console.log(modalDataQuestions)
    setModalDataQuestions({ ...modalDataQuestions, [e.target.name]: e.target.value });

  };

  const handleEditClickQuestion = async () => {
    let requestData = { ...modalDataQuestions }
    const response = await QuestionsService.updateQuestion(requestData);
    if (response._id) {
      setIsEditable(!isEditable);
    } else {
      window.alert("API Failed")
    }
  };

  const startAddQuestion = () => {
    setModalDataQuestions({})
    setIsModalOpenQuestions(true);
    setIsEditable(true)
    setCreateMode(true)
  }

  const handleAddQuestion = async () => {
    let requestData = { ...modalDataQuestions }
    const response = await QuestionsService.addQuestion(requestData)
    console.log(response)
  }


  // Function to open the modal
  const openModal = (index) => {
    if (activeTab === "Questions") {
      console.log(index, allQuestionsData[index])
      setModalDataQuestions(allQuestionsData[index]);
      setIsModalOpenQuestions(true);
    } else if (activeTab === "LOTS") {
      setSelectedRowLots(index);
      setModalDataLots(allLots[index]);
      setIsModalOpenLots(true);
    } else if (activeTab === "Disorder") {
      setSelectedRowDisorder(index);
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
        <Button variant="contained" onClick={startAddQuestion}>Add </Button>
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
        open={isModalOpenQuestions}
        onClose={closeModal}
        aria-labelledby="modal-modal-title-questions"
        aria-describedby="modal-modal-description-questions"
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
          <Typography id="modal-modal-title-questions" variant="h6" component="h2">
            Questions Modal
          </Typography>
          <TextField
            label="Text"
            variant="outlined"
            name="text"
            disabled={!isEditable}
            fullWidth
            margin="normal"
            sx={{ mt: 2 }}
            value={modalDataQuestions.text}
            onChange={handleChange}
          />
          <TextField
            label="Code"
            variant="outlined"
            disabled={!isEditable}
            onChange={handleChange}
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
            onChange={handleChange}
            name="color"
            fullWidth
            margin="normal"
            sx={{ mt: 2 }}
            value={modalDataQuestions.color}
          />

          <Button onClick={createMode ? handleAddQuestion : handleEditClickQuestion}>
            {isEditable ? "Save" : "Edit"}
          </Button>
          {/* <Button >
            Delete
          </Button> */}

        </Box>
      </Modal>


      {/* LOTS Modal */}
      <Modal
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
          <TextField
            label="LOT Number"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{ mt: 2 }}
            value={modalDataLots.lotNumber}
          />
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{ mt: 2 }}
            value={modalDataLots.name}
          />
        </Box>
      </Modal>

      {/* Disorder Modal */}
      <DisorderModel isModalOpenDisorder={isModalOpenDisorder} closeModal={closeModal} modalDataDisorder={modalDataDisorder} />
    </div>
  );
}

export default DataTable;
