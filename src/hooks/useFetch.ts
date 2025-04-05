import { useState } from "react";
import { AxiosError } from "axios";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<FetchError | null>(null);
  const [data, setData] = useState<T | null>(null);

  const fetchData = async ({ onSuccess, onError, body }: FetchProps<T>) => {
    setIsLoading(true);

    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

    try {
      const response = await fetch(
        `${protocol}://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/api/${endpoint}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          credentials: "include", // Ensures cookies are sent with the request
        },
      );

      if (!response.ok) {
        console.log("response not ok");
        return;
        // throw new Error("Network response was not ok");
      }

      const data = await response.json(); // Parse the JSON response

      setData(data);
      onSuccess?.(data);
      // const response = await axios({
      //   method,
      //   url: `${protocol}://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/api/${endpoint}`,
      //   data: body,
      //   withCredentials: true,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      //
      // setData(response.data);
      // onSuccess?.(response.data);
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

  return { fetch: fetchData, isLoading, error, data };
};

export default useFetch;
