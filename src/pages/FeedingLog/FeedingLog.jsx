import { getCampData } from "@/services/sheetsApi";
import { useEffect, useState } from "react";

import { parseCampistsData } from "@/utils/sheets";

const FeedingLog = () => {
  console.log("Feeding log");
  const [campists, setCampists] = useState([]);

  const fetchCampData = async () => {
    const res = await getCampData();
    if (!res.error) {
      console.log(res.data.values);
      setCampists(parseCampistsData(res.data.values));
    }
  };

  useEffect(() => {
    fetchCampData();
  }, []);

  return <div>Registro de Alimentación</div>;
};

export default FeedingLog;
