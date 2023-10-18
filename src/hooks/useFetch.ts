import { useEffect, useState } from 'react';

type FetchFunction = () => Promise<any[]>;

type UseFetchResult = {
  data: any[];
  isLoading: boolean;
  error: string | null;
};

function useFetch(fetchFunction: FetchFunction): UseFetchResult {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setIsLoading(true);
        const response = await fetchFunction();
        setData(response);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApi();
  }, [fetchFunction]);

  return {
    data,
    error,
    isLoading,
  };
}

export default useFetch;
