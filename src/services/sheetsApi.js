import axios from "axios";

import { parseCampistsData } from "@/utils/sheets";

const BASE_URL = import.meta.env.VITE_GOOGLE_SHEETS_BASE_URL;
const CAMP_SPREADSHEET_ID = "1kHxQkHvSVPqnlr29OYJMEDAK9ODQfC4IWcqODlUDhQ8";
const CAMP_DB_RANGE = "CampDB!A:O";

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
    response.data = parseCampistsData(res.data.values);
  } catch (error) {
    console.error("Error fetching data:", error);
    response.error = true;
    response.errorMessage = error;
  }
  return response;
};

export { getCampData };
