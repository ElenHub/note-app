import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";

import { feedbacksAPI } from "../api/feedbacks-api";
import { setFeedbacks } from "../redux/features/feedbacksSlice";

export const useLoadFeedbacks = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const feedbacks =
    useSelector((state: RootState) => state.feedbacks.feedbacks) || [];

  // useEffect to load feedbacks when the component mounts
  useEffect(() => {
    const loadFeedbacks = async () => {
      setLoading(true);
      setError(null);
      try {
        const savedFeedbacks = localStorage.getItem("feedbacks");
        if (savedFeedbacks) {
          dispatch(setFeedbacks(JSON.parse(savedFeedbacks)));
        } else {
          const response = await feedbacksAPI.getFeedbacks();
          if (response && Array.isArray(response)) {
            dispatch(setFeedbacks(response));
            localStorage.setItem("feedbacks", JSON.stringify(response));
          } else {
            console.error("Error: invalid data was received from the API");
          }
        }
      } catch (error) {
        console.error("Error when uploading feedbacks:", error);
        setError("Error when uploading feedbacks");
      } finally {
        setLoading(false);
      }
    };

    loadFeedbacks();
  }, [dispatch]);

  return { feedbacks, loading, error };
};
