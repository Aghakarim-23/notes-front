import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { MdOutlineArrowBack } from "react-icons/md";


const NoteDetail = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
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
      await api.delete(`/notes/deleteNote/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/notes");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!note) return <p className="text-center mt-10">Note not found</p>;

  return (
    <div className="h-screen bg-gray-100 flex p-4 justify-center items-center relative">
      <div
          onClick={() => navigate("/notes")} 
          className="absolute top-10 left-6 rounded-full border p-2 cursor-pointer hover:bg-white transition">
        <MdOutlineArrowBack  className="text-3xl"/>
      </div>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl">

        <h1 className="text-xl font-semibold mb-3">{note.title}</h1>

        <p className="text-gray-700 whitespace-pre-line mb-4">
          {note.content}
        </p>

        <p className="text-xs text-gray-400 mb-6">
          {new Date(note.createdAt).toLocaleString()}
        </p>

        <div className="flex justify-between">
          <button
            onClick={() => navigate(`/notes/noteEdit/${id}`)}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
};

export default NoteDetail;
