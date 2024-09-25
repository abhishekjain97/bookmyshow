import axios from 'axios'

export const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem("token")}`
    },
    baseURL: "http://localhost:3000"
    // baseURL: "https://bookmyshow-backend-yxcm.onrender.com"
});


axiosInstance.interceptors.request.use(
    (config) => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem("token")}`
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);