import  { useState } from "react";

export default function useFetch<T>(url: string): any {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  //   --------------GET method--------------
  const GET = async () => {
    try {
      const response = await fetch(url);
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
    } catch (error: unknown) {
      setError((error as Error).message || "An unknown error occurred.");
    }
  };
  //   --------------PATCH method--------------
  const PATCH = async (id: string, body: any) => {
    try {
      const response = await fetch(`${url}/:${id}`, {
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
    } catch (error: unknown) {
      setError((error as Error).message || "An unknown error occurred.");
    }
  };
  //   --------------DELETE method--------------
  const DELETE = async (id: string) => {
    try {
      const response = await fetch(`${url}/:${id}`, {
        method: "POT",
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
  return { data, error, GET, POST, PATCH, DELETE };
}
