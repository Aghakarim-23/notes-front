import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://notes-backend-in1c.onrender.com/',
  baseURL: 'http://localhost:8001/',
  
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
