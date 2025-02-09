import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";

import { tasksAPI } from "../api/tasks-api";
import { setTasks } from "../redux/features/tasksSlice";

export const useLoadTasks = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  // useEffect to load tasks when the component mounts
  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
          dispatch(setTasks(JSON.parse(savedTasks)));
        } else {
          const response = await tasksAPI.getTasks();
          if (response) {
            dispatch(setTasks(response));
            localStorage.setItem("tasks", JSON.stringify(response));
          } else {
            console.error("Error: invalid data was received from the API");
          }
        }
      } catch (error) {
        console.error("Error when loading tasks:", error);
        setError("Error when loading tasks");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [dispatch]);

  return { loading, error, tasks };
};
