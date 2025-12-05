import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8001/",
  // baseURL: 'https://notes-backend-in1c.onrender.com/',

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

    if (status === 401 || status === 403) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setTimeout(() => {
        window.location.href = "/login";
      }, 10);
    }

    return Promise.reject(error);
  }
);

export default api;
