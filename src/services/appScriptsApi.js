import axios from "axios";

const BASE_URL = import.meta.env.VITE_GOOGLE_APP_SCRIPTS_URL;
const IMPLEMENTATION_ID =
  "AKfycbxZ7XJD9IS2eB0JOcAD9J6vNQeZKK7JpRt3q_nWutwACZfSjdNt6kXcetws_lxg_0qB_Q";

const api = axios.create({
  baseURL: BASE_URL, // Base URL de la API
  headers: {
    "Content-Type": "application/json",
  },
});

const createFeedingRecord = async (record) => {
  const { datetime, id, name, day, foodType } = record;
  const response = { error: false, errorMessage: {}, data: [] };
  try {
    const url = `/macros/s/${IMPLEMENTATION_ID}/exec`;
    const res = await api.post(url, undefined, {
      params: {
        datetime,
        id,
        name,
        day,
        foodType,
      },
      maxBodyLength: Infinity,
    });
    if (res.data.status == "error") {
      response.error = true;
      response.errorMessage = res.data.message;
    } else {
      response.data = res.data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    response.error = true;
    response.errorMessage = error;
  }
  return response;
};

export { createFeedingRecord };
