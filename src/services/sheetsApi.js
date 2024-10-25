import axios from "axios";

const BASE_URL = import.meta.env.VITE_GOOGLE_SHEETS_BASE_URL;
const CAMP_SPREADSHEET_ID = "1uVGQNtnemts97pOrj91GDGDqGI83bMyu1Zh1zsvA6Go";
const CAMP_DB_RANGE = "CampDB!A:K";

const api = axios.create({
  baseURL: BASE_URL, // Base URL de la API
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    key: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY,
  },
});

const getCampData = async () => {
  const response = { error: false, errorMessage: {}, data: [] };
  try {
    const url = `/${CAMP_SPREADSHEET_ID}/values/${CAMP_DB_RANGE}`;
    const res = await api.get(url, {
      params: {
        majorDimension: "ROWS",
      },
    });
    response.data = res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    response.error = true;
    response.errorMessage = error;
  }
  return response;
};

export { getCampData };
