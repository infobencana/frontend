import { useState } from "react";

export const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    let response;
    setError("");
    setLoading(true);

    try {
      const result = await apiFunc(...args);
      setData(result.data);
      response = result.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || "silahkan coba beberapa saat lagi";
      setError(message);
      response = { status: false, message };
    } finally {
      setLoading(false);
    }

    return response;
  };

  return {
    data,
    error,
    loading,
    request,
  };
};
