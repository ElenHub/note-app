import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";

import { tasksAPI } from "../api/tasks-api";
import {
  addTask,
  deleteTask,
  setTasks,
  TaskType,
  toggleTaskCompletion,
  updateTaskDate,
  updateTaskTitle,
} from "../redux/features/tasksSlice";
import { toast } from "react-toastify";

const useTasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks) || [];

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await tasksAPI.getTasks();
        dispatch(setTasks(fetchedTasks));
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };
    loadTasks();
  }, [dispatch, tasks]);

  // Function to create a new task
  const createTask = async (task) => {
    try {
      console.log("Creating task:", task);
      const newTask = await tasksAPI.createTasks(
        task.title,
        task.isDone,
        task.date
      );
      dispatch(addTask(newTask));
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Function to remove a task by ID
  const removeTask = async (id: string) => {
    try {
      await tasksAPI.deleteTasks(id);
      dispatch(deleteTask(id));
    } catch (error) {
      console.error("Error deleting a task:", error);
    }
  };

  // Function to toggle a task's status
  const toggleTaskStatus = async (id: string, newStatus: boolean) => {
    try {
      await tasksAPI.toggleTask(id, newStatus);
      dispatch(toggleTaskCompletion({ id, newStatus }));
    } catch (error) {
      console.error("Error updating the task status:", error);
      toast.error("Failed to update the task status.");
    }
  };

  // Function to edit a task's title
  const editTaskTitle = async (id: string, newTitle: string) => {
    try {
      await tasksAPI.updateTasks(id, newTitle);
      dispatch(updateTaskTitle({ id, newTitle }));
    } catch (error) {
      console.error("Error updating the task title:", error);
      toast.error("Failed to update the task title.");
    }
  };

  // Function to edit a task's date
  const editTaskDate = async (id: string, newDate: string) => {
    try {
      await tasksAPI.updateDate(id, newDate);
      dispatch(updateTaskDate({ id, newDate }));
    } catch (error) {
      console.error("Error updating the task date:", error);
      toast.error("Failed to update the task date.");
    }
  };

  return {
    tasks,
    createTask,
    removeTask,
    toggleTaskStatus,
    editTaskTitle,
    editTaskDate,
  };
};

export default useTasks;
