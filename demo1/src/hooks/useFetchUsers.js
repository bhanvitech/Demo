import React, { useState, useEffect } from "react";
import { api } from "../services/api";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get(url); // Fetch data from the given URL
        console.log(result, "result");
        setData(result); // Assuming the API returns data in a `.data` field
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error, setData };
};

export default useFetch;
