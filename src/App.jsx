import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Register from "./pages/Register";
import Login from "./pages/Login";
import {AuthProvider} from "./context/AuthContext.jsx"
import ProtectedPage from "./components/ProtectedPage.jsx";
import CreateNote from "./components/CreateNote.jsx";
import NoteDetail from "./pages/NoteDetail.jsx";
import Home from "./pages/Home.jsx";
import NoteEdit from "./pages/NoteEdit.jsx";
import Admin from "./pages/Admin.jsx";
import { ToastContainer, toast } from 'react-toastify';

 
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<ProtectedPage>
            <Notes />
          </ProtectedPage>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/createNote" element={<CreateNote />} />
          <Route path="/notes/noteDetail/:id" element={<NoteDetail />} />
          <Route path="/notes/noteEdit/:id" element={<NoteEdit />} />
        </Routes>
      </Router>
    <ToastContainer />
    </AuthProvider>
  );
};

export default App;
