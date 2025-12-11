import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      return setMessage("Passwords do not match!");
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await api.post(`api/auth/reset-password/${token}`, {
        password,
      });

      setMessage("Password reset successful!");
      setPassword("");
      setConfirmPassword("");

      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset password</title>
      </Helmet>
      <div className="h-screen flex justify-center items-center p-3">
        <form
          className="max-w-[400px] w-full shadow-xl p-6 rounded-md"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h2 className="text-2xl font-bold text-center">Reset Password</h2>
          {message && (
            <p className="text-center mt-3 text-green-600 font-medium">
              {message}
            </p>
          )}
          <div className="flex flex-col mt-4">
            <label>New Password</label>
            <input
              type="password"
              required
              className="border pl-2 py-2 mt-1 rounded-md outline-none"
              placeholder="Enter new password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col mt-4">
            <label>Confirm Password</label>
            <input
              type="password"
              required
              className="border pl-2 py-2 mt-1 rounded-md outline-none"
              placeholder="Confirm new password..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="block mx-auto mt-5 rounded-md bg-blue-600 px-4 py-2 text-white hover:opacity-80 transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
