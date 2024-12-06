import { useEffect, useState } from "react";

export const useAppwrite = (func) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await func();
      setData(response);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const refetchData = () => fetchData();

  return { data, isLoading, refetchData };
}