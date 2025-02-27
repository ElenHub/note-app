import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ConfirmationDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  itemType: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = (props) => (
  <Dialog
    open={props.open}
    onClose={props.handleClose}
    sx={{ "& .MuiDialog-paper": { borderRadius: "16px" } }}
  >
    <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
      Delete Confirmation
    </DialogTitle>
    <DialogContent>
      <DialogContentText sx={{ textAlign: "center", color: "#555" }}>
        {`Are you sure you want to delete this ${props.itemType}?`}
      </DialogContentText>
    </DialogContent>
    <DialogActions sx={{ justifyContent: "center", padding: "16px" }}>
      <Button
        onClick={props.handleClose}
        sx={{ color: "#1976d2", fontWeight: "bold" }}
      >
        Cancel
      </Button>
      <Button
        onClick={props.handleConfirm}
        color="error"
        variant="contained"
        sx={{ borderRadius: "20px", fontWeight: "bold" }}
      >
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmationDialog;
