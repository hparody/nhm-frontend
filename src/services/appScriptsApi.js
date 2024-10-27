import axios from "axios";

const BASE_URL = import.meta.env.VITE_GOOGLE_APP_SCRIPTS_URL;
const IMPLEMENTATION_ID =
  "AKfycbzXT-ovB_1LUB3XaUBfm-1kSjQzD1DqX9DBY3kh1tPwawj7f5Wjun08JL99SBfpuE2DCQ";

const api = axios.create({
  baseURL: BASE_URL, // Base URL de la API
  headers: {
    "Content-Type": "application/json",
  },
});

const createFeedingRecord = async (record) => {
  const { datetime, id, name, day, foodType, registeredBy } = record;
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
        registeredBy,
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
