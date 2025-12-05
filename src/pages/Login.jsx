import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";




const Login = () => {
  const [form, setForm] = useState({
    email: "ibrahim@admin.com",
    password: "admin321",
  });


  
  const {login,loading} = useAuth()

  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await login(form)
        navigate("/notes")
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      console.error(error)
    }

    
  };



  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-gray-100 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
          Welcome Notes App
        </h1>
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
      
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

          <div className="relative">
            <label className="te``xt-gray-600 text-sm">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter password"
              required
            />
            {showPassword ? 
            <FaRegEye 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-10 right-4 cursor-pointer"/> : 
            <FaRegEyeSlash 
             onClick={() => setShowPassword(!showPassword)}
              className="absolute top-10 right-4 cursor-pointer"/>}
            

          </div>
          
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition  ${loading ? "opacity-40 cursor-not-allowed": "cursor-pointer"}`}
            disabled={loading}
          >
            Login
          </button>
        </form>
          <div className="text-center my-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
