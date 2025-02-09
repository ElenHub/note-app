import { configureStore } from "@reduxjs/toolkit";
import feedbacksReducer, {
  FeedbackState,
} from "../redux/features/feedbacksSlice";
import notesReducer, { NotesState } from "../redux/features/notesSlice";
import taskReducer, { TasksState } from "../redux/features/tasksSlice";

// Define the overall shape of the application's state
export interface RootState {
  notes: NotesState;
  tasks: TasksState;
  feedbacks: FeedbackState;
}

// Create the Redux store with the combined reducers
const store = configureStore<RootState>({
  reducer: {
    notes: notesReducer,
    tasks: taskReducer,
    feedbacks: feedbacksReducer,
  },
});

// Type for the dispatch function of the store
export const AppDispatch = typeof store.dispatch;

export default store;
