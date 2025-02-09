import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FeedbackType {
  id: string;
  title: string;
}

export interface FeedbackState {
  feedbacks: FeedbackType[];
  loading: boolean;
  error: string | null;
}

const initialState: FeedbackState = {
  feedbacks: [],
  loading: false,
  error: null,
};

const feedbacksSlice = createSlice({
  name: "feedbacks",
  initialState,
  reducers: {
    // Adding a new feedback
    addFeedbacks: (state, action: PayloadAction<FeedbackType>) => {
      state.feedbacks.push(action.payload);
    },
    // Deleting feedback
    deleteFeedbacks: (state, action: PayloadAction<string>) => {
      state.feedbacks = state.feedbacks.filter(
        (feedback) => feedback.id !== action.payload
      );
    },
    // Updating the title of feedback
    updateFeedbackTitle: (
      state,
      action: PayloadAction<{ id: string; newTitle: string }>
    ) => {
      const feedback = state.feedbacks.find((f) => f.id === action.payload.id);
      if (feedback) {
        feedback.title = action.payload.newTitle;
      }
    },
    // Setting the list of feedbacks
    setFeedbacks: (state, action: PayloadAction<FeedbackType[]>) => {
      state.feedbacks = action.payload;
    },
  },
});

export const {
  addFeedbacks,
  deleteFeedbacks,
  setFeedbacks,
  updateFeedbackTitle,
} = feedbacksSlice.actions;
export default feedbacksSlice.reducer;
