import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedPage from "./components/ProtectedPage.jsx";
import CreateNote from "./components/CreateNote.jsx";
import NoteDetail from "./pages/NoteDetail.jsx";
import NoteEdit from "./pages/NoteEdit.jsx";
import Admin from "./pages/Admin.jsx";
import { ToastContainer, toast } from "react-toastify";
import Forbidden from "./pages/Forbidden.jsx";
import AdminProtectedPage from "./components/AdminProtectedPage.jsx";
import GuestRoute from "./components/GuestRoute.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import AllNotes from "./pages/AllNotes.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import { Helmet } from "react-helmet";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/notes"
            element={
              <>
                <Helmet>
                  <title>Home</title>
                </Helmet>
                <ProtectedPage>
                  <Notes />
                </ProtectedPage>
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Helmet>
                  <title>Login</title>
                </Helmet>
                <GuestRoute>
                  <Login />
                </GuestRoute>
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Helmet>
                  <title>Register</title>
                </Helmet>
                <GuestRoute>
                  <Register />
                </GuestRoute>
              </>
            }
          />
          <Route
            path="/createNote"
            element={
              <>
                <Helmet>
                  <title>Create note</title>
                </Helmet>
                <ProtectedPage>
                  <CreateNote />
                </ProtectedPage>
              </>
            }
          />

          <Route path="/notes/noteDetail/:id" element={<NoteDetail />} />
          <Route path="/notes/noteEdit/:id" element={<NoteEdit />} />

          <Route
            path="/admin"
            element={
              <>
                <Helmet>
                  <title>Admin page</title>
                </Helmet>
                <AdminProtectedPage>
                  <Admin />
                </AdminProtectedPage>
              </>
            }
          />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/all-notes"
            element={
              <>
              <Helmet>
                <title>All notes</title>
              </Helmet>
               <ProtectedPage>
                <AllNotes />
              </ProtectedPage>
              </>
             
            }
          />
          <Route path="/change-password" element={<ChangePassword />} />
          <></>
        </Routes>
      </Router>
      <ToastContainer autoClose={1000} />
    </AuthProvider>
  );
};

export default App;
