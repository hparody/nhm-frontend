import { getCampData } from "@/services/sheetsApi";
import { useEffect } from "react";

const FeedingLog = () => {
  console.log("Feeding log");

  const fetchCampData = async () => {
    const res = await getCampData();
    if (!res.error) {
      console.log(res.data);
    }
  };

  useEffect(() => {
    fetchCampData();
  }, []);

  return <div>Registro de Alimentación</div>;
};

export default FeedingLog;
