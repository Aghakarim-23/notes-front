import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading"); 

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await api.get(`/api/auth/verify-email/${token}`);
        console.log(res.status)
        setStatus("success");

        setTimeout(() => {
          navigate("/login");
        }, 4000);
      } catch (err) {
        setStatus("error");
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        
        <div className="mb-6">
          {status === "loading" && (
            <div className="mx-auto h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          )}

          {status === "success" && (
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl">
              ✓
            </div>
          )}

          {status === "error" && (
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 text-2xl">
              ✕
            </div>
          )}
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          {status === "loading" && "Verifying your account"}
          {status === "success" && "Account Verified"}
          {status === "error" && "Verification Failed"}
        </h1>

        <p className="text-gray-500 mb-6">
          {status === "loading" &&
            "Please wait while we confirm your email address."}

          {status === "success" &&
            "Your email has been successfully verified. Redirecting to login..."}

          {status === "error" &&
            "The verification link is invalid or has expired."}
        </p>

        {status === "error" && (
          <button
            onClick={() => navigate("/login")}
            className="w-full rounded-lg bg-red-500 py-3 text-white font-medium hover:bg-red-600 transition"
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
