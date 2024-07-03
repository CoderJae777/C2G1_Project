import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useAxiosGet = (initialUrl, initialParams = {}, reloadOn = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initialUrl);
  const [params, setParams] = useState(initialParams);
  const [shouldFetch, setShouldFetch] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(url, { params });
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url, params]);

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
    }
  }, [fetchData, shouldFetch, ...reloadOn]);

  return {
    data,
    loading,
    error,
    setUrl,
    setParams,
    refetch: () => setShouldFetch(true),
  };
};

export default useAxiosGet;
