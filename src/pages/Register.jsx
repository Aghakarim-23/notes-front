import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const {register} = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await register(form)
      navigate("/login")
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-gray-100 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
          Welcome Notes App
        </h1>
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-600 text-sm">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-80"
            disabled={loading}
          >
          {loading ? "Registering..." : "Register``"}
          </button>
        </form>
           <div className="text-center my-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Log In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
