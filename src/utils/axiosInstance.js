// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Adjust based on your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
