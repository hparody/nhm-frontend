import { useState, useCallback, useEffect } from "react";

import { getCampData } from "@/services/sheetsApi";

const useCampists = () => {
  const [error, setError] = useState(null);
  const [loadingCampists, setLoadingCampists] = useState(true);
  const [campists, setCampists] = useState([]);

  const fetchCampData = useCallback(async () => {
    setError(null);
    setLoadingCampists(true);
    const res = await getCampData();
    if (!res.error) {
      setCampists(res.data);
    } else {
      setError({ error: true, message: res.errorMessage });
    }
    setLoadingCampists(false);
  }, []);

  useEffect(() => {
    fetchCampData();
  }, [fetchCampData]);

  return { error, campists, loadingCampists, fetchCampData };
};

export default useCampists;
