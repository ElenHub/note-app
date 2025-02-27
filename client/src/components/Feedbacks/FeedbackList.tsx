import React from "react";
import { toast } from "react-toastify";
import { FeedbackType } from "redux/features/feedbacksSlice";
import { Delete } from "@mui/icons-material";
import { Box, IconButton, List, ListItem, Typography } from "@mui/material";
import useConfirmationDialog from "../../hooks/useConfirmationDialog";
import ConfirmationDialog from "../Forms/ConfirmationDialog";
import EditableSpan from "../Forms/EditableSpan";

interface FeedbackListProps {
  feedbacks: FeedbackType[];
  toggleStyle: {
    textColor: string;
  };
  removeFeedbacks: (id: string) => void;
  updateFeedbackTitle: (id: string, newTitle: string) => void;
}

const FeedbackList: React.FC<FeedbackListProps> = ({
  feedbacks,
  toggleStyle,
  removeFeedbacks,
  updateFeedbackTitle,
}) => {
  const { open, handleOpen, handleClose, itemIdToRemove } =
    useConfirmationDialog();

  const handleRemoveFeedback = () => {
    if (itemIdToRemove) {
      console.log("Removing feedback with id:", itemIdToRemove);
      removeFeedbacks(itemIdToRemove);
      toast.error("The feedback was successfully deleted!");
    }
    handleClose();
  };

  const handleTitleChange = async (id: string, newTitle: string) => {
    try {
      await updateFeedbackTitle(id, newTitle);
      toast.success("Feedback title updated successfully!");
    } catch (error) {
      toast.error("Failed to update feedback title.");
      console.error("Error updating feedback title:", error);
    }
  };

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <Typography
        color={toggleStyle.textColor}
        variant="body1"
        align="center"
        sx={{ margin: 2 }}
      >
        No feedback available
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        marginTop: "24px",
        bgcolor: "background.paper",
        borderRadius: "8px",
        boxShadow: 3,
        padding: 2,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          textAlign: "center",
          color: toggleStyle.textColor,
          marginTop: "30px",
        }}
      >
        List of Reviews
      </Typography>
      <List>
        {feedbacks.map((feedback) => (
          <ListItem
            key={feedback._id}
            sx={{
              borderBottom: "1px solid #e0e0e0",
              padding: "16px",
              "&:last-child": { borderBottom: "none" },
              "&:hover": {
                backgroundColor: "#f5f5f5",
                transition: "background-color 0.3s",
              },
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "var(--black-color)",
            }}
          >
            <EditableSpan
              title={feedback.title}
              onChange={(newTitle) => handleTitleChange(feedback._id, newTitle)}
            />
            <IconButton
              sx={{
                color: "error.main",
                "&:hover": {
                  transform: "scale(1.1)",
                  transition: "transform 0.2s",
                  color: "error.dark",
                },
              }}
              onClick={() => handleOpen(feedback._id)}
              aria-label={`Delete feedback ${feedback.title}`}
            >
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <ConfirmationDialog
        open={open}
        handleClose={handleClose}
        handleConfirm={handleRemoveFeedback}
        itemType="feedback"
      />
    </Box>
  );
};

export default FeedbackList;
