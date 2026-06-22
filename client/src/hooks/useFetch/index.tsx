import { useCallback, useState } from "react";
import { apiUrl } from "../../config/api";
import { logger } from "../../utils/logger";

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

  const GET = useCallback(async () => {
    try {
      logger.info(`GET ${url}`);
      const response = await fetch(`${url}`);
      if (!response.ok) {
        const message = await getErrorMessage(response, "Request failed");
        logger.warn(`GET failed ${url}: ${message}`);
        throw new Error(`HTTP error! ${message}`);
      }
      const result = (await response.json()) as T;
      setData(result);
    } catch (error: unknown) {
      logger.error(`GET error ${url}`, error);
      setError((error as Error).message || "An unknown error occurred.");
    }
  }, [url]);

  const GETOne = useCallback(async (id: string) => {
    try {
      logger.info(`GET one ${url}/${id}`);
      const response = await fetch(`${url}/${id}`);
      if (!response.ok) {
        const message = await getErrorMessage(response, "Request failed");
        logger.warn(`GET one failed ${url}/${id}: ${message}`);
        throw new Error(`HTTP error! ${message}`);
      }
      const result = (await response.json()) as T;
      setData(result);
    } catch (error: unknown) {
      logger.error(`GET one error ${url}/${id}`, error);
      setError((error as Error).message || "An unknown error occurred.");
    }
  }, [url]);

  const POST = useCallback(async <TResponse = T,>(endpoint: string, body: object = {}) => {
    try {
      logger.info(`POST ${url}/${endpoint}`);
      const response = await fetch(`${url}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const message = await getErrorMessage(response, "Request failed");
        logger.warn(`POST failed ${url}/${endpoint}: ${message}`);
        throw new Error(message);
      }

      const result = (await response.json()) as TResponse;
      setData(result as unknown as T);
      return result;
    } catch (error) {
      logger.error(`POST error ${url}/${endpoint}`, error);
      setError((error as Error).message || "An unknown error occurred.");
      throw error;
    }
  }, [url]);

  const PATCH = useCallback(async (id: string, body: Record<string, unknown>) => {
    try {
      logger.info(`PATCH ${url}/${id}`);
      const response = await fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const message = await getErrorMessage(response, "Request failed");
        logger.warn(`PATCH failed ${url}/${id}: ${message}`);
        throw new Error(`error is: ${message}`);
      }
      const result = (await response.json()) as T;
      setData(result);
    } catch (error: unknown) {
      logger.error(`PATCH error ${url}/${id}`, error);
      setError((error as Error).message || "An unknown error occurred.");
    }
  }, [url]);

  const DELETE = useCallback(async (id: string) => {
    try {
      logger.info(`DELETE ${url}/${id}`);
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        const message = await getErrorMessage(response, "Request failed");
        logger.warn(`DELETE failed ${url}/${id}: ${message}`);
        throw new Error(`error is: ${message}`);
      }
      const result = (await response.json()) as T;
      setData(result);
    } catch (error) {
      logger.error(`DELETE error ${url}/${id}`, error);
      setError((error as Error).message);
    }
  }, [url]);

  const VerifyToken = useCallback(async <TResponse = T,>(role: string) => {
    try {
      logger.info(`Verify token for role ${role}`);
      const response = await fetch(apiUrl(`auth/verifyUser/${role}`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        const message = await getErrorMessage(response, "Request failed");
        logger.warn(`Verify token failed for role ${role}: ${message}`);
        throw new Error(message);
      }

      const result = (await response.json()) as TResponse;
      setData(result as unknown as T);
      return result;
    } catch (error) {
      logger.error(`Verify token error for role ${role}`, error);
      setError((error as Error).message || "An unknown error occurred.");
      throw error;
    }
  }, []);

  const addComment = useCallback(async (comment: IComment) => {
    const endpoint = apiUrl(`babysitter/${comment.id}/reviews`);

    try {
      logger.info(`POST comment ${endpoint}`);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(comment.review),
      });

      if (!res.ok) {
        const message = await getErrorMessage(res, "Comment request failed");
        logger.warn(`POST comment failed ${endpoint}: ${message}`);
        throw new Error(message);
      }

      return res.json();
    } catch (error) {
      logger.error(`POST comment error ${endpoint}`, error);
      setError((error as Error).message || "An unknown error occurred.");
      throw error;
    }
  }, []);

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
