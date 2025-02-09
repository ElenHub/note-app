import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskType {
  id: string;
  title: string;
  isDone: boolean;
  date: string;
}

export interface TasksState {
  tasks: TaskType[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Action to add a new task
    addTask: (state, action: PayloadAction<TaskType>) => {
      console.log("Adding task:", action.payload);
      state.tasks.push(action.payload);
    },
    // Action to delete a task by its ID
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    // Action to update an existing task
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
      }
    },
    // Action to toggle the completion status of a task
    toggleTaskCompletion: (
      state,
      action: PayloadAction<{ id: string; newStatus: boolean }>
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.isDone = action.payload.newStatus;
      }
    },
    // Action to update the title of a task
    updateTaskTitle: (
      state,
      action: PayloadAction<{ id: string; newTitle: string }>
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.title = action.payload.newTitle;
      }
    },
    // Action to update the date of a task
    updateTaskDate: (
      state,
      action: PayloadAction<{ id: string; newDate: string }>
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.date = action.payload.newDate;
      }
    },
    // Action to set multiple tasks at once
    setTasks: (state, action: PayloadAction<TaskType[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const {
  addTask,
  deleteTask,
  updateTask,
  toggleTaskCompletion,
  setTasks,
  updateTaskTitle,
  updateTaskDate,
} = tasksSlice.actions;

export default tasksSlice.reducer;
