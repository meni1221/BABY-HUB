import { useState } from "react";
import { apiUrl } from "../config/api";

interface IComment {
  id: string;
  review: { userId: string; comment: string; rating: number };
}

interface ApiErrorResponse {
  error?: {
    message?: string;
  };
}

interface UseFetchResult<T> {
  data: T | null;
  error: string | null;
  GET: () => Promise<void>;
  GETOne: (id: string) => Promise<void>;
  POST: <TResponse = T>(endpoint: string, body?: object) => Promise<TResponse>;
  PATCH: (id: string, body: Record<string, unknown>) => Promise<void>;
  DELETE: (id: string) => Promise<void>;
  VerifyToken: <TResponse = T>(role: string) => Promise<TResponse>;
  addComment: (comment: IComment) => Promise<unknown>;
}

const getErrorMessage = async (response: Response, fallback: string) => {
  const errorData = (await response.json().catch(() => null)) as
    | ApiErrorResponse
    | null;

  return errorData?.error?.message || fallback;
};

const useFetch = <T,>(url: string): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const GET = async () => {
    try {
      const response = await fetch(`${url}`);
      if (!response.ok) {
        const message = await getErrorMessage(response, "Request failed");
        throw new Error(`HTTP error! ${message}`);
      }
      const result = (await response.json()) as T;
      setData(result);
    } catch (error: unknown) {
      setError((error as Error).message || "An unknown error occurred.");
    }
  };

  const GETOne = async (id: string) => {
    try {
      const response = await fetch(`${url}/${id}`);
      if (!response.ok) {
        const message = await getErrorMessage(response, "Request failed");
        throw new Error(`HTTP error! ${message}`);
      }
      const result = (await response.json()) as T;
      setData(result);
    } catch (error: unknown) {
      setError((error as Error).message || "An unknown error occurred.");
    }
  };

  const POST = async <TResponse = T,>(endpoint: string, body: object = {}) => {
    try {
      const response = await fetch(`${url}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const message = await getErrorMessage(response, "Request failed");
        throw new Error(message);
      }

      const result = (await response.json()) as TResponse;
      setData(result as unknown as T);
      return result;
    } catch (error) {
      setError((error as Error).message || "An unknown error occurred.");
      throw error;
    }
  };

  const PATCH = async (id: string, body: Record<string, unknown>) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const message = await getErrorMessage(response, "Request failed");
        throw new Error(`error is: ${message}`);
      }
      const result = (await response.json()) as T;
      setData(result);
    } catch (error: unknown) {
      setError((error as Error).message || "An unknown error occurred.");
    }
  };
  const DELETE = async (id: string) => {
    try {
      const response = await fetch(`${url}/:${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        const message = await getErrorMessage(response, "Request failed");
        throw new Error(`error is: ${message}`);
      }
      const result = (await response.json()) as T;
      setData(result);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const VerifyToken = async <TResponse = T,>(role: string) => {
    try {
      const response = await fetch(apiUrl(`auth/verifyUser/${role}`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        const message = await getErrorMessage(response, "Request failed");
        throw new Error(message);
      }

      const result = (await response.json()) as TResponse;
      setData(result as unknown as T);
      return result;
    } catch (error) {
      setError((error as Error).message || "An unknown error occurred.");
      throw error;
    }
  };

  const addComment = async (comment: IComment) => {
    const res = await fetch(apiUrl(`babysitter/${comment.id}/reviews`), {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(comment),
    });
    const data = await res.json();
    return data;
  };

  return {
    data,
    error,
    GET,
    POST,
    PATCH,
    DELETE,
    GETOne,
    VerifyToken,
    addComment,
  };
};

export default useFetch;
