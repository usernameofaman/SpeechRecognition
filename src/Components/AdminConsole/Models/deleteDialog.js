import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteDialog({
  openDeleteDialog,
  closeDeleteDialog,
  deleteQuestion,
  deleteLot,
  deleteDisorder,
  activeTab,
}) {
  console.log("activetab in dlt:", activeTab);
  return (
    <Dialog
      open={openDeleteDialog}
      onClose={closeDeleteDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure want to delete?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {activeTab === "Question" && (
          <Button onClick={deleteQuestion}>Confirm Delete</Button>
        )}
        {activeTab === "LOTS" && (
          <Button onClick={deleteLot}>Confirm Delete</Button>
        )}
        {activeTab === "Disorder" && (
          <Button onClick={deleteDisorder}>Confirm Delete</Button>
        )}
        <Button onClick={closeDeleteDialog}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
