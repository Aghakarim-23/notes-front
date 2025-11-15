import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Register from "./pages/Register";
import Login from "./pages/Login";
import {AuthProvider} from "./context/AuthContext.jsx"
 
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/notes" element={<Notes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
