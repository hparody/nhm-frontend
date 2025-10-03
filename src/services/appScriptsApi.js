import axios from "axios";

const BASE_URL = import.meta.env.VITE_GOOGLE_APP_SCRIPTS_URL;
const IMPLEMENTATION_ID =
  "AKfycbwZJFpR-cuZ2eTd-FMvGHXYhdDa8Bhb3FOLsb6J6lCyqxjT38ffZdYQ4YJXEflnk9fmBg";

const api = axios.create({
  baseURL: BASE_URL, // Base URL de la API
  headers: {
    "Content-Type": "application/json",
  },
});

const createFeedingRecord = async (record) => {
  const { datetime, sysId, name, day, foodType, registeredBy } = record;
  const response = { error: false, errorMessage: {}, data: [] };
  try {
    const url = `/macros/s/${IMPLEMENTATION_ID}/exec`;
    const res = await api.post(url, {
      datetime,
      sysId,
      name,
      day,
      foodType,
      registeredBy,
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
