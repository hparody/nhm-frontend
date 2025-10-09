import { useState, useCallback, useEffect } from "react";

import { CampistNewApi } from "@/types";
import { getCampists } from "@/services/campists";

const useCampists = () => {
  const [error, setError] = useState(null);
  const [loadingCampists, setLoadingCampists] = useState(true);
  const [campists, setCampists] = useState<CampistNewApi[]>([]);

  const fetchCampData = useCallback(async () => {
    setError(null);
    setLoadingCampists(true);
    const res = await getCampists();
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
