import { useEffect, useState } from "react";
import axios from 'axios';

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getInventoryItems = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const { data } = await axios.get(url, {
          params: {
            sort: "-_id",
            limit: 5,
            pageNumber: page - 1
          },
          withCredentials: true
        })
        console.log("Data: ", data);
        setData(data);
      } catch (error) {
        console.log(error.response.data);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    // console.log(import.meta.env)
    getInventoryItems();
  }, [page]);

  return {
    data,
    setData,
    isLoading,
    isError,
    page,
    setPage
  }
}