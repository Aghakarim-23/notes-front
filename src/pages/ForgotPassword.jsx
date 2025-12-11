import React, { useState } from "react";
import api from "../api/api";
import { Helmet } from "react-helmet";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await api.post("api/auth/forgotPassword", { email });
      setMessage(res.data.message);
      setEmail("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>Forgot password</title>
      </Helmet>
      <div className="h-screen flex justify-center items-center p-3">
        <form
          className="max-w-[400px] md:max-w-[500px] w-full shadow-2xl p-5 md:p-8 rounded-md"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div>
            <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
            {message && (
              <>
                <p className="text-center mt-3 text-green-600 font-medium">
                  {message}
                </p>
                <p className="text-center mt-3 text-green-600 font-medium">
                  Please check your email
                </p>
              </>
            )}
            <div className="flex flex-col mt-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="border pl-2 py-2 mt-1 rounded-md outline-none"
                placeholder="Write your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="block mx-auto mt-4 rounded-md bg-orange-500 px-4 py-1 text-white cursor-pointer hover:opacity-65 transition disabled:opacity-70">
              {loading ? "Sending..." : "Forgot password"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
