import { useEffect, useState } from "react";
import axios from "axios";

const useFetchData = (url: string) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    try {
      setLoading(true);
      const resp: any = axios.get(url);
      setData(resp);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFetch();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
