import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedPage from "./components/ProtectedPage.jsx";
import CreateNote from "./components/CreateNote.jsx";
import NoteDetail from "./pages/NoteDetail.jsx";
import Home from "./pages/Home.jsx";
import NoteEdit from "./pages/NoteEdit.jsx";
import Admin from "./pages/Admin.jsx";
import { ToastContainer, toast } from "react-toastify";
import Forbidden from "./pages/Forbidden.jsx";
import AdminProtectedPage from "./components/AdminProtectedPage.jsx";
import GuestRoute from "./components/GuestRoute.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/notes"
            element={
              <ProtectedPage>
                <Notes />
              </ProtectedPage>
            }
          />
          <Route path="/login" element={<GuestRoute>
            <Login />
          </GuestRoute>} />
          <Route path="/register" element={<GuestRoute>
            <Register />
          </GuestRoute>} />
          <Route path="/createNote" element={<ProtectedPage>
            <CreateNote />
          </ProtectedPage>} />
          <Route path="/notes/noteDetail/:id" element={<NoteDetail />} />
          <Route path="/notes/noteEdit/:id" element={<NoteEdit />} />

          <Route
            path="/admin"
            element={
              <AdminProtectedPage>
                <Admin />
              </AdminProtectedPage>
            }
          />
            <Route path="/forbidden" element={<Forbidden />} />
        </Routes>
      </Router>
      <ToastContainer 
        autoClose={1000}
      />
    </AuthProvider>
  );
};

export default App;
