import React, { useCallback } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import BasicDateRangeCalendar from "./components/Calendar/BasicDateRangeCalendar";
import CreateNote from "./components/CreateNote/CreateNote";
import EditNote from "./components/EditNote/EditNote";
import FeedbackForm from "./components/FeedbackForm/FeedbackForm";
import Note from "./components/Note/Note";
import useNotes from "./hooks/useNotes";
import { getToggleStyle } from "./styles";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { useAuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { ToastContainer } from "react-toastify";

function App() {
  const { authUser, darkMode, setDarkMode } = useAuthContext();
  const { notes } = useNotes();
  const toggleStyle = getToggleStyle(darkMode);

  // Function to toggle dark mode
  const handleToggleDarkMode = useCallback(() => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  }, [darkMode, setDarkMode]);

  return (
    <main
      style={{ minHeight: "100vh" }}
      className={darkMode ? "dark-mode" : ""}
    >
      <Container maxWidth="md" style={{ paddingTop: "20px" }}>
        <div className="container">
          <ToastContainer /> {/* Toast notifications container */}
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  authUser ? (
                    <Note
                      notes={notes}
                      handleToggleDarkMode={handleToggleDarkMode}
                      toggleStyle={toggleStyle}
                      darkMode={darkMode}
                    />
                  ) : (
                    <Navigate to={"/login"} />
                  )
                }
              />
              <Route
                path="/login"
                element={
                  authUser ? (
                    <Navigate to="/" />
                  ) : (
                    <Login toggleStyle={toggleStyle} />
                  )
                }
              />
              <Route
                path="/signup"
                element={
                  authUser ? (
                    <Navigate to="/" />
                  ) : (
                    <SignUp toggleStyle={toggleStyle} />
                  )
                }
              />

              {/* Protected routes for certain components */}
              <Route
                path="/notes"
                element={
                  <ProtectedRoute>
                    <Note
                      notes={notes}
                      handleToggleDarkMode={handleToggleDarkMode}
                      toggleStyle={toggleStyle}
                      darkMode={darkMode}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/calendar"
                element={
                  <ProtectedRoute>
                    <BasicDateRangeCalendar toggleStyle={toggleStyle} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <CreateNote toggleStyle={toggleStyle} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <ProtectedRoute>
                    <EditNote toggleStyle={toggleStyle} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/feedbacks"
                element={
                  <ProtectedRoute>
                    <FeedbackForm toggleStyle={toggleStyle} />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </Container>
    </main>
  );
}

export default App;
