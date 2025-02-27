import "react-toastify/dist/ReactToastify.css";

import React, { useCallback, useEffect } from "react";

import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";

import { Delete } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import ConfirmationDialog from "../Forms/ConfirmationDialog";
import useConfirmationDialog from "../../hooks/useConfirmationDialog";
import useTasks from "../../hooks/useTasks";
import EditableSpan from "../Forms/EditableSpan";
import style from "./TaskList.module.css";

const TaskList = (props) => {
  const { open, handleOpen, handleClose, itemIdToRemove } =
    useConfirmationDialog();
  const { removeTask } = useTasks();

  // Callback function to handle task removal
  const handleRemoveTask = useCallback(() => {
    if (itemIdToRemove) {
      removeTask(itemIdToRemove);
      toast.error("The task was successfully deleted!");
    }
    handleClose();
  }, [removeTask, itemIdToRemove, handleClose]);

  // Function to retrieve a task title by its ID
  const getTaskTitleById = (id) => {
    const task = props.tasks.find((task) => task._id === id);
    return task ? task.title : "Unknown task";
  };

  // Effect hook to handle task notifications
  useEffect(() => {
    const notifyTasks = () => {
      const now = dayjs();
      Object.keys(props.notificationTimes).forEach((taskId) => {
        const chosenTime = dayjs(props.notificationTimes[taskId]);
        if (now.isSame(chosenTime, "minute")) {
          const taskTitle = getTaskTitleById(taskId);
          toast.success(
            `The time has come! Notification for a task: ${taskTitle}`,
            {
              autoClose: 5000,
            }
          );
        }
      });
    };

    // Set an interval to check for notifications every minute
    const interval = setInterval(notifyTasks, 60000);
    return () => clearInterval(interval);
  }, [props.notificationTimes, props.tasks]);

  if (!props.tasks || props.tasks.length === 0) {
    return (
      <Typography
        color={props.color}
        variant="body1"
        align="center"
        sx={{ margin: 2 }}
      >
        No tasks available
      </Typography>
    );
  }

  return (
    <Box sx={{ marginTop: 2 }}>
      <ToastContainer />
      <Typography
        color={props.color}
        variant="h6"
        align="center"
        sx={{ marginBottom: 2 }}
      >
        Your tasks
      </Typography>
      {props.tasks.map((task) => (
        <Box
          className={`${task.isDone ? style.isDone : style.task}`}
          key={task._id}
          sx={{ display: "flex", alignItems: "center", gap: 1, padding: 1 }}
        >
          <Checkbox
            checked={task.isDone}
            onChange={(event) =>
              props.toggleCompletion(task._id, event.target.checked)
            }
            sx={{
              "&.Mui-checked": {
                color: "var(--orange-color)",
              },
            }}
          />
          <EditableSpan
            title={task.title}
            onChange={(newTitle) => props.changeTaskTitle(task._id, newTitle)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Notification"
              value={
                props.notificationTimes[task._id]
                  ? dayjs(props.notificationTimes[task._id])
                  : dayjs()
              }
              onChange={(newValue) =>
                props.handleTimeChange(
                  task._id,
                  newValue ? newValue.format() : null
                )
              }
              textField={(params) => <TextField {...params} />}
              disabled={task.isDone}
              sx={{ marginLeft: "auto" }}
            />
          </LocalizationProvider>
          <IconButton
            onClick={() => handleOpen(task._id)}
            color="error"
            sx={{
              backgroundColor: "transparent",
              marginLeft: 4,
              marginRight: 2,
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                borderRadius: "50%",
              },
              transition: "background-color 0.3s ease",
            }}
          >
            <Delete />
          </IconButton>
        </Box>
      ))}
      <ConfirmationDialog
        open={open}
        handleClose={handleClose}
        handleConfirm={handleRemoveTask}
        itemType="task"
      />
    </Box>
  );
};

export default TaskList;
