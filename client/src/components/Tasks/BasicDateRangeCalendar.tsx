import { useCallback, useMemo, useState } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { Box, CircularProgress, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useLoadTasks } from "../../hooks/useLoadTasks";
import useTasks from "../../hooks/useTasks";
import { BackButton } from "../UI/BackButton";
import TaskInput from "../Tasks/TaskInput";
import TaskList from "../Tasks/TaskList";

interface BasicDateRangeCalendarProps {
  toggleStyle: {
    backgroundColor: string;
    iconColor: string;
    textColor: string;
  };
}

export default function BasicDateRangeCalendar({
  toggleStyle,
}: BasicDateRangeCalendarProps) {
  const { loading, error, tasks } = useLoadTasks();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { createTask, removeTask, toggleTaskStatus, editTaskTitle } =
    useTasks();
  const [taskIdToRemove, setTaskIdToRemove] = useState<string | null>(null);
  const [notificationTimes, setNotificationTimes] = useState<{
    [key: string]: string;
  }>({});

  const filteredTasks = useMemo(() => {
    return tasks.filter(
      (task) => task.date === selectedDate.format("YYYY-MM-DD")
    );
  }, [tasks, selectedDate]);

  const addTask = useCallback(
    (title: string, date: string) => {
      if (title.trim()) {
        createTask({ title, date });
        toast.success("The task was successfully added!");
      }
    },
    [createTask]
  );

  const toggleCompletion = (id: string, newStatus: boolean) => {
    toggleTaskStatus(id, newStatus);
  };

  const changeTaskTitle = useCallback(
    (id: string, newTitle: string) => {
      editTaskTitle(id, newTitle);
    },
    [editTaskTitle]
  );

  const handleTimeChange = (taskId: string, newTime: string | null) => {
    if (newTime) {
      setNotificationTimes((prev) => ({ ...prev, [taskId]: newTime }));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BackButton toggleStyle={toggleStyle} />
      <Box sx={{ bgcolor: "var(--white-color)", padding: 3, borderRadius: 2 }}>
        <DateCalendar
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          sx={{
            width: "100%",
            height: "400px",
            borderRadius: 2,
            "& .MuiPickersDay-root.Mui-selected": {
              backgroundColor: "var(--orange-color)",
              color: "white",
            },
            "& .MuiButtonBase-root:hover": {
              backgroundColor: "rgb(189, 99, 35)",
            },
            color: "black",
          }}
        />
      </Box>

      <Box
        sx={{
          marginTop: 4,
          bgcolor: "var(--white-color)",
          padding: 2,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginBottom: 2,
            textAlign: "center",
            color: toggleStyle.textColor,
          }}
        >
          Add Task
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TaskInput
            addTask={addTask}
            toggleStyle={toggleStyle.iconColor}
            selectedDate={selectedDate.format("YYYY-MM-DD")}
          />
        </Box>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
              marginTop: 2,
            }}
          >
            <CircularProgress color="warning" />
          </Box>
        ) : error ? (
          <Typography
            variant="body1"
            color="error"
            align="center"
            sx={{ margin: 2 }}
          >
            Error loading tasks: {error}
          </Typography>
        ) : (
          <TaskList
            tasks={filteredTasks}
            toggleCompletion={toggleCompletion}
            color={toggleStyle.textColor}
            changeTaskTitle={changeTaskTitle}
            handleTimeChange={handleTimeChange}
            selectedDate={selectedDate}
            notificationTimes={notificationTimes}
          />
        )}
      </Box>
    </LocalizationProvider>
  );
}
