import Error from "next/error";
import {useCallback, useState} from "react";
import { DUMMY_URL } from "../utils/constants";

type ResponseType<T> = {
  data?: T;
  error?: string;
  message?: any;
  details?: Record<string, unknown>;
  success?: boolean;
  response?: any;
  statusCode?: number;
  url?: string;
};
type Request = <T>(
  url: string,
  method?: string,
  body?: BodyInit | null,
  signal?: AbortSignal | null,
) => Promise<ResponseType<T>>;

const useHTTP = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | boolean>(false);
  const [statusCode, setStatusCode] = useState<number | undefined>();
  const request: Request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      signal = null,
      formData = false
    ) => {
      setLoading(true);
      const headers: HeadersInit = {};
      try {
        const response = await fetch(
          `${DUMMY_URL}${url}`,
          {
            method,
            body,
            headers,
            signal,
          }
        );
        const data = await response.json();
        setStatusCode(response.status);
        if (!response.ok) {
          setError(data.message || data.error);
        }
        setLoading(false);
        return data;
      } catch (error: Error | any) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
      setLoading(false);
    },
    []
  );
  return {request, loading, error, statusCode};
};
export default useHTTP;
