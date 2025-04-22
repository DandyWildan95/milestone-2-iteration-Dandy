import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

interface UseApiOptions<T> {
  immediate?: boolean;
  transformResponse?: (data: any) => T;
}

export function useApi<T>(
  url: string, 
  options: UseApiOptions<T> = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    immediate = true,
    transformResponse = (data: any) => data as T
  } = options;

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<any> = await axios.get(url);
      const transformedData = transformResponse(response.data);
      setData(transformedData);
      setLoading(false);
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(
        axiosError.response?.data?.message || 
        axiosError.message || 
        'An unexpected error occurred'
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [url]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}

export function useApiPost<T, R>(
  url: string, 
  options: UseApiOptions<R> = {}
) {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    transformResponse = (data: any) => data as R
  } = options;

  const postData = async (payload: T) => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<any> = await axios.post(url, payload);
      const transformedData = transformResponse(response.data);
      setData(transformedData);
      setLoading(false);
      return transformedData;
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(
        axiosError.response?.data?.message || 
        axiosError.message || 
        'An unexpected error occurred'
      );
      setLoading(false);
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    postData
  };
}
