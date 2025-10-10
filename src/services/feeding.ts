import { FeedingObj } from "@/types";
import api from "./api";
import { parseFeedingRecordToApi } from "@/utils/apiData";

const registerFeedingLog = async (record: FeedingObj) => {
  const { campistSysId, day, foodType, registeredBy } = record;
  const response = { error: false, errorMessage: {}, data: [] };
  const feedingRecordApiFormatted = parseFeedingRecordToApi({
    campistSysId,
    day,
    foodType,
    registeredBy,
  });
  try {
    const res = await api.post("/comidas", feedingRecordApiFormatted);
    console.log(res);
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

export { registerFeedingLog };
