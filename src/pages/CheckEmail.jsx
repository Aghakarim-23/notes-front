import React from "react";
import { useNavigate } from "react-router-dom";

const CheckEmail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 text-3xl">
            ✓
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Registration Successful
        </h1>

        <p className="text-gray-600 mb-6">
          Your account has been created successfully. We’ve sent a verification
          link to your email address.
        </p>

        <div className="mb-6 rounded-lg bg-green-50 p-4 text-sm text-green-700">
          Please check your inbox and click the link to activate your account.
        </div>

        <div className="space-y-3 mt-4">
          <a
            href="https://mail.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-block rounded-lg bg-green-600 py-3 text-white font-medium text-center hover:bg-green-700 transition"
          >
            Open Gmail
          </a>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
