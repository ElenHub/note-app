import React, { useCallback, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import BasicDateRangeCalendar from "./components/Tasks/BasicDateRangeCalendar";
import CreateNote from "./components/Notes/CreateNote";
import EditNote from "./components/Notes/EditNote";
import FeedbackForm from "./components/Feedbacks/FeedbackForm";
import Note from "./components/Notes/Note";
import useNotes from "./hooks/useNotes";
import { getToggleStyle } from "./styles";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { useAuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import NotFound from './components/NotFound'

function App() {
  const { authUser } = useAuthContext();
  const { notes } = useNotes();

  const [darkMode, setDarkMode] = useState(false);
  const toggleStyle = getToggleStyle(darkMode);

  // Функция для переключения темного режима
  const handleToggleDarkMode = useCallback(() => {
    setDarkMode((prevMode) => !prevMode);
  }, []);

  return (
    <main
      style={{ minHeight: "100vh" }}
      className={darkMode ? "dark-mode" : ""}
    >
      <Container maxWidth="md" style={{ paddingTop: "20px" }}>
        <div className="container">
          <ToastContainer />
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  authUser ? (
                    <Note
                      notes={notes}
                      toggleStyle={toggleStyle}
                      handleToggleDarkMode={handleToggleDarkMode}
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
              <Route
                path="/notes"
                element={
                  <ProtectedRoute>
                    <Note
                      notes={notes}
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </Container>
    </main>
  );
}

export default App;
