import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useAppwrite = (func) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await func();
      if (!response) throw Error;
      setData(response)
    } catch (error) {
      Alert.alert("Error", error);
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