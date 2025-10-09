import { parseCampistsData } from "@/utils/apiData";

import api from "./api";

const getCampists = async () => {
  const response = { error: false, errorMessage: {}, data: [] };
  try {
    const res = await api.get("/campistas");
    response.data = parseCampistsData(res.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    response.error = true;
    response.errorMessage = error;
  }
  return response;
};

export { getCampists };
