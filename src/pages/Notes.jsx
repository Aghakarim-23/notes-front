import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getNotes = async () => {
      try {
        setLoading(true);
        const res = await api.get("/notes/getNotes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotes(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getNotes();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto relative">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Notes</h1>

        <button
          onClick={() => navigate("/createNote")}
          className="fixed bottom-8 right-8 bg-blue-600 text-white w-14 h-14 rounded-full text-3xl flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
        >
          +
        </button>

        {loading ? (
          <p className="text-center text-gray-500">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="text-center text-gray-500">No notes found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map((note) => (
              <Link to={`/notes/noteDetail/${note._id}`} key={note._id} >
                <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
                  <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
                  <p className="text-gray-700">{note.content}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Created: {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
