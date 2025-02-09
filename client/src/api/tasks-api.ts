import axios from "axios";
import { TaskType } from "redux/features/tasksSlice";

// Base URL for the tasks API
const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api/tasks"
    : "/api";

export interface TasksAPI {
  getTasks: () => Promise<TaskType[]>;
  createTasks: (
    title: string,
    isDone: boolean,
    date: string
  ) => Promise<TaskType>;
  deleteTasks: (id: string) => Promise<void>;
  toggleTask: (id: string, isDone: boolean) => Promise<void>;
  updateTasks: (id: string, title: string) => Promise<void>;
  updateDate: (id: string, date: string) => Promise<void>;
}

export const tasksAPI: TasksAPI = {
  getTasks: async () => {
    try {
      const response = await axios.get(API_URL, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  // Deleting a task by ID
  deleteTasks: async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  },

  // Creating a new task
  createTasks: async (title: string, isDone: boolean, date: string) => {
    if (!title) {
      throw new Error("Title is required");
    }
    try {
      const response = await axios.post(
        API_URL,
        { title, isDone, date },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  // Toggle task status (completed or not)
  toggleTask: async (id: string, isDone: boolean) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        { isDone },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  // Update an existing task by its ID
  updateTasks: async (id: string, newTitle: string) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        { title: newTitle },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  // Update date of the task
  updateDate: async (id: string, newDate: string) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        { date: newDate },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating task date:", error);
      throw error;
    }
  },
};
