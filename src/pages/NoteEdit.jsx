import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const NoteEdit = () => {
  const { id } = useParams(); // Get note ID from URL
  const { token } = useAuth();
  const navigate = useNavigate();

  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch the existing note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/notes/noteDetail/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNote({ title: res.data.title, content: res.data.content });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      await api.put(`/notes/noteEdit/${id}`, note, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/notes/noteDetail/${id}`); 
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading note...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Note</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-600 text-sm">Title</label>
            <input
              type="text"
              name="title"
              value={note.title}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Content</label>
            <textarea
              name="content"
              value={note.content}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              rows="6"
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            {updating ? "Updating..." : "Update Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoteEdit;
