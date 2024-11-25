import { useState } from "react";

interface IComment {
  id: string;
  review: { userId: string; comment: string; rating: number };
}

export default function useFetch<T>(url: string): any {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  //   --------------GET method--------------
  const GET = async () => {
    try {
      const response = await fetch(`${url}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! ${errorData.error.message}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error: unknown) {
      setError((error as Error).message || "An unknown error occurred.");
    }
  };
  //   --------------GET One method--------------
  const GETOne = async (id: string) => {
    try {
      const response = await fetch(`${url}/${id}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! ${errorData.error.message}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error: unknown) {
      setError((error as Error).message || "An unknown error occurred.");
    }
  };
  //   --------------POST method--------------
  const POST = async (endpoint: string, body: object) => {
    try {
      const response = await fetch(`${url}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Request failed");
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (error) {
      setError((error as Error).message || "An unknown error occurred.");
      throw error;
    }
  };
  //   --------------PATCH method--------------
  const PATCH = async (id: string, body: any) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`error is: ${errorData.error.message}`);
      }
      const result = await response.json();
      setData(result);
      console.log(data);
    } catch (error: unknown) {
      setError((error as Error).message || "An unknown error occurred.");
    }
  };
  //   --------------DELETE method--------------
  const DELETE = async (id: string) => {
    try {
      const response = await fetch(`${url}/:${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`error is: ${errorData.error.message}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const VerifyToken = async () => {
    try {
      const response = await fetch("http://localhost:7700/auth/verifyUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Request failed");
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (error) {
      setError((error as Error).message || "An unknown error occurred.");
      throw error;
    }
  };

  const addComment = async (comment: IComment)=>{
    const res = await fetch(`http://localhost:7700/${comment.id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      
      body: JSON.stringify(comment),
    })
    const data = await res.json()
    return data
  }

  return { data, error, GET, POST, PATCH, DELETE, GETOne, VerifyToken, addComment };
}
