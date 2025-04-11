import { useState } from "react";
import axios, { AxiosError } from "axios";

interface Props {
  endpoint: string;
  method?: string;
}

interface FetchError {
  code: number;
  message: string;
}

type FetchProps<T> = {
  onSuccess?: (data: T) => void;
  onError?: (error: FetchError) => void;
  body?: { [key: string]: unknown };
};

const useFetch = <T>({ endpoint, method = "GET" }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FetchError | null>(null);
  const [data, setData] = useState<T | null>(null);

  const fetch = async ({ onSuccess, onError, body }: FetchProps<T>) => {
    setIsLoading(true);

    try {
      const response = await axios({
        method,
        url: `/api/${endpoint}`,
        data: body,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      setData(response.data);
      onSuccess?.(response.data);
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;

      const formattedErr = {
        code: err.status || 500,
        message: err.response?.data.message || err.message,
      };

      onError?.(formattedErr);
      setError(formattedErr);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetch, isLoading, error, data };
};

export default useFetch;
