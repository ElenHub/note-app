import React, { useState } from "react";
import { toast } from "react-toastify";
import { Box, Button, TextField, Typography } from "@mui/material";

interface ToggleStyle {
  backgroundColor: string;
  textColor: string;
}

interface FeedbackInputProps {
  toggleStyle: ToggleStyle;
  addFeedback: (feedback: string) => void;
}

const FeedbackInput: React.FC<FeedbackInputProps> = ({
  toggleStyle,
  addFeedback,
}) => {
  const [title, setTitle] = useState<string>("");
  const maxLength = 200;

  const handleChangeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxLength) {
      setTitle(inputValue);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === "") {
      toast.error("Feedback cannot be empty");
      return;
    }
    addFeedback(title);
    setTitle("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        bgcolor: "var(--white-color)",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          textAlign: "center",
          color: toggleStyle.textColor,
        }}
      >
        Leave your feedback
      </Typography>
      <TextField
        label="Your feedback"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={title}
        onChange={handleChangeCount}
        required
        inputProps={{ maxLength: maxLength }}
        helperText={`${maxLength - title.length} characters left`}
        InputProps={{
          sx: {
            borderRadius: "8px",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
            },
          },
        }}
        sx={{
          "& label.Mui-focused": {
            color: "black",
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={title.length === 0}
        sx={{
          marginTop: "16px",
          borderRadius: "30px",
          backgroundColor: "var(--orange-color)",
          color: "var(--black-color)",
        }}
      >
        Send
      </Button>
    </Box>
  );
};

export default FeedbackInput;
