import axios from "axios";

import { isAuthenticated } from "@/utils/auth";

const BASE_URL = "https://trivia-jorgeguzman.online/";

const api = axios.create({
  baseURL: BASE_URL, // Base URL de la API
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (isAuthenticated()) {
      const token = localStorage.getItem("user");
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
