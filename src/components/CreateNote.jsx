import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import BackButton from "./shared/BackButton";

const CreateNote = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(
        "/notes/createNote",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/notes"); 
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <BackButton style="absolute top-6 md:top-8 left-6 rounded-full border p-2 cursor-pointer hover:bg-white transition"/>
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md mt-10">
        <h2 className="text-2xl font-bold text-center mb-6">Create Note</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-600 text-sm">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter title"
              required
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter note content"
              rows={5}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            } transition`}
          >
            {loading ? "Creating..." : "Create Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
