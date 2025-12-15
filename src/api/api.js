import axios from "axios";
import { toast } from "react-toastify";


const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if ((status === 401 || status === 403) && message !== "User cannot change own role") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setTimeout(() => {
        window.location.href = "/login";
      }, 5000);
    }

    return Promise.reject(error);
  }
);

export default api;
