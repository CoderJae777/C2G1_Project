import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useAxiosDelete = (initialUrl, onSuccess, onError) => {
  axios.defaults.withCredentials = true;
  const [url, setUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(url);
      if (onSuccess) onSuccess(response);
    } catch (err) {
      setError(err);
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  }, [url, onSuccess, onError]);

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
      setShouldFetch(false);
    }
  }, [fetchData, shouldFetch]);

  return {
    loading,
    error,
    setUrl,
    refetch: () => setShouldFetch(true),
  };
};

export default useAxiosDelete;
