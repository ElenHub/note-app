import React, { useState } from "react";
import useLogout from "../../hooks/useLogout";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { BiLogOut } from "react-icons/bi";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  const [open, setOpen] = useState(false);

  // Function to open the confirmation dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the confirmation dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle logout
  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <>
      <Box
        onClick={handleClickOpen}
        aria-label="logout"
        disabled={loading}
        sx={{ display: "flex", cursor: "pointer" }}
      >
        {loading ? <CircularProgress size={24} /> : <BiLogOut />}
      </Box>

      {/* Confirmation dialog for logout */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LogoutButton;
