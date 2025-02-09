import axios from "axios";
import { FeedbackType } from "../redux/features/feedbacksSlice";

// Base URL for the tasks API
const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api/feedbacks"
    : "/api";

export interface FeedbacksAPI {
  getFeedbacks: () => Promise<FeedbackType[]>;
  createFeedbacks: (title: string) => Promise<FeedbackType>;
  updateFeedbacks: (id: string, newTitle: string) => Promise<FeedbackType>;
  deleteFeedbacks: (id: string) => Promise<void>;
}

export const feedbacksAPI: FeedbacksAPI = {
  // Fetch all feedbacks from the API
  getFeedbacks: async () => {
    try {
      const response = await axios.get(API_URL, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      throw error;
    }
  },

  // Create a new feedback
  createFeedbacks: async (title: string) => {
    if (!title) {
      throw new Error("Title is required");
    }
    try {
      const response = await axios.post(
        API_URL,
        { title },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating feedback:", error);
      throw error;
    }
  },

  // Update an existing feedback by ID
  updateFeedbacks: async (id: string, newTitle: string) => {
    if (!newTitle) {
      throw new Error("New title is required");
    }
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        { title: newTitle },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating feedback:", error);
      throw error;
    }
  },

  // Delete feedback by ID
  deleteFeedbacks: async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
    } catch (error) {
      console.error("Error deleting feedback:", error);
      throw error;
    }
  },
};
