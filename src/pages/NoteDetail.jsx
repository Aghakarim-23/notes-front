import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const NoteDetail = () => {
  const { id } = useParams(); 
  const { token } = useAuth();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/notes/noteDetail/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNote(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, token]);

  const handleDelete = async () => {

    try {
      setDeleting(true);
      await api.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/notes"); 
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading note...</p>;
  if (!note) return <p className="text-center mt-10">Note not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4">{note.title}</h1>
        <p className="text-gray-700 mb-4">{note.content}</p>
        <p className="text-sm text-gray-400 mb-6">
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </p>

        <div className="flex gap-4">
          {/* Edit button (optional) */}
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
            onClick={() => navigate(`/edit-note/${id}`)}
          >
            Edit
          </button>

          <button
            className={`bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition ${
              deleting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
