import React, { useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";
import BackButton from "../components/shared/BackButton";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (formData.new_password.trim() !== formData.confirm_password.trim()) {
        toast.error("New password and confirm password do not match");
        setLoading(false);
        return;
      }
      const res = await api.put("/api/auth/change-password", formData);
      toast.success(res.data?.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <Helmet>
          <title>Change password</title>
        </Helmet>
      <div className="h-screen flex justify-center items-center">
        <BackButton style="absolute top-6 md:top-8 left-6 rounded-full border p-2 cursor-pointer hover:bg-white transition" />
        <form
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Change Password
          </h2>
          <div className="mb-4">
            <label htmlFor="old_password" className="block text-gray-700 mb-2">
              Old Password
            </label>
            <input
              type="password"
              name="old_password"
              id="old_password"
              placeholder="Old password"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="new_password" className="block text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              name="new_password"
              id="new_password"
              placeholder="New password"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirm_password"
              className="block text-gray-700 mb-2"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              placeholder="Confirm new password"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded-md cursor-pointer hover:bg-blue-600 transition-colors disabled:opacity-65`}
            disabled={loading}
          >
            {loading ? "Saving" : "Save"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
