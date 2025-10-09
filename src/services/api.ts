import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_DATA_ENDPOINT;

const api = axios.create({
  baseURL: BASE_URL, // Base URL de la API
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
